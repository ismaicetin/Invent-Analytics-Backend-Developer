
const express       = require('express');
const app           = express();
const cors          = require('cors');
const bodyParser    = require('body-parser');
const command       = require('./command') 
 
require("./config/db");
 
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());
app.use((req, res, next)=> {console.clear();next() });

// geri dondurulecek degeri otomatik yapacak
app.use(command.ResponseModify); 

// API ENDPOINTS 
 
app.use('/api', require("./router"))
 
app.use('/', async (req, res) => { 
    return req.returnTemplate("ismail çetin tel: 0531 321 11 10 ", "ESA!")
  })   

const port = 3000;
const server = app.listen(port, function () {
    console.log(`Server (Açmak için ctrl + Left click) http://localhost:${port}`);
});