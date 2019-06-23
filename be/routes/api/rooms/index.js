var express = require('express');
var router = express.Router();
var mysqlDB = require('./../../mysql-db');

/* GET home page. */
router.get('/', function(req, res, next) {
  mysqlDB.query("SELECT * FROM rooms;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.json(result);
      console.log(result)
    }
  });
});

router.post('/', (req, res, next) => { // 생성
  mysqlDB.query("INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)", [
      body.name, body.modelnumber, body.series
    ], function(){
      res.redirect("/");
  });
});

router.put('/:type', (req, res, next) => { // 수정
  const type = req.param.type
  if(type == "room"){
    const { roomNo, beReserved, startDate, endDate, inTime, outTime, subsName, subsTel, peopleCnt }  = req.body
    mysqlDB.query('update ROOMS set beReserved=?, startDate=?, endDate=?, inTime=?, outTime=?, subsName=?, subsTel=?, peopleCnt=? where id=?',
      [beReserved, startDate, endDate, inTime, outTime, subsName, subsTel, peopleCnt, roomNo], function (err, rows, fields) {
        if (!err) {
          res.redirect("/");
        } else {
            res.send('error : ' + err);
        }
    });
  }else {
    const { roomNo, isBestRoom, isSmart, setTemp }  = req.body
    mysqlDB.query('update ROOMS set isBestRoom=?, isSmart=?, setTemp=? where id=?',
      [isBestRoom, isSmart, setTemp, roomNo], function (err, rows, fields) {
        if (!err) {
          res.redirect("/");
        } else {
            res.send('error : ' + err);
        }
    });
  }
});

router.delete('/:roomNo', (req, res, next) => { // 삭제
  const roomNo = req.params.roomNo
  mysqlDB.query('delete from ROOMS where id=?', [roomNo], function (err, rows, fields) {
      if (!err) {
          res.redirect("/");
      } else {
          res.send('error : ' + err);
      }
  });
})

module.exports = router;
