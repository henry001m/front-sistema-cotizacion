import API from '../Service';

export async function getUsers() {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUser(user,idrol) {
    try {
        const token = await API.post(`/register/${idrol}`, user);
        return token;
    } catch (error) {
        console.log(error);
    }
}
