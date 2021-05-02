import API from '../Service';

export async function getRols() {
    try {
        const response = await API.get('/rols');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}