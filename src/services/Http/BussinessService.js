
import API from '../Service';
export async function getEmpresas() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/business',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createBusiness(business) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('business/new', business,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}