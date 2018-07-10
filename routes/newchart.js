const express = require('express');
const router = express.Router();

//Bring article model
// let Satta = require('../models/satta');
let Chart = require('../models/newchart');
let Satta = require('../models/satta');


router.get('/patti/:id', function(req, res) {
    // Chart.find({unikey:''+req.params.id});
    Chart.find({ unikey: '' + req.params.id }, function(err, charts) {
        res.render('pages/patti', {
            title: 'SATMATRAT',
            chartn: charts
        });
    });
})








// router.get('/patti/chart/edit', function(req, res) {
//     res.render('pages/submittonewchart');
// })
router.get('/patti/chart/edit/:id', function(req, res) {
    Satta.findById(req.params.id, function(err, sattas) {
        res.render('pages/submittonewchart', {
            title: 'SATMATRAT',
            sattan: sattas
        });
    });
})





router.post('/patti/chart/edit/:id', function(req, res) {
    let chart = new Chart();
    chart.unikey = req.params.id;
    chart.name = req.body.name;
   
    chart.l1 = req.body.l1;
    chart.l2 = req.body.l2;
    chart.l3 = req.body.l3;
    chart.m1 = req.body.m1;
    chart.m2 = req.body.m2;
    chart.r1 = req.body.r1;
    chart.r2 = req.body.r2;
    chart.r3 = req.body.r3;
    chart.time = req.body.time;
    chart.time1 = req.body.time1;
    chart.date = req.body.date;


    chart.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            {

                res.redirect('/admin');
            }
        }
    });
})
module.exports = router;