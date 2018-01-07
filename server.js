const express = require('express');
var server = express();
const bodyParser = require('body-parser');


var navigator = require('./routes/main');

server.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
server.engine('handlebars',handlebars.engine);
server.set('view engine','handlebars');

server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}))



server.use(express.static(__dirname + '/public'));
server.use('/', navigator);


server.use(function(req,res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});

server.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


server.listen(server.get('port'),function(){
	console.log('Running - Ctrl+C to stop application');
});