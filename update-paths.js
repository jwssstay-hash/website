const fs = require('fs');
const path = require('path');

const mappings = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-mappings.json'), 'utf-8'));
const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');

const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(sectionsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [oldPath, newPath] of Object.entries(mappings)) {
    // Escape special characters for regex, just in case
    const safeOldPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeOldPath, 'g');
    
    if (content.match(regex)) {
      content = content.replace(regex, newPath);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
console.log('Finished updating image paths.');
