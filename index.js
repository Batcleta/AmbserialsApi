require('dotenv/config');

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const dbConnection = require('./app/server/02-config')
dbConnection.AmbAseSync.sync()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/controller/routes")(app)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});