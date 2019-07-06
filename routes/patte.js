const express = require('express');
const router = express.Router();
let Patte = require('../models/patte');
let Settings = require('../models/settings');




router.get('/patte', function(req, res) {

    Patte.find({}, function(err, pattes) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/patte', {
                        title: 'SAT MAT RAT',
                        patte: pattes,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/patte', function(req, res) {
    let patte = new Patte();
    patte.text = req.body.text;
    patte.color = req.body.color;
    patte.bgcolor = req.body.bgcolor;
    patte.select1 = req.body.select1;
    patte.select2 = req.body.select2;
    patte.select3 = req.body.select3;
    patte.total = req.body.total;
   
    patte.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/patte');
            }
        }
    });
})

router.get('/patte/edit/:id', function(req, res) {
    Patte.findById(req.params.id, function(err, pattes) {
        res.render('pages/patteedit', {
            title: 'SATMATRAT',
            patte: pattes
        });
    });
})



router.delete('/patte/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Patte.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/patte');
        })
    })
    .post('/patte/edit/:id', function(req, res) {
        let patte = {};
        patte.text = req.body.text;
        patte.color = req.body.color;
        patte.bgcolor = req.body.bgcolor;
        patte.select1 = req.body.select1;
        patte.select2 = req.body.select2;
        patte.select3 = req.body.select3;
        patte.total = req.body.total;
       
        let query = { _id: req.params.id }
        Patte.update(query, patte, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/patte');
                }
            }
        })

    })
module.exports = router;