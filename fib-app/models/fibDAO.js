
const { resourceLimits } = require("worker_threads");
const connection = require("../config/db-connection.js");

var results = [];

// change here to test
//var max_range= 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
var max_range = 2000;
//var max_range = 100;

var table = "fibonacci";
var asc ;

// Constructor
const FibDAO = function (fibDAO) {
  this.id = fibDAO.id;
  this.series = fibDAO.series;
};

// Retrieve DB Service
FibDAO.getAll = result => {
  connection.query(`SELECT * FROM ${table} order by id asc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    asc = res[res.length - 1].series.split( ',' );
    result(null,asc);
  });
};

// Sort Data
FibDAO.sortDesc = result => {
  connection.query(`SELECT * FROM ${table} order by id asc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    asc = res[res.length - 1].series.split( ',' );
    result(null,asc.reverse());       
    //result(null,iterator(res));   
  });
};


FibDAO.search = (search,result) => {
  connection.query(`SELECT * FROM ${table} order by id asc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    var match_found = false;
    Object.entries(res).forEach(([key, value]) => {
        if (key == (Object.keys(res).length - 1)) {
          if(search == 1){
            result(null, "Lucky,You've found a fibonacci number "+"  "+ search);
          }
          if((value.series.includes(','+search+',') == true)){
            match_found = true;
            result(null, "Lucky, You've found a fibonacci number "+"  "+ search);
          }
        }      
    });   
    if ((match_found == false) && (search != 1)){
      result(null, "Try Again !!! Not a fibonacci number  "+"  "+ search);
    }
  });
};


// Insert DB Service 
FibDAO.insertAll = (fibDAO, result) => {
  // Generate fibonacci series for the given max range
  fibDAO = generate(max_range);
  connection.query(`INSERT INTO fibonacci SET series='${fibDAO}'`,(err, res) => {
    if (err) {
      console.log("Error in DB Operation: ", err);
      result(err, null);
      return;
    } else {
      console.log("Database Update Successfull");
      result(null, fibDAO);
    }
  });
}

// Generate Fibonacci Series
const generate = (max_range) => {
  results.push(1);
  results.push(2);
  process(results, max_range).then(function () {
    results.forEach(function (element) {
    })
  });
  return results;
}

const process = (results, max_range) => {
  return new Promise(function (resolve, reject) {
    item = results[results.length - 1] + results[results.length - 2];
    if (item > max_range) {
      resolve();
    } else {
      results.push(item);
      resolve(process(results, max_range)).catch(reject);
    }
  });
}

// Object Iterator
const iterator = (res) => {
  Object.entries(res).forEach(([key, value]) => {
    if (key == (Object.keys(res).length - 1)) {
      if(null != value.series){ 
        return value.series;
      }
    }      
});  
}

module.exports = FibDAO;

