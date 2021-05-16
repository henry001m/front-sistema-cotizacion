
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
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post(`/sendEmail/${id}`, desciptionEmail,headers);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getRequest(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quotitation/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateStatus(id,status) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`/quotitation/status/${id}`,status,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}