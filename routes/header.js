const express = require('express');
const router = express.Router();
let Header = require('../models/header');
let Settings = require('../models/settings');




router.get('/header', function(req, res) {

    Header.find({}, function(err, headers) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/header', {
                        title: 'SAT MAT RAT',
                        header: headers,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/header', function(req, res) {
    let header = new Header();
    header.text = req.body.text;
    header.color = req.body.color;
    header.bgcolor = req.body.bgcolor;
   
    header.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/header');
            }
        }
    });
})

router.get('/header/edit/:id', function(req, res) {
    Header.findById(req.params.id, function(err, headers) {
        res.render('pages/headeredit', {
            title: 'SATMATRAT',
            header: headers
        });
    });
})



router.delete('/header/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Header.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/header');
        })
    })
    .post('/header/edit/:id', function(req, res) {
        let header = {};
        header.text = req.body.text;
        header.color = req.body.color;
        header.bgcolor = req.body.bgcolor;
       
        let query = { _id: req.params.id }
        Header.update(query, header, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/header');
                }
            }
        })

    })
module.exports = router;