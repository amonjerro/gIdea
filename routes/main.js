const express = require('express');
const router = express.Router();
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();

router.get('/',function(req,resp){
	resp.render('home');
})

router.get('/play',function(req,resp){
	if (req.query.action == 'new'){
		resp.render('play',{new:true})
		return;
	}
	if (req.query.action == 'load'){
		MongoConn.games.find({'_id':MongoConn.turnToID(req.query.id)}).then(function(gameState){
			resp.render('play',{new:false,id:JSON.stringify(gameState[0])})
		})
	}
})



module.exports = router;