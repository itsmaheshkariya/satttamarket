const express = require('express');
const router = express.Router();

//Bring article model
let Live = require('../models/live');
let Settings = require('../models/settings');

router.post('/cuslive',(req,res)=>{
    res.redirect('/cuslive/'+req.body.username)
})


router.get('/cuslive/:cuskey', function(req, res) {

    Live.find({cuskey: req.params.cuskey}, function(err, sattas) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/cuslive', {
                        title: 'SAT MAT RAT',
                        satta1: sattas,
                        settings: settings,
                        cuskey:req.params.cuskey
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
router.post('/cuslivesatta/:cuskey', function(req, res) {
    let satta = new Live();
    satta.cuskey = req.params.cuskey;
    satta.name = req.body.name;
    satta.number = req.body.number;
    satta.time = req.body.time;
    satta.time1 = req.body.time1;
    satta.date = req.body.date;
    satta.bgcolor = req.body.bgcolor;
    satta.color = req.body.color;
    satta.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/cuslive/'+req.params.cuskey);
            }
        }
    });
})

router.get('/cuslivesatta/edit/:id/:cuskey', function(req, res) {
    Live.findById(req.params.id, function(err, sattas) {
        res.render('pages/cusliveedit', {
            title: 'SATMATRAT',
            sattan1: sattas,
            cuskey:req.params.cuskey
        });
    });
})



router.delete('/cuslivesatta/delete/:id/:cuskey', function(req, res) {
        let query = { _id: req.params.id }

        Live.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/cuslive/'+req.params.cuskey);
        })
    })
    .post('/cuslivesatta/edit/:id/:cuskey', function(req, res) {
        let satta = {};
        satta.name = req.body.name;
        satta.number = req.body.number;
        satta.date = req.body.date;
        satta.time = req.body.time;
        satta.time1 = req.body.time1;
        satta.bgcolor = req.body.bgcolor;
        satta.color = req.body.color;
        let query = { _id: req.params.id }
        Live.update(query, satta, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/cuslive/'+req.params.cuskey);
                }
            }
        })

    })
module.exports = router;