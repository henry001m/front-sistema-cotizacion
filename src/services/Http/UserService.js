import API from '../Service';

export async function getUsers() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/users',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUser(user,idrol) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const token = await API.post(`/register/${idrol}`, user,headers);
        return token;
    } catch (error) {
        console.log(error);
    }
}
