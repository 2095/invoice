const express = require('express');
const authRouter = require('./routes/auth.routes');

const server = express();

server.use(express.json({ extended: true }));

server.use('/api/auth', authRouter);

server.listen(5000);