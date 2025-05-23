import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User, { userRegisterValidation } from '../models/user';

const router: Router = Router();

router.post(
  '/register',
  userRegisterValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      user = new User(req.body);
      await user.save();

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

      res.status(200).send({ message: 'User registered OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

export default router;
