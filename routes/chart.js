const express = require('express');
const router = express.Router();

//Bring article model
// let Satta = require('../models/satta');
let Chart = require('../models/chart');
let Satta = require('../models/satta');


router.get('/Show/:id', function(req, res) {
    // Chart.find({unikey:''+req.params.id});
    Chart.find({ unikey: '' + req.params.id }, function(err, charts) {
        res.render('pages/showchart_patti', {
            title: 'SATMATRAT',
            chartn: charts
        });
    });
})
router.get('/Show/Numbers/:id', function(req, res) {
    // Chart.find({unikey:''+req.params.id});
    Chart.find({ unikey: '' + req.params.id }, function(err, charts) {
        res.render('pages/showchart_numbers', {
            title: 'SATMATRAT',
            chartn: charts
        });
    });
})
router.get('/chart/edit', function(req, res) {
    res.render('pages/submittochart');
})
router.get('/chart/edit/:id', function(req, res) {
    Satta.findById(req.params.id, function(err, sattas) {
        res.render('pages/submittochart', {
            title: 'SATMATRAT',
            sattan: sattas
        });
    });
})





router.post('/chart/edit/:id', function(req, res) {
    let chart = new Chart();
    chart.unikey = req.params.id;
    chart.name = req.body.name;
    chart.jodi = req.body.jodi;
    chart.patti = req.body.patti;
    chart.time = req.body.time;
    chart.date = req.body.date;


    chart.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/');
            }
        }
    });
})
module.exports = router;