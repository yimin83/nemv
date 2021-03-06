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
      // console.log(result)
    }
  });
});

router.post('/', (req, res, next) => { // 생성
  mysqlDB.query("INSERT INTO rooms (name, modelnumber, series) VALUES (?, ?, ?)", [
      body.name, body.modelnumber, body.series
    ], function(){
      res.redirect("/");
  });
});

router.put('/:type', (req, res, next) => { // 수정
  const type = req.params.type
  if(type == "room"){
    console.log(req.body)
    const { roomNo, beReserved, startDate, endDate, inTime, outTime, subsName, subsTel, peopleCnt }  = req.body
    mysqlDB.query('update rooms set beReserved=?, startDate=?, endDate=?, inTime=?, outTime=?, subsName=?, subsTel=?, peopleCnt=? where roomNo=?',
      [beReserved, startDate, endDate, inTime, outTime, subsName, subsTel, peopleCnt, roomNo], function (err, rows, fields) {
        if (!err) {
          console.log("room put ok")
          res.send({ success: true })
        } else {
            res.send('error : ' + err);
            console.log(err)
        }
    });
  }else {
    const { roomNo, isBestRoom, isSmart, setTemp }  = req.body
    mysqlDB.query('update rooms set isBestRoom=?, isSmart=?, setTemp=? where roomNo=?',
      [isBestRoom, isSmart, setTemp, roomNo], function (err, rows, fields) {
        if (!err) {
          res.send({ success: true })
          console.log("temp put ok")
        } else {
            res.send('error : ' + err);
            console.log(err)
        }
    });
  }
});

router.delete('/:roomNo', (req, res, next) => { // 삭제
  const roomNo = req.paramss.roomNo
  mysqlDB.query('delete from rooms where id=?', [roomNo], function (err, rows, fields) {
      if (!err) {
        res.send({ success: true })
        console.log("delete ok")
      } else {
          res.send('error : ' + err);
      }
  });
})

module.exports = router;
