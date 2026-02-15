async function fetchData(url) {
    let result = {
        data: null,
        isLoading: true,
        error: null
    };

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const jsonData = await response.json();

        result.data = jsonData;
        result.isLoading = false;
    } catch (err) {
        result.error = err.message;
        result.isLoading = false;
    }

    return result;
}

module.exports = { fetchData };