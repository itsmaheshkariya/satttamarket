const express = require('express');
const router = express.Router();

let Weekly = require('../models/weekly');
let Settings = require('../models/settings');




router.get('/weekly', function(req, res) {

    Weekly.find({}, function(err, weeklys) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(weeklys);
                    res.render('pages/weekly', {
                        title: 'SAT MAT RAT',
                        weeklys: weeklys,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/weekly', function(req, res) {
    let weekly = new Weekly();
    weekly.head = req.body.head;
    weekly.headbg = req.body.headbg;
    weekly.headcolor = req.body.headcolor;
    weekly.text = req.body.text;
    weekly.textcolor = req.body.textcolor;
    weekly.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/weekly');
            }
        }
    });
})

router.get('/weekly/edit/:id', function(req, res) {
    Weekly.findById(req.params.id, function(err, weeklys) {
        res.render('pages/weeklyedit', {
            title: 'SATMATRAT',
            weeklys: weeklys
        });
    });
})



router.delete('/weekly/delete/:id', function(req, res) {
    let query = { _id: req.params.id }

    Weekly.remove(query, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/weekly');
    })
})

router.delete('/settings/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Settings.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/Settings');
        })
    })
    .post('/weekly/edit/:id', function(req, res) {
        let weekly = {};
        weekly.head = req.body.head;
        weekly.headbg = req.body.headbg;
        weekly.headcolor = req.body.headcolor;
        weekly.text = req.body.text;
        weekly.textcolor = req.body.textcolor;


        let query = { _id: req.params.id }
        Weekly.update(query, weekly, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/weekly');
                }
            }
        })

    })
module.exports = router;