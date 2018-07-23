const express = require('express');
const router = express.Router();

//Bring article model
let Live = require('../models/live');
let Settings = require('../models/settings');



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'please login');
        res.redirect('/login');
    }
}

router.get('/live', ensureAuthenticated, function(req, res) {

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
                        satta: sattas,
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
router.post('/livesatta', ensureAuthenticated, function(req, res) {
    let live = new Live();
    live.name = req.body.name;
    live.number = req.body.number;
    live.time = req.body.time;
    live.time1 = req.body.time1;
    live.date = req.body.date;
    live.bgcolor = req.body.bgcolor;

    Live.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/live');
            }
        }
    });
})

router.get('/livesatta/edit/:id', ensureAuthenticated, function(req, res) {
    Live.findById(req.params.id, function(err, lives) {
        res.render('pages/liveedit', {
            title: 'SATMATRAT',
            sattan1: lives
        });
    });
})



router.delete('/livesatta/delete/:id', ensureAuthenticated, function(req, res) {
        let query = { _id: req.params.id }

        Live.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/live');
        })
    })
    .post('/livesatta/edit/:id', ensureAuthenticated, function(req, res) {
        let live = {};
        live.name = req.body.name;
        live.number = req.body.number;
        live.date = req.body.date;
        live.time = req.body.time;
        live.time1 = req.body.time1;
        live.bgcolor = req.body.bgcolor;

        let query = { _id: req.params.id }
        Live.update(query, live, function(err) {
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
