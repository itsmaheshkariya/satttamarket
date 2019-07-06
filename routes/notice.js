const express = require('express');
const router = express.Router();
let Notice = require('../models/notice');
let Settings = require('../models/settings');




router.get('/notice', function(req, res) {

    Notice.find({}, function(err, notices) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/notice', {
                        title: 'SAT MAT RAT',
                        notice: notices,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/notice', function(req, res) {
    let notice = new Notice();
    notice.text = req.body.text;
    notice.color = req.body.color;
    notice.bgcolor = req.body.bgcolor;
   
    notice.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/notice');
            }
        }
    });
})

router.get('/notice/edit/:id', function(req, res) {
    Notice.findById(req.params.id, function(err, notices) {
        res.render('pages/noticeedit', {
            title: 'SATMATRAT',
            notice: notices
        });
    });
})



router.delete('/notice/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Notice.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/notice');
        })
    })
    .post('/notice/edit/:id', function(req, res) {
        let notice = {};
        notice.text = req.body.text;
        notice.color = req.body.color;
        notice.bgcolor = req.body.bgcolor;
       
        let query = { _id: req.params.id }
        Notice.update(query, notice, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/notice');
                }
            }
        })

    })
module.exports = router;