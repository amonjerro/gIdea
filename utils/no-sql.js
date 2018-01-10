// require('dotenv').config();

// var env = JSON.parse(process.env.VCAP_SERVICES);
// var mongoURI = process.env.MONGO_URI
// var mongoSSLCA = env["compose-for-mongodb"][0]["credentials"]["ca_certificate_base64"];
// var options = {
//     ssl: true,
//     sslCA: mongoSSLCA,
// };
var mongodb = require('monk')('localhost:27017/game');

function DB(){
	this.monsters = mongodb.get('monsters');
	this.activeEnemies = mongodb.get('active');
	this.games = mongodb.get('games');
}

DB.prototype.clearActive = function(){
	this.activeEnemies.remove({});
}

DB.prototype.turnToID = function(idString){
	return monk.id(idString);
}

module.exports = DB;