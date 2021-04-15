import API from '../Service';

export async function postRegister() {
    try {
        const response = await API.get('/register',);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}