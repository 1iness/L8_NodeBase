const os = require('os');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../about.env') }); 

function getOSInfo() {
    console.log("Информация ОС");
    console.log(`Платформа: ${os.platform()}`);
    console.log(`Архитектура: ${os.arch()}`);
    console.log(`Главная директория: ${os.homedir()}`);
    console.log(`Имя хоста: ${os.hostname()}`);
    
    const freeMemGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    console.log(`Свободная память: ${freeMemGB} GB`);

    console.log("Сетевые интерфейсы:");
    console.log(os.networkInterfaces()); 
}

function checkFreeMemory() {
    console.log("Проверка памяти");
    const freeMem = os.freemem(); 
    const fourGB = 4 * 1024 * 1024 * 1024;

    if (freeMem > fourGB) {
        console.log(`больше 4 ГБ.`);
    } else {
        console.log(`меньше 4 ГБ.`);
    }
}

function runWithAccessControl() {
    console.log("Проверка доступа");
    const currentMode = process.env.MODE;

    console.log(`Текущий режим: ${currentMode}`);

    if (currentMode === 'admin') {
        console.log("Доступ есть");
        getOSInfo(); 
    } else {
        console.log("Доступа нет, только для admin.");
    }
}

checkFreeMemory();     
runWithAccessControl(); 