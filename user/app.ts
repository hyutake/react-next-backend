import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import authRouter from './routes/auth';

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.get('/health', (req, res) => {
    res.status(200).json({message: "Sanity health check!"});
})

const port = process.env.BACKEND_PORT || 4000;

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});