'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer')
// var upload = multer({ dest: 'uploads/', filename: 'temp' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //   cb(null, '/tmp/my-uploads')
        cb(null, './')

    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, 'temp')

    }
})

var upload = multer({ storage: storage })
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
    res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
    if (req.file !== undefined) res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
    else res.json({message: 'You must select a file first'});
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
