const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require("./config/dbConnection");

const port = process.env.PORT || 5000;
connectDb();
const app = express();

app.use(express.json());

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port1 ${port}`);
});