
import API from '../Service';

export async function getQuotitation() {
    try {
        const response = await API.get('/quotitations');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createQuotitation(quotitation) {
    try {
        await API.post('/quotitation', quotitation);
        return quotitation;
    } catch (error) {
        console.log(error);
    }
}


