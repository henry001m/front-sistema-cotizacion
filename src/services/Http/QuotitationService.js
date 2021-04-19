
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
        const res = await API.post('/quotitation', quotitation);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function sendEmail(desciptionEmail) {
    try {
        const res = await API.post('/sendEmail', desciptionEmail);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getRequest(id) {
    try {
        const response = await API.get(`/quotitation/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateStatus(id,status) {
    try {
        const res = await API.put(`/quotitation/status/${id}`,status);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}