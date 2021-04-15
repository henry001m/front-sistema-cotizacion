import API from '../Service';

export async function getUsers() {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUser(user) {
    try {
        const token = await API.post('/register', user);
        return token;
    } catch (error) {
        console.log(error);
    }
}