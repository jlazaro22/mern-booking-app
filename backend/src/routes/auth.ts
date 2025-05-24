import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User, { userLoginValidationSchema } from '../models/user';

const router: Router = Router();

router.post(
  '/login',
  userLoginValidationSchema,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d',
        },
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000, // 1 day,
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

export default router;
