const express = require('express');
const router = express.Router();
let Khatri = require('../models/khatri');
let Settings = require('../models/settings');




router.get('/khatri', function(req, res) {

    Khatri.find({}, function(err, khatris) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/khatri', {
                        title: 'SAT MAT RAT',
                        khatris: khatris,
                        settings: settings
                    });
                }
            });

        }
    });


})


router.get('/outkhatri', function(req, res) {

    Khatri.find({}, function(err, khatris) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/outkhatri', {
                        title: 'SAT MAT RAT',
                        khatris: khatris,
                        settings: settings
                    });
                }
            });

        }
    });


})

// .get('/outkhatri',(req,res)=>{
//     Khatri.find({},function(err,khatris){
//      res.render('pages/outkhatri',{
//          khatris:khatris
//      });
//     })
// })




router.post('/khatri', function(req, res) {
    let khatri = new Khatri();
    khatri.head = req.body.head;
    khatri.tail = req.body.tail;
   
    khatri.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/khatri');
            }
        }
    });
})

router.get('/khatri/edit/:id', function(req, res) {
    Khatri.findById(req.params.id, function(err, khatris) {
        res.render('pages/khatriedit', {
            title: 'SATMATRAT',
            khatris: khatris
        });
    });
})



router.delete('/khatri/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Khatri.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/khatri');
        })
    })
    .post('/khatri/edit/:id', function(req, res) {
        let khatri = {};
        khatri.head = req.body.head;
        khatri.tail = req.body.tail;

       
        let query = { _id: req.params.id }
        Khatri.update(query, khatri, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/khatri');
                }
            }
        })

    })
module.exports = router;