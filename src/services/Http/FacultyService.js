
import API from '../Service';

export async function getFaculties() {
    try {
        const response = await API.get('/faculties');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}