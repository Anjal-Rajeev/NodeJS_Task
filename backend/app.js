const express = require('express')
const cors = require('cors');
const logger = require('morgan'); // for seeing the http status of every api calls

const app = new express();

const PORT = process.env.PORT || 3000; 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))



const employeeApi = require('./routes/route')      // all the api calls with "/employees" in it will be re-directed to route.js file
app.use('/employees', employeeApi)






app.listen(PORT, ()=>{
    console.log(`-----Server is running on port ${PORT}`);
})