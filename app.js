const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

const app = express()

const blogRoutes = require('./routes/blogs')

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.set('port', process.env.port || 3001);

app.use(blogRoutes);


app.listen(process.env.port || 3001, () => {
    console.log('The RESTful App Server Is Running!')
});