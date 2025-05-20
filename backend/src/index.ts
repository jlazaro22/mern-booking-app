import cors from 'cors';
import 'dotenv/config';
import express, { json, Request, Response, urlencoded } from 'express';
import mongooseConnect from './lib/mongoose';

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT);

mongooseConnect();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/api/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from Express endpoint!' });
});

app.listen(port, host, () => {
  console.log(`🚀 Server is running on http://${host}:${port}`);
});
