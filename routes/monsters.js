const express = require('express');
const router = express.Router();
const Monster = require('../models/Monster');
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();

router.get('/create/:name',function(req,resp){
	var m = new Monster(MongoConn);
	m.getFromTemplate(req.params.name).then(function(monsterTemplate){
		resp.json(monsterTemplate);
	})
})

module.exports = router;