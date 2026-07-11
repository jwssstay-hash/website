const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'Images');
const galleryFile = path.join(__dirname, 'src', 'components', 'sections', 'Gallery.tsx');

let allImages = [];

function readDirRecursive(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            readDirRecursive(fullPath);
        } else if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
            // Get relative path for web
            const relPath = fullPath.replace(imagesDir, '/Images').replace(/\\/g, '/');
            allImages.push(relPath);
        }
    }
}

readDirRecursive(imagesDir);

// Shuffle array for better variety
for (let i = allImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
}

let galleryArrayStr = 'const galleryImages = [\n';
allImages.forEach((src, idx) => {
    // Make a somewhat random but deterministic masonry layout
    let colSpan = 'col-span-1';
    let rowSpan = 'row-span-1';
    
    if (idx % 7 === 0) {
        colSpan = 'col-span-1 md:col-span-2';
        rowSpan = 'row-span-2';
    } else if (idx % 5 === 0) {
        colSpan = 'col-span-1';
        rowSpan = 'row-span-2';
    } else if (idx % 9 === 0) {
        colSpan = 'col-span-1 md:col-span-2';
        rowSpan = 'row-span-1';
    }
    
    // Create a title based on folder name
    const parts = src.split('/');
    let folder = parts[parts.length - 2];
    folder = folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    galleryArrayStr += `  { src: "${src}", title: "${folder}", colSpan: "${colSpan}", rowSpan: "${rowSpan}" },\n`;
});
galleryArrayStr += '];';

let content = fs.readFileSync(galleryFile, 'utf8');
content = content.replace(/const galleryImages = \[[\s\S]*?\];/, galleryArrayStr);
fs.writeFileSync(galleryFile, content);

console.log(`Updated Gallery.tsx with ${allImages.length} images.`);
