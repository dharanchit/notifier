import express from 'express';
import notificationHandlerController from './controller/notificationHandlerController';
import publisherRouter from './routes/index';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// send notification to publisher router
app.use("/publisher", publisherRouter);

app.get("/", notificationHandlerController);

//node-cron to trigger events at a particular time of the day that will be consumed by consumer

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});