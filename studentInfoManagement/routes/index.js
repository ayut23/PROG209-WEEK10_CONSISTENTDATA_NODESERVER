var express = require('express');
var router = express.Router();
var fs = require("fs");


let studentArray = [];

let fileManager = {
  
      read: function() {
        if(!fileManager.validData()) {
        var rawdata = fs.readFileSync('objectdata.json');
        let goodData = JSON.parse(rawdata);
        studentArray = goodData;
    }
  },
      write: function() {
        let data = JSON.stringify(studentArray);
        fs.writeFileSync('objectdata.json', data);
    },
      validData: function() {
        var rawdata = fs.readFileSync('objectdata.json');
        console.log(rawdata.length);
          if(rawdata.length < 1) {
              return false;
              }
          else {
              return true;
    }
  }
};



let StudentObject = function (pStudentName, pAge, pMajor, pEducation, pGraduation, pURL) {

    this.StudentName = pStudentName;
    this.Age = pAge;
    
    this.ID = Math.random().toString(16).slice(5);
    this.Major = pMajor;  
    this.Education = pEducation;
    this.Graduation = pGraduation;
    this.URL = pURL;
}

if(!fileManager.validData()){

    studentArray.push(new StudentObject("Khant Nyunt", 24, "Computer Science", "Bachelor's Degree", "2025", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
    studentArray.push(new StudentObject("Justin", 21, "Digital Marketing", "Associate Degree", "2027", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
    studentArray.push(new StudentObject("Sarah", 21, "Business Management", "Certificate", "2024", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
    studentArray.push(new StudentObject("John", 20, "Accounting", "Bachelor's Degree", "2023", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
    fileManager.write();
}
else{
  fileManager.read();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});


router.get('/getStudents', function(req, res) {
  fileManager.read();
  res.status(200).json(studentArray);
});

router.post('/addStudent', function(req, res){
	const newStudent = req.body;
	studentArray.push(newStudent);
  fileManager.write();
	res.status(200).json(newStudent);
});

module.exports = router;
