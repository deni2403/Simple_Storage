import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import store from './config/sessionStore.js';
import productRoute from './routers/productRoute.js';
import userRoute from './routers/userRoute.js';
import authRoute from './routers/authRoute.js';

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      sameSite: 'none',
      secure: 'true',
    },
  }),
);

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  }),
);

app.use(express.json());
app.use(userRoute);
app.use(productRoute);
app.use(authRoute);

app.listen(port, () => {
  console.log(`Server running on ${host}:${port}`);
});
