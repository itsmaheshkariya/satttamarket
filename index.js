const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const bodyParser = require('body-parser')
const { mongoose } = require('./database');
const PORT = process.env.PORT || 5000
let Satta = require('./models/satta');



express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/', function(req, res) {

        Satta.find({}, function(err, sattas) {
            if (err) {
                console.log(err);
            } else {
                res.render('pages/index', {
                    title: 'SAT MAT RAT',
                    satta: sattas
                });
            }
        });


    })
    .get('/Results', function(req, res) {

        Satta.find({}, function(err, sattas) {
            if (err) {
                console.log(err);
            } else {
                res.render('pages/Results', {
                    title: 'SATMATRAT RESULTS',
                    satta: sattas
                });
            }
        });


    })
    .post('/satta', function(req, res) {
        let satta = new Satta();
        satta.name = req.body.name;
        satta.number = req.body.number;
        satta.time = req.body.time;
        satta.date = req.body.date;


        satta.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/');
                }
            }
        });
    })

.get('/satta/edit/:id', function(req, res) {
    Satta.findById(req.params.id, function(err, sattas) {
        res.render('pages/edit', {
            title: 'SATMATRAT',
            sattan: sattas
        });
    });
})



.delete('/:id', function(req, res) {
        let query = { _id: req.params.id }

        Satta.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/');



        })
    })
    .get('/Charts', (req, res) => res.render('pages/Charts'))
    .get('/cool', (req, res) => res.send(cool()))


.post('/satta/edit/:id', function(req, res) {
        let satta = {};
        satta.name = req.body.name;
        satta.number = req.body.number;
        satta.date = req.body.date;
        satta.time = req.body.time;


        let query = { _id: req.params.id }
        Satta.update(query, satta, function(err) {
            if (err) {
                console.log(err);
            } else {
                {

                    res.redirect('/');
                }
            }
        })

    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))