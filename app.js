const express = require('express');
const app = express();

const {staticRoutes} = require("./routes/static");
const {ipRoutes} = require("./routes/ip");
const {PORT} = require('./configs/serverConfigs');

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.use('/static/', staticRoutes);
app.use('/ip/', ipRoutes);

const server = app.listen(PORT, () => {
    console.log(`App started: ${PORT}`)
});

module.exports = {server}
