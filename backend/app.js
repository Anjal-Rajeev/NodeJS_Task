const express = require('express')
const cors = require('cors');
const logger = require('morgan');
const XLSX = require('xlsx');

const app = new express();

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))


// for fetching all data from excel
app.get('/employees', (req, res)=>{

    try {
        const workbook = XLSX.readFile('employeeData.xlsx');
        console.log(workbook);

        // for selecting data from sheet 1
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet to JSON
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Return the data to frontend
        res.send(data);

    } catch (error) {

        console.log("error from employees api ", error);
    }
    
})

// for deleting an employee
app.delete('/delete-employee/:id', (req, res)=>{

    try {
        let data1 = req.params.id

    } catch (error) {

        console.log("error from delete-employee api ", error);
    }
})


app.listen(PORT, ()=>{
    console.log(`-----Server is running on port ${PORT}`);
})