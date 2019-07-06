const express = require('express');
const router = express.Router();
let Articlepost = require('../models/articlepost');
let Settings = require('../models/settings');




router.get('/articlepost', function(req, res) {

    Articlepost.find({}, function(err, articleposts) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/articlepost', {
                        title: 'SAT MAT RAT',
                        articlepost: articleposts,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/articlepost', function(req, res) {
    let articlepost = new Articlepost();
    articlepost.text = req.body.text;
    articlepost.color = req.body.color;
    articlepost.bgcolor = req.body.bgcolor;
   
    articlepost.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/articlepost');
            }
        }
    });
})

router.get('/articlepost/edit/:id', function(req, res) {
    Articlepost.findById(req.params.id, function(err, articleposts) {
        res.render('pages/articlepostedit', {
            title: 'SATMATRAT',
            articlepost: articleposts
        });
    });
})



router.delete('/articlepost/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Articlepost.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/articlepost');
        })
    })
    .post('/articlepost/edit/:id', function(req, res) {
        let articlepost = {};
        articlepost.text = req.body.text;
        articlepost.color = req.body.color;
        articlepost.bgcolor = req.body.bgcolor;
       
        let query = { _id: req.params.id }
        Articlepost.update(query, articlepost, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/articlepost');
                }
            }
        })

    })
module.exports = router;