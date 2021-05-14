import API from '../Service';

export async function getMontoLomite() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/limiteAmout',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function createMontoLimite(montoLimite) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/limiteAmount/new', montoLimite, headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
