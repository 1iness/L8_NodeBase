const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const SYSTEM_FILES = ['node_modules', '.git', '.env', 'package.json', 'package-lock.json', '.gitignore', 'index.js'];

const syncMethods = {
    writeFile: (filePath, data) => fs.writeFileSync(filePath, data, 'utf-8'),
    readFile: (filePath) => fs.readFileSync(filePath, 'utf-8'),
    clearFile: (filePath) => fs.writeFileSync(filePath, '', 'utf-8'),
    
    cleanNoise: (filePath) => {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(/\d/g, '').toLowerCase();
        fs.writeFileSync(filePath, content, 'utf-8');
    },

    copyFile: (src, dest) => fs.copyFileSync(src, dest),

    createDir: (dirPath) => {
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    },
    
    deleteDir: (dirPath) => fs.rmSync(dirPath, { recursive: true, force: true }),

    listAllFiles: (dir, allFiles = []) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            if (SYSTEM_FILES.includes(file)) return;
            const name = path.join(dir, file);
            if (fs.statSync(name).isDirectory()) {
                syncMethods.listAllFiles(name, allFiles);
            } else {
                allFiles.push(name);
            }
        });
        return allFiles;
    },

    clearProject: (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            if (SYSTEM_FILES.includes(file)) return;
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                fs.rmSync(fullPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(fullPath);
            }
        });
    }
};

const asyncMethods = {
    writeFile: async (filePath, data) => await fsPromises.writeFile(filePath, data, 'utf-8'),
    readFile: async (filePath) => await fsPromises.readFile(filePath, 'utf-8'),
    clearFile: async (filePath) => await fsPromises.writeFile(filePath, '', 'utf-8'),
    
    cleanNoise: async (filePath) => {
        let content = await fsPromises.readFile(filePath, 'utf-8');
        content = content.replace(/\d/g, '').toLowerCase();
        await fsPromises.writeFile(filePath, content, 'utf-8');
    },
    
    copyFile: async (src, dest) => await fsPromises.copyFile(src, dest),
    createDir: async (dirPath) => {
        if (!fs.existsSync(dirPath)) await fsPromises.mkdir(dirPath);
    },
    
    deleteDir: async (dirPath) => await fsPromises.rm(dirPath, { recursive: true, force: true }),

    listAllFiles: async (dir) => {
        let results = [];
        const list = await fsPromises.readdir(dir, { withFileTypes: true });
        for (const item of list) {
            if (SYSTEM_FILES.includes(item.name)) continue;
            const res = path.resolve(dir, item.name);
            if (item.isDirectory()) {
                results = results.concat(await asyncMethods.listAllFiles(res));
            } else {
                results.push(res);
            }
        }
        return results;
    }
};

async function runDemo() {
    const testFile = 'test.txt';

    console.log("Тест Sync");
    syncMethods.writeFile(testFile, "опа опа 123");
    console.log("Записано:", syncMethods.readFile(testFile));
    syncMethods.cleanNoise(testFile);
    console.log("Без шума:", syncMethods.readFile(testFile));
    
    console.log("Тест Async");
    await asyncMethods.writeFile('async_test.json', JSON.stringify({id: 1, name: "Admin"}));
    const data = await asyncMethods.readFile('async_test.json');
    console.log("Прочитан JSON:", data);

    console.log("Все файлы проекта кроме системных");
    console.log(syncMethods.listAllFiles('./'));
}

runDemo();