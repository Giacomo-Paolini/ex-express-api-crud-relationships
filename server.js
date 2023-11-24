const express = require('express');
const dotenv = require('dotenv');
const postsRouter = require('./routers/postsRouter');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

dotenv.config();

app.use(express.json());

app.use('/posts', postsRouter);


app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});