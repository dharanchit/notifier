import express from 'express';
import publisherRouter from './routes/index';
import queueConsumer from './utils/queueConsumer';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Publishes notification to messaging queue
app.use("/publisher", publisherRouter);

// Messaging Queue listener and publisher
queueConsumer();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});