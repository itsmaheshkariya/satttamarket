const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const crypto = require('crypto')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const expressMessages = require('express-messages');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
const config = require('./config/database')

require('./config/passport')(passport);







// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         req.flash('danger', 'please login');
//         res.redirect('/login');
//     }
// }







// const URI = 'mongodb://maheshkareeya:mahesh619619Key@ds237610.mlab.com:37610/qcom';
// const URI = 'mongodb://localhost/qcom';
mongoose.connect(config.database)
    .then(db => console.log('Db is connected'));
let gfs;
const conn = mongoose.createConnection(config.database);


conn.once('open', () => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})
const storage = new GridFsStorage({
    url: config.database,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


let Satta = require('./models/satta');
let satta = require('./routes/satta');

let Live = require('./models/live');
let live = require('./routes/live');

let Footer = require('./models/footer');
let footer = require('./routes/footer');

let Open = require('./models/opentoclose');
let open = require('./routes/opentoclose');

let Time = require('./models/time');
let time = require('./routes/time');

let Chart = require('./models/chart');
let chart = require('./routes/chart');

let NewChart = require('./models/newchart');
let newchart = require('./routes/newchart');

let Settings = require('./models/settings');
let settings = require('./routes/settings');
let Users = require('./models/user');
let users = require('./routes/users');
// let Upimg = require('./models/upimg');
// let upimg = require('./routes/upimg');


require('./config/passport');
express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')
    .use(methodOverride('_method'))
    //Express session middleware
    .use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true

    }))

//Express session

.use(require('connect-flash')())
    .use(function(req, res, next) {
        res.locals.messages = require('express-messages')(req, res);
        next();
    })


// Express Validator Middleware
.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }))
    //Passport Config




//Passport middle ware
.use(passport.initialize())
    .use(passport.session())


.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
})


.get('/patti/:id', function(req, res) {

        Satta.findById(req.params.id, function(err, findtitle) {

            NewChart.find({ unikey: '' + req.params.id }, function(err, charts) {
                res.render('pages/patti', {
                    chartnn: charts,
                    idid: req.params.id,
                    findtitlen: findtitle
                });
            });

        });

    })
    .get('/number/:id', function(req, res) {

        Satta.findById(req.params.id, function(err, findtitle) {

            NewChart.find({ unikey: '' + req.params.id }, function(err, charts) {
                res.render('pages/number', {
                    chartnn: charts,
                    findtitlen: findtitle
                });
            });

        });

    })

// .get('/number/:id', function(req, res) {
//     NewChart.find({ unikey: '' + req.params.id }, function(err, charts) {
//         res.render('pages/number', {
//             chartnn: charts
//         });
//     });
// })



.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/', satta)
    .use('/', live)
    .use('/', open)
    .use('/', footer)
    .use('/', time)
    .use('/', chart)
    .use('/', newchart)
    .use('/', settings)
    .use('/', users)
    .get('/Upimg', function(req, res) {
        gfs.files.find().toArray((err, files) => {


            if (!files || files.length === 0) {
                res.render('pages/upimg', { files: false });

            } else {
                files.map(file => {
                    if (file) {
                        if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
                            file.isImage = true;
                        } else {
                            file.isImage = false;
                        }
                    }
                })
            }

            res.render('pages/upimg', { files: files });






        })

    })

.post('/Upimg/upload', upload.single('file'), (req, res) => {
        // res.json({ file: req.file });
        req.flash('success', 'File Uploaded Successfully');
        res.redirect('/Upimg');

    })
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
    .get('/', (req, res) => {



        gfs.files.find().toArray((err, files) => {


            if (!files || files.length === 0) {
                // res.render('pages/upimg', { files: true });

            } else {
                files.map(file => {
                    if (file) {
                        if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
                            file.isImage = true;
                        } else {
                            file.isImage = false;
                        }
                    }
                })
            }



            Live.find({}, function(err, lives) {
                if (err) {
                    console.log(err);
                } else {

                    Satta.find({}, function(err, sattas) {
                        if (err) {
                            console.log(err);
                        } else {


                            Settings.find({}, function(err, settings) {
                                if (err) {
                                    console.log(err);
                                } else {

                                    Footer.find({}, function(err, footers) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            Time.find({}, function(err, times) {
                                                if (err) {
                                                    console.log(err);
                                                } else {

                                    Chart.find({ unikey: '' + req.params.id }, function(err, charts) {
                                        res.render('pages/output', {
                                            title: 'SAT MAT RAT',
                                            satta: sattas,
                                            live: lives,
                                            chartn: charts,
                                            settings: settings,
                                            files: files,
                                            footers:footers,
                                            times:times
                                        });
                                    });


                                }
                            });
                                }
                            });




                                }
                            });
                        }


                    })

                }
            });
            // res.render('pages/upimg', { files: files });






        })
























    })


.get('/Upimg/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //Check files

        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exit'
            });
        }

        // readstream = gfs.createReadStream(files);

        // readstream.pipe(res);
        return res.json(files);
    })
})


.get('/Upimg/files/:filename', (req, res) => {
    gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
        //Check files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exit'
            });
        }
        return res.json(files);
    })
})

//Display image
.get('/Upimg/images/:filename', (req, res) => {
    gfs.files.find({ filename: req.params.filename }).toArray((files) => {


        const readstream = gfs.createReadStream(req.params.filename);
        readstream.pipe(res);



    })
})


.delete('/Upimg/images/:id', (req, res) => {


    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            res.status(404).json({ err: err })
        }

        res.redirect('/admin');


    })




})








// .get('/Charts', (req, res) => res.render('pages/Charts'))

.get('/Charts', function(req, res) {

    Satta.find({}, function(err, sattas) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/Charts', {
                        title: 'SAT MAT RAT',
                        satta: sattas,
                        settings: settings
                    });
                }
            });



           
        }
    });


})

.get('/Show', function(req, res) {

    Satta.find({}, function(err, sattas) {
        if (err) {
            console.log(err);
        } else {


            Settings.find({}, function(err, settings) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/Show', {
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

//new 


.get('/satta_matka_tricks_zone.php',(req,res)=>{
  
    res.render('pages/satta_matka_tricks_zone');
   
      })

.get('/open_to_close', (req, res)=>{

    Open.find({}, function(err, opens) {
        if (err) {
            console.log(err);
        } else {




            Footer.find({}, function(err, footers) {
                if (err) {
                    console.log(err);
                } else {
res.render('pages/open_to_close',{opens:opens,footers:footers})
}       
});

}       
});
})

.get('/weekly_chart', (req, res)=>{
    res.render('pages/weekly_chart')
    })
.get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))





    