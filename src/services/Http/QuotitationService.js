
import API from '../Service';
export async function getQuotitation() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/quotitations',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createQuotitation(quotitation) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/quotitation', quotitation,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function sendEmail(desciptionEmail,id) {
    try {
        const res = await API.post(`/sendEmail/${id}`, desciptionEmail);
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