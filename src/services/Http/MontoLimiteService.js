import API from '../Service';

export async function getMontoLomite() {
    try {
        const response = await API.get('/limiteAmout');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function createMontoLimite(montoLimite) {
    try {
        const res = await API.post('/limiteAmount/new', montoLimite);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
