
const register = async ({ username, email, password } = {}) => {
    const user = { username, email, password };
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));
        // if (!res.ok) {
        //     throw new Error(`HTTP error! status: ${res.status} ${res.error} `);
        // }
        return await res;
    } catch (error) {
        throw new Error(`Cannot register at this time. ${error}`);
    }
};

const login = async ({ email, password } = {}) => {
    const user = { email, password };
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));

        return await res;
    } catch (error) {
        throw new Error('Cannot login at this time. ${error}');
    }
};
const logout = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`,{
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));
        return await res;
    } catch (error) {
        throw new Error('Cannot logout at this time. ${error}');
    }
}
const getUser = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
            method: 'GET',
            credentials: 'include'
        });
        return await res.json();
    } catch (error) {
        throw new Error('Please login to continue. ${error}');
    }
}

module.exports = { register, login, logout, getUser };