const express = require('express');
const mongoose = require('mongoose');
const yourRoutes = require('./routes/routers');
const Routes = require('./routes/conatctRoute');
const Routess = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://laithfaleh:963214785Aal@cluster1.lkgqy47.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/contact', Routes);
app.use('/user', Routess);
app.use('/', yourRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
