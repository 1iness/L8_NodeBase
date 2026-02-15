const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');


const environment = process.env.NODE_ENV || 'development';

const envFileMap = {
    'development': '.env.development',
    'production': '.env.production',
    'domain': '.env.domain'
};

const envFileName = envFileMap[environment];

dotenv.config({ path: path.join(__dirname, `../${envFileName}`) });

console.log(`запуск в режиме: ${process.env.MODE.toUpperCase()}`);
console.log(`(загружен файл: ${envFileName})\n`);



const passwords = [
    "password123", "admin123", "qwerty123", "secret", "123456", 
    "bibibi", "pypypypy", "belbet", "mumi123", "email",
    "login", "master", "test"
];

const saltRounds = 12; 

async function hashPasswords() {
    console.log(`шифрование ${passwords.length} паролей одновременно`);
    console.log(`Сложность: ${saltRounds}\n`);

    const startTimeTotal = performance.now();

    const promises = passwords.map(async (pwd, index) => {
        const label = `Пароль #${index + 1} (${pwd})`;
        const start = performance.now();
        
        const hash = await bcrypt.hash(pwd, saltRounds);
        
        const end = performance.now();
        console.log(`${label} готов за: ${(end - start).toFixed(2)} мс`);
        return hash;
    });

    await Promise.all(promises);

    const endTimeTotal = performance.now();
    console.log(`Итог`);
    console.log(`Общее время выполнения: ${(endTimeTotal - startTimeTotal).toFixed(2)} мс`);
    
   
}

hashPasswords();