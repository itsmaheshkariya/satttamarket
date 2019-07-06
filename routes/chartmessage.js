const express = require('express');
const router = express.Router();

//Bring article model
let Time = require('../models/chartmessage');
let Settings = require('../models/settings');




router.get('/chartmessage', function(req, res) {

    Time.find({}, function(err, times) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/chartmessage', {
                        title: 'SAT MAT RAT',
                        time: times,
                        settings: settings
                    });
                }
            });


        }
    });


})
router.post('/chartmessage', function(req, res) {
    let time = new Time();
    time.market = req.body.market;
    time.open = req.body.open;
    time.close = req.body.close;
  
    time.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/chartmessage');
            }
        }
    });
})

router.get('/chartmessage/edit/:id', function(req, res) {
    Time.findById(req.params.id, function(err, times) {
        res.render('pages/chartmessageedit', {
            title: 'SATMATRAT',
            time: times
        });
    });
})



router.delete('/chartmessage/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Time.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/chartmessage');
        })
    })
    .post('/chartmessage/edit/:id', function(req, res) {
        let time = {};
        time.market = req.body.market;
        time.open = req.body.open;
        time.close = req.body.close;
        let query = { _id: req.params.id }
        Time.update(query, time, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/chartmessage');
                }
            }
        })

    })
module.exports = router;