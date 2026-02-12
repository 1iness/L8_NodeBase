const result = require('dotenv').config(
    { path: './about.env' }
);

console.log("--- Информация о студенте ---");
console.log(`Имя: ${process.env.STUDENT_NAME}`);
console.log(`Фамилия: ${process.env.STUDENT_SURNAME}`);
console.log(`Группа: ${process.env.GROUP_NUMBER}`);
console.log(`Номер в списке: ${process.env.LIST_NUMBER}`);