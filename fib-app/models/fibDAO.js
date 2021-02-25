
const { resourceLimits } = require("worker_threads");
const connection = require("../config/db-connection.js");

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
FibDAO.insertAll = (fibDAO, maxRange, result) => {
  // Generate fibonacci series for the given max range
  var results = [];
  fibDAO = generate(results,maxRange);

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
const generate = (results,maxRange) => {
  results.push(1);
  results.push(2);
  process(results, maxRange).then(function () {
    results.forEach(function (element) {
    })
  });
  return results;
}

const process = (results, maxRange) => {
  return new Promise(function (resolve, reject) {
    item = results[results.length - 1] + results[results.length - 2];
    if (item > maxRange) {
      resolve();
    } else {
      results.push(item);
      resolve(process(results, maxRange)).catch(reject);
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

