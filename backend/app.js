const express = require('express')
const cors = require('cors');
const logger = require('morgan');

const app = new express();

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))



const employeeApi = require('./routes/route')
app.use('/employees', employeeApi)






app.listen(PORT, ()=>{
    console.log(`-----Server is running on port ${PORT}`);
})