const fs = require('fs');
const path = require('path');

async function extract() {
  const pdfParse = (await import('pdf-parse')).default;
  const pdfPath = path.join(__dirname, '..', 'PROFILE AFRAZ APPAREL 2025.pdf');
  const dataBuffer = fs.readFileSync(pdfPath);

  const options = {
    pagerender: function(pageData) {
      return pageData.getTextContent().then(function(textContent) {
        return textContent.items.map(item => item.str).join(' ');
      });
    }
  };

  const data = await pdfParse(dataBuffer, options);
  // pdf-parse with pagerender returns text per page in some versions - check structure
  console.log('Total pages:', data.numpages);
  console.log('---');
  console.log(data.text);
}

extract().catch(console.error);
