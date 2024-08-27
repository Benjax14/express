const xlsx = require('xlsx'); 
const path = require('path');
const fs = require('fs');

const excelRead = async (req,res) => {

    const validExtensions = ['.xlsx'];
    const filePath = req.file.path;
    const isValid = validExtensions.some(ext => filePath.endsWith(ext));

    if(isValid == false){
        return res.status(409).send({
            message: 'Not allowed extension'
        })
    }

    const workbook = xlsx.readFile(filePath);
    let workbook_sheet = workbook.SheetNames;
    let workbook_response = xlsx.utils.sheet_to_json(
        workbook.Sheets[workbook_sheet[0]]
    );

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({
                message: 'Delete fail'
            })
        }
    });

    return res.status(200).send({
        message: workbook_response,
    });
}



module.exports = {
    excelRead
}