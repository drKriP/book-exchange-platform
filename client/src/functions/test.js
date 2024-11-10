const getTest = async () => { 
    try {
        const resp = await fetch('http://localhost:8085/test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return await resp.json();
    } catch (error) {}
}

module.exports = getTest;