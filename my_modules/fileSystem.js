const fs = require('fs');
const path = require('path');

const resolvePath = (targetPath) => path.resolve(process.cwd(), targetPath);

const createDir = (dirPath) => {
    const absolutePath = resolvePath(dirPath);
    if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath, { recursive: true });
        console.log(`Папка создана: ${dirPath}`);
    }
};

const writeFile = (filePath, data) => {
    const absolutePath = resolvePath(filePath);
    fs.writeFileSync(absolutePath, data, 'utf-8');
    console.log(`Файл записан: ${filePath}`);
};

module.exports = {
    createDir,
    writeFile
};