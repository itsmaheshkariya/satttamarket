const express = require('express');
const router = express.Router();

//Bring article model
// let Satta = require('../models/satta');
let NewChart = require('../models/newchart');
let Satta = require('../models/satta');


router.get('/patti/:id', function(req, res) {
    
    // Chart.find({unikey:''+req.params.id});
    NewChart.find({ unikey: '' + req.params.id }, function(err, charts) {
        res.render('pages/patti', {
            title: 'SATMATRAT',
          
            chartnn: charts
        });
    });
})








// router.get('/patti/chart/edit', function(req, res) {
//     res.render('pages/submittonewchart');
// })
router.get('/patti/chart/edit/:id', function(req, res) {
    Satta.findById(req.params.id, function(err, sattas) {
        NewChart.find({ unikey: '' + req.params.id }, function(err, charts) {
        res.render('pages/submittonewchart', {
            title: 'SATMATRAT',
            sattan: sattas,
            charts:charts
        });

    });
    });
})





router.post('/patti/chart/edit/:id', function(req, res) {
    let newchart = new NewChart();
    newchart.unikey = req.params.id;
    newchart.name = req.body.name;
   
    newchart.l1 = req.body.l1;
    newchart.l2 = req.body.l2;
    newchart.l3 = req.body.l3;
    newchart.m1 = req.body.m1;
    newchart.m2 = req.body.m2;
    newchart.r1 = req.body.r1;
    newchart.r2 = req.body.r2;
    newchart.r3 = req.body.r3;
    newchart.time = req.body.time;
    newchart.time1 = req.body.time1;
    newchart.date = req.body.date;
    newchart.color = req.body.color;


    newchart.save(function(err) {
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