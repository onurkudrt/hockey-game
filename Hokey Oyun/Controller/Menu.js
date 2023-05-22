const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/',(request,response)=>{

    fs.readFile(path.dirname(__dirname)+"/View/Menu/Menu.html",(err,data)=>{
    response.end(data);
    });
});


module.exports = router;