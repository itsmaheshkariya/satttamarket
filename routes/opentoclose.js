const express = require('express');
const router = express.Router();

let Open = require('../models/opentoclose');
let Settings = require('../models/settings');




router.get('/open', function(req, res) {

    Open.find({}, function(err, opens) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/open', {
                        title: 'SAT MAT RAT',
                        opens: opens,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/open', function(req, res) {
    let open = new Open();
    open.text = req.body.text;
    open.color = req.body.color;
    
    open.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/open');
            }
        }
    });
})

router.get('/open/edit/:id', function(req, res) {
    Open.findById(req.params.id, function(err, opens) {
        res.render('pages/openedit', {
            title: 'SATMATRAT',
            opens: opens
        });
    });
})



router.delete('/open/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Open.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/open');
        })
    })
    .post('/open/edit/:id', function(req, res) {
        let open = {};
        open.text = req.body.text;
        open.color = req.body.color;
       
        let query = { _id: req.params.id }
        Open.update(query, open, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/open');
                }
            }
        })

    })
module.exports = router;