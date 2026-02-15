const { fetchData } = require('./my_modules/fetcher');
const { sortStringsIgnoreSpaces } = require('./my_modules/sorter');
const { createDir, writeFile } = require('./my_modules/fileSystem'); 

const API_URL = 'https://jsonplaceholder.typicode.com/users';

async function main() {
    console.log("Загрузка пользователей");
    const state = await fetchData(API_URL);
    if (state.isLoading) {
        console.log("Загрузка"); 
    }
    if (state.error) {
        console.error("Ошибка:", state.error);
        return;
    }

    const users = state.data;
    console.log(`Получено ${users.length} пользователей.`);

    const names = users.map(user => user.name);
    const emails = users.map(user => user.email);
    const sortedNames = sortStringsIgnoreSpaces(names);

    const folderName = 'users';
    try {
        createDir(folderName);
        const namesContent = sortedNames.join('\n');
        const emailsContent = emails.join('\n');

        writeFile(`${folderName}/names.txt`, namesContent);
        writeFile(`${folderName}/emails.txt`, emailsContent);

        console.log("Успех! в папку 'users'.");

    } catch (error) {
        console.error("Ошибка при работе с файлами:", error);
    }
}
main();