module.exports = app => {
    const controller = require("../controllers/app-controller.js");

    // Routes
    app.get('/',function(req,res){
        res.render(__dirname + './../views/index.ejs');
    });
    
    app.get('/search',function(req,res){
        res.render(__dirname + './../views/search.ejs');
    });

    app.get("/retrieve", controller.getSeries);
    app.get("/create", controller.createSeries);
    app.get("/order", controller.orderSeries);
    app.post("/search", controller.search);

};
