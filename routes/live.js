const express = require('express');
const router = express.Router();

//Bring article model
let Live = require('../models/live');
let Settings = require('../models/settings');




router.get('/live', function(req, res) {

    Live.find({}, function(err, sattas) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/live', {
                        title: 'SAT MAT RAT',
                        satta1: sattas,
                        settings: settings
                    });
                }
            });



            // res.render('pages/index', {
            //     title: 'SAT MAT RAT',
            //     satta: sattas
            // });
        }
    });


})
router.post('/livesatta', function(req, res) {
    let satta = new Live();
    satta.name = req.body.name;
    satta.number = req.body.number;
    satta.time = req.body.time;
    satta.time1 = req.body.time1;
    satta.date = req.body.date;
    satta.bgcolor = req.body.bgcolor;
    satta.color = req.body.color;
    satta.color1 = req.body.color1;
    satta.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/live');
            }
        }
    });
})

router.get('/livesatta/edit/:id', function(req, res) {
    Live.findById(req.params.id, function(err, sattas) {
        res.render('pages/liveedit', {
            title: 'SATMATRAT',
            sattan1: sattas
        });
    });
})



router.delete('/livesatta/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Live.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/live');
        })
    })
    .post('/livesatta/edit/:id', function(req, res) {
        let satta = {};
        satta.name = req.body.name;
        satta.number = req.body.number;
        satta.date = req.body.date;
        satta.time = req.body.time;
        satta.time1 = req.body.time1;
        satta.bgcolor = req.body.bgcolor;
        satta.color = req.body.color;
        satta.color1 = req.body.color1;
        let query = { _id: req.params.id }
        Live.update(query, satta, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/live');
                }
            }
        })

    })
module.exports = router;