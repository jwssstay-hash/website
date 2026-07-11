const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'Images');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const mappings = {};
let counter = 1;

walkDir(imagesDir, (filePath) => {
  if (filePath.endsWith('.jpeg') || filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
    const ext = path.extname(filePath);
    const dir = path.dirname(filePath);
    const folderName = path.basename(dir).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const newName = `${folderName}-${counter}${ext}`;
    const newPath = path.join(dir, newName);
    
    fs.renameSync(filePath, newPath);
    
    // Store mapping from old absolute path to new relative public URL
    const oldUrl = '/' + path.relative(path.join(__dirname, 'public'), filePath).replace(/\\/g, '/');
    const newUrl = '/' + path.relative(path.join(__dirname, 'public'), newPath).replace(/\\/g, '/');
    
    mappings[oldUrl] = newUrl;
    counter++;
  }
});

fs.writeFileSync(path.join(__dirname, 'image-mappings.json'), JSON.stringify(mappings, null, 2));
console.log('Successfully renamed images and saved mappings.');
