const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Import database connection
const sequelize = require('./config/database');

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Rute untuk testing
app.get('/', (req, res) => {
  res.send('API auth service is running!');
});
app.get('/test', (req, res) => {
  res.json({ message: 'API Gateway is working' });
});
// Port
const PORT = process.env.PORT || 3001;

// Sync database dan start server
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();