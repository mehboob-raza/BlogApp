import express from 'express';
import mongoose from 'mongoose'
import router from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cors from 'cors'


const app = express();
app.use(cors())
app.use(express.json());
// middlewares

app.use("/api/user", router)
app.use('/api/blog', blogRouter)
// connect mongo db

mongoose.connect('mongodb+srv://razamehboob61:razamehboob61@cluster0.cymqetb.mongodb.net/')
    .then(() => app.listen(5000))
    .then(() => console.log('Connected to Database and listening on localhost 5000 port'))
    .catch((error) => console.log(error));

    

