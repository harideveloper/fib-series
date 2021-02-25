const { response } = require("express");
var express = require("express");
var app= express();
var path = require('path');
app.use(express.urlencoded());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
require("./routes/routes.js")(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



