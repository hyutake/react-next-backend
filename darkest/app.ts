import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import expeditionRouter from './routes/expedition';

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({message: "Sanity health check!"});
})

const port = process.env.BACKEND_PORT || 4002;

app.use('/darkest/expedition', expeditionRouter);

app.listen(port, () => {
  console.log(`[Darkest] Listening on port ${port}`);
});