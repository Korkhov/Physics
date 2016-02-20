var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var _ = require('underscore'),
    fs = require('fs'),
    question = require('./models/question.js')(_, fs);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded()); 
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin', routes.admin);

////////////////////////////////////////////////////Questionnaire part

app.post('/question/getAll', questionnaireHandler);
app.post('/question/getById', questionnaireHandler);
app.post('/question/checkAnswer', questionnaireHandler);
app.post('/question/add', questionnaireHandler);
app.post('/question/getAllIds', questionnaireHandler);
app.post('/question/remove', questionnaireHandler);

function questionnaireHandler(req, res) {
    var methodName = req.url.split('/')[2];
    question[methodName](req.body, function (err, result) {
        if (err) {
            res.send({
                err: err,
                data: null
            });
        }
        else {
            res.send({
                err: null,
                data: result
            });
        }
    });
}

//////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
