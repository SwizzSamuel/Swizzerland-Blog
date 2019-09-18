const express = require('express');
const router = express.Router({mergeParams:true});
const Blog = require('../models/blogs');

router.get('/', (req, res) => {
    res.redirect('/blogs');
})
// INDEX ROUTE
router.get('/blogs', (req, res) =>{
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log('ERROR GETTING BLOG');
        } else {
            res.render('index', {blogs: blogs})
        }
    })
})

// NEW ROUTE
router.get('/blogs/new', (req, res) =>{
    res.render('new');
})

// CREATE ROUTE
router.post('/blogs', (req, res) => {
    // create blogs
    console.log(req.body)
    req.body.blog.body = req.sanitize(req.body.blog.body)
    console.log('=========')
    console.log(req.body)
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render('new')
        } else {
            res.redirect('/blogs');
        }
    })
})

// SHOW ROUTE
router.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            res.redirect('/blogs')
        } else {
            res.render('show', {blog: foundBlog})
        }
    })
})

// EDIT ROUTE
router.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog})
        }
    })
})

// UPDATE ROUTE
router.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err){
            res.redirect('/blogs')
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
})

// DESTROY ROUTE
router.delete('/blogs/:id', (req, res) => {
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    })
    // redirect somewhere
})

module.exports = router;
