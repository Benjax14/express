const xlsx = require('xlsx'); 
const path = require('path');
const fs = require('fs');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {createPdf} = require('../services/pdfService');
dotenv.config();

const excelRead = async (req,res) => {

    const mail = process.env.SMTP_USER;
    const pass = process.env.SMTP_PWD;
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

    createPdf(workbook_response);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({
                message: 'Delete fail'
            })
        }
    });

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: mail,
            pass: pass
        }
    });

    const pathFinal = path.join(__dirname, '..', 'temporal', 'pdfCreated.pdf');

    const mailOptions = {
        from: mail,
        to: mail,
        subject: "Aviso",
        html: "<h3>"+"hola"+"</h3>",
        attachments: [
            {
                filename: 'Reporte.pdf',
                path: pathFinal
            }
        ]
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({
                status: "error",
                message: "Error al enviar el correo",
                error: error.message
            });
        }

        return res.status(200).json({
            status: "success",
            message: "¡Correo enviado con éxito!"
        });

    });

}



module.exports = {
    excelRead
}