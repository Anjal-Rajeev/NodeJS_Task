const express = require('express');
const router = express.Router();
const XLSX = require('xlsx'); // package for using excel 



const workbook = XLSX.readFile('employeeData.xlsx'); // reading excel file 

// for selecting data from sheet 1
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName]

// Convert the worksheet to JSON
let data = XLSX.utils.sheet_to_json(worksheet);


// code from stackoverflow starts here
function ec(r, c){
    return XLSX.utils.encode_cell({r:r,c:c});
}
 
function delete_row(ws, row_index){
    var variable = XLSX.utils.decode_range(ws["!ref"])
    for(var R = row_index; R < variable.e.r; ++R){
        for(var C = variable.s.c; C <= variable.e.c; ++C){
            ws[ec(R,C)] = ws[ec(R+1,C)];
        }
    }
    variable.e.r--
    ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
}
// code from stackoverflow ends here


// for fetching all data from excel
router.get('', (req, res)=>{

    try { 
        console.log(data);

        // Return the data to frontend
        res.send(data).status(200);

    } catch (error) { 

        console.log("error from employees api ", error);
    }
    
})


// for deleting an employee using Emp_ID
router.delete('/delete-employee/:id', (req, res)=>{

    try {
        let id = req.params.id     // taking id of the employee from url
        console.log(id);
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        console.log(range);
    
        for (let i = range.s.r; i <= range.e.r; i++) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: i, c: 0 })];
            if (cell.v == id) {
                console.log(cell);
                delete_row(worksheet, i) //calling a function for deleting a row 
                XLSX.writeFile(workbook, 'employeeData.xlsx');
                data = XLSX.utils.sheet_to_json(worksheet); // re-assigning all data into data variable 
                console.log("after delete",data);
                res.json({"status":"success"})
                
            }
        } 
      
   
    } catch (error) {

        console.log("error from delete-employee api ", error); 
    }
}) 




module.exports = router 