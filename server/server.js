// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth.routes');
const { protect } = require('./middleware/auth.middleware');

app.use('/api/auth', authRoutes);

// Protected test route
app.get('/api/users/me', protect, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/health', (req, res) => res.json({ message: 'Server is running successfully!' }));

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
