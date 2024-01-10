

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const authRouter = require('./routers/authenticateRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const categoryRouter = require('./routers/categoryRouter');
const commentRouter = require('./routers/commentRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('avatars'));
app.use(fileUpload());

// Routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);

// Serve React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});

