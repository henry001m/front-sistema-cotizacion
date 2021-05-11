
import API from '../Service';

export async function getArchivos() {
    try {
        const response = await API.get('/requestQuotitation/files/{id}');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}