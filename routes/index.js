var express = require('express');
var router = express.Router();



var userModel = require('./users');
var task = require('./task');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function (req, res) {
  userModel.create({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  }).then(function (createduser) {
    res.send("user is created")

  })
  // .catch(function (err) {
  //   var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //   if (req.body.email.match(validRegex)) {

  //     alert("Valid email address!");

  //     // document.form1.text1.focus();

  //     // return true;

  //   } else {

  //     alert("Invalid email address!");

  //     // document.form1.text1.focus();

  //     // return false;

  //   }

  
  // });


});

router.get("/read", function (req, res) {

  userModel.find().then(function (users) {
    res.send(users)

  })
});

router.post('/taskassigned', function (req, res) {

  task.create({

    userid: req.body.user,
    taskname: req.body.taskname,
    tasktype: req.body.tasktype

  }).then(function (taskassigned) {

    userModel.findOne({ _id: req.body.user }).then(function (selecteduser) {
      selecteduser.taskid = taskassigned._id;
      selecteduser.save().then(function (user) {
        res.send("task allotted")


      })


    })


  })


})

router.get('/show', function (req, res) {
  task.find().then(function (tasks) {
    res.send(tasks);

  })
})



router.get('/taskassign', function (req, res) {


  userModel.find().then(function (allusers) {

    res.render('taskassign', { allusers });

  })

})


router.get('/table', async function (req, res) {

  const data = await userModel.find({}).populate("taskid")
    res.render("table",{data})
  });
module.exports = router;
