import cors, { CorsOptions } from "cors";

const whiteList = [
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  "http://localhost:3000",
  'http://aa263ceaeb6dd45418b20af642b0e53e-586295319.eu-central-1.elb.amazonaws.com',
  'https://aa263ceaeb6dd45418b20af642b0e53e-586295319.eu-central-1.elb.amazonaws.com',
];

const corsOptions: CorsOptions = {
  origin: whiteList,
};

const corsHandler = cors(corsOptions);

export default corsHandler;