const PDFDocument = require("pdfkit");
const fs = require("fs");
const { sumTotal } = require("../Helpers/calculatePDF");

function createPdf(params) {
  const doc = new PDFDocument({ size: "A4", margin: 10 });
  doc.pipe(fs.createWriteStream("temporal/pdfCreated.pdf"));

  doc.fontSize(12).text("Rep", 105, 10);
  doc.fontSize(12).text("Region", 155, 10);
  doc.fontSize(12).text("Item", 205, 10);
  doc.fontSize(12).text("Units", 255, 10);
  doc.fontSize(12).text("Unit Cost", 305, 10);
  doc.fontSize(12).text("Total", 370, 10);

  let Y = 30;
  let total = 0;

  total = sumTotal(params);

  for (const data of params) {
    doc.fontSize(10).text(`${data.Rep}`, 105, Y);
    doc.fontSize(10).text(`${data.Region}`, 155, Y);
    doc.fontSize(10).text(`${data.Item}`, 205, Y);
    doc.fontSize(10).text(`${data.Units}`, 255, Y);
    doc.fontSize(10).text(`${data["Unit Cost"]}`, 305, Y);
    doc.fontSize(10).text(`${data.Total}`, 370, Y);

    Y += 10;
  }

  Y += 10;
  doc.fontSize(12).text(`Total = ${total}`, 155, Y)

  doc.end();

  return true;
}

module.exports = {
  createPdf,
};
