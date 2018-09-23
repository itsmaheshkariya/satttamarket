const express = require('express');
const router = express.Router();

//Bring article model
let Kalyan = require('../models/kalyan');
let Settings = require('../models/settings');




router.get('/kalyan', function(req, res) {

    Kalyan.find({}, function(err, kalyans) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/kalyan', {
                        title: 'SAT MAT RAT',
                        kalyan: kalyans,
                        settings: settings
                    });
                }
            });


        }
    });


})
router.post('/kalyan', function(req, res) {
    let kalyan = new Kalyan();
    kalyan.time1 = req.body.time1;
    kalyan.result1 = req.body.result1;
    kalyan.time2 = req.body.time2;
    kalyan.result2 = req.body.result2;

    kalyan.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/kalyan');
            }
        }
    });
})

router.get('/kalyan/edit/:id', function(req, res) {
    Kalyan.findById(req.params.id, function(err, kalyans) {
        res.render('pages/kalyanedit', {
            title: 'SATMATRAT',
            kalyan: kalyans
        });
    });
})



router.delete('/kalyan/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Kalyan.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/kalyan');
        })
    })
    .post('/kalyan/edit/:id', function(req, res) {
        let kalyan = {};
        kalyan.time1 = req.body.time1;
        kalyan.result1 = req.body.result1;

        kalyan.time2 = req.body.time2;
        kalyan.result2 = req.body.result2;

        let query = { _id: req.params.id }
        Kalyan.update(query, kalyan, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/kalyan');
                }
            }
        })

    })
module.exports = router;