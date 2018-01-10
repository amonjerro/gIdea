const express = require('express');
const router = express.Router();
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();

router.get('/',function(req,resp){
	resp.render('home');
})



module.exports = router;