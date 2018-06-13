const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const bodyParser = require('body-parser')
const { mongoose } = require('./database');
const PORT = process.env.PORT || 5000
let Satta = require('./models/satta');
let satta = require('./routes/satta');
let Settings = require('./models/settings');
let settings = require('./routes/settings');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/', satta)
    .use('/Settings', settings)

.get('/Results', function(req, res) {

        Satta.find({}, function(err, sattas) {
            if (err) {
                console.log(err);
            } else {


                Settings.find({}, function(err, settings) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('pages/Results', {
                            title: 'SAT MAT RAT',
                            satta: sattas,
                            settings: settings
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
    .get('/Charts', (req, res) => res.render('pages/Charts'))
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))