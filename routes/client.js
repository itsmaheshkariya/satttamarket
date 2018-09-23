const express = require('express');
const router = express.Router();
let Client = require('../models/client');
let Settings = require('../models/settings');




router.get('/client', function(req, res) {

    Client.find({}, function(err, clients) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/client', {
                        title: 'SAT MAT RAT',
                        clients: clients,
                        settings: settings
                    });
                }
            });

        }
    });


})
router.post('/client', function(req, res) {
    let client = new Client();
    client.name = req.body.name;
    client.password = req.body.password;
   
    client.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/client');
            }
        }
    });
})

router.get('/client/edit/:id', function(req, res) {
    Client.findById(req.params.id, function(err, clients) {
        res.render('pages/clientedit', {
            title: 'SATMATRAT',
            client: clients
        });
    });
})



router.delete('/client/delete/:id', function(req, res) {
        let query = { _id: req.params.id }

        Client.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/client');
        })
    })
    .post('/client/edit/:id', function(req, res) {
        let client = {};
        client.name = req.body.name;
        client.password = req.body.password;

       
        let query = { _id: req.params.id }
        Client.update(query, client, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/client');
                }
            }
        })

    })
module.exports = router;