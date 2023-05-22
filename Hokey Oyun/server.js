const express = require('express');
const app = express();



app.listen(1000);

app.use(express.static('View'));
app.set("View Engine","View");


const menuRouter = require('./Controller/Menu');

app.use('/',menuRouter);

