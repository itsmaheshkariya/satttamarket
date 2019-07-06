const express = require('express');
const router = express.Router();
let Footer = require('../models/footer');
let Settings = require('../models/settings');




router.get('/footer', function(req, res) {

    Footer.find({}, function(err, footers) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/footer', {
                        title: 'SAT MAT RAT',
                        footer: footers,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/footer', function(req, res) {
    let footer = new Footer();
    footer.text = req.body.text;
    footer.color = req.body.color;
    footer.bgcolor = req.body.bgcolor;
   
    footer.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/footer');
            }
        }
    });
})

router.get('/footer/edit/:id', function(req, res) {
    Footer.findById(req.params.id, function(err, footers) {
        res.render('pages/footeredit', {
            title: 'SATMATRAT',
            footer: footers
        });
    });
})



router.delete('/footer/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Footer.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/footer');
        })
    })
    .post('/footer/edit/:id', function(req, res) {
        let footer = {};
        footer.text = req.body.text;
        footer.color = req.body.color;
        footer.bgcolor = req.body.bgcolor;
       
        let query = { _id: req.params.id }
        Footer.update(query, footer, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/footer');
                }
            }
        })

    })
module.exports = router;