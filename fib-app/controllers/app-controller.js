
const FibDAO = require("../models/fibDAO.js");

// Retrieve data from database

exports.getSeries = (req, res) => {
  FibDAO.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || " Error : Retrieve Fibonacci Series Failed"
      });
      else {
        res.render('display.ejs', { data: data });
      }
  });
};

// Create Fibonacci Series and Insert to DB
exports.createSeries = (req,res) => {
  const fibDAO = new FibDAO({
    id: req.id,
    series: req.series
  });

  FibDAO.insertAll(fibDAO,req.body.maxRange, (err,data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Error :  Insert Fibonacci Series Failed"
      });
    } else {
      res.render('create.ejs', { data: data });
    }
  });
}

// Order Series by Desc
exports.orderSeries = (req,res) => {
  FibDAO.sortDesc((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error :  Fibonacci Sorting Failed"
      });
      else {
        res.render('display.ejs', { data: data });
      }
  });
};


// Search Series
exports.search = (req,res) => {
  FibDAO.search(req.body.searchId,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || " Error : Fibonacci Search Failed"
      });
      else {
        res.render('display.ejs', { data: data });
      }
  });
};





