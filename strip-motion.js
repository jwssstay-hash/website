const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'sections');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove framer-motion import
    content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]framer-motion['"];?\n?/g, '');
    
    // Replace <motion.div with <div (and other tags like motion.h2, motion.p, motion.section)
    content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<');
    content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</>');
    
    // Remove motion specific props
    content = content.replace(/\s+initial=\{[^}]+\}/g, '');
    content = content.replace(/\s+animate=\{[^}]+\}/g, '');
    content = content.replace(/\s+whileInView=\{[^}]+\}/g, '');
    content = content.replace(/\s+viewport=\{[^}]+\}/g, '');
    content = content.replace(/\s+transition=\{[^}]+\}/g, '');
    content = content.replace(/\s+whileHover=\{[^}]+\}/g, '');
    content = content.replace(/\s+style=\{[^}]+\}/g, '');
    
    // Remove Lenis imports and usages if any
    content = content.replace(/import\s+Lenis\s+from\s+['"]lenis['"];?\n?/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed', filePath);
}

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.tsx') && file !== 'Hero.tsx') { // skip Hero as we already fully rewrote it
        processFile(path.join(dir, file));
    }
});
