import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import route from './routes';
import morgan from "morgan"


// import morgan from './utils/serverLogs/morgan'
// import cors from './utils/cors'
import { connectToDatabase } from './utils/mongoose';

const app = express();
app.use(express.json());
app.use(cors({}))
app.use(morgan('dev'))
app.use(express.json());
dotenv.config()

app.use("/", route)

const PORT = process.env.PORT
console.log(PORT);


app.listen(PORT || 3000, async() => {
  await connectToDatabase()
  console.log('Server listening on port 3000');
});