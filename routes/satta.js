const express = require('express');
const router = express.Router();

//Bring article model
let Article = require('../models/satta');



router.get('/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
        res.render('article', {
            article: article
        });
    });
});


router.get('/edit/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });
});





router.get('/', function(req, res) {
    res.render('add_articles', {
        title: 'Add New article'
    });
});


//add submit


router.post('/', function(req, res) {
    req.checkBody('firstname', 'First Name is Required').notEmpty();
    req.checkBody('lastname', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('contact', 'Contact is Required').notEmpty();
    req.checkBody('city', 'City is Required').notEmpty();
    req.checkBody('state', 'State is Required').notEmpty();
    req.checkBody('country', 'Country Name is Required').notEmpty();
    req.checkBody('gender', 'Gender is Required').notEmpty();



    let errors = req.validationErrors();



    if (errors) {
        res.render('add_articles', {
            title: 'Add New Record',
            errors: errors
        });
    } else {

        let article = new Article();
        article.firstname = req.body.firstname;
        article.lastname = req.body.lastname;
        article.email = req.body.email;
        article.contact = req.body.contact;
        article.city = req.body.city;
        article.state = req.body.state;
        article.country = req.body.country;
        article.gender = req.body.gender;
        article.about = req.body.about;

        article.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                {
                    req.flash('dark', 'Data Submited Successfully To Database.');
                    res.redirect('/');
                }
            }
        });
    }




});





router.delete('/:id', function(req, res) {
    let query = { _id: req.params.id }

    Article.remove(query, function(err) {
        if (err) {
            console.log(err);
        }
        res.send('Success');
    });
});

router.post('/edit/:id', function(req, res) {
    let article = {};
    article.firstname = req.body.firstname;
    article.lastname = req.body.lastname;
    article.email = req.body.email;
    article.contact = req.body.contact;
    article.city = req.body.city;
    article.state = req.body.state;
    article.country = req.body.country;
    article.gender = req.body.gender;
    article.about = req.body.about;

    let query = { _id: req.params.id }
    Article.update(query, article, function(err) {
        if (err) {
            console.log(err);
        } else {
            {
                req.flash('dark', 'Data Updated Successfully To Database.');
                res.redirect('/');
            }
        }
    });

});




module.exports = router;