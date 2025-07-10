const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const dataStore = require('./dataStore');
const port = process.env.PORT || 5000;

// Clear data store on server start (demo behavior)
dataStore.clear();
if (process.env.NODE_ENV === 'development') {
  console.log('🧹 Data store cleared - fresh start for demo!'.cyan);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Server started on port ${port}`.green);
  } else {
    console.log(`Server started on port ${port}`);
  }
});
