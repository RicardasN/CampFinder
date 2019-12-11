const express = require('express');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const commentsRoutes = require('./routes/comments');
const repliesRoutes = require('./routes/replies');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// Bodyparser
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', usersRoutes);
app.use('/api/campgrounds', campgroundsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/campgrounds/', reviewsRoutes);
app.use('/api/campgrounds/', commentsRoutes);
app.use('/api/campgrounds/', repliesRoutes);

// Handle 404
app.use(function(req, res) {
  res
    .status(404)
    .json({ msg: 'The resource you were trying to reach does not exist' });
});

const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
