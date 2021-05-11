import API from '../Service';

export async function getUnidadesGastos() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/spendingUnits',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUnidadGasto(newUndidadGasto) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/spendingUnits/new', newUndidadGasto,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export async function getUnidadGasto(id) {
    try {
        const response = await API.get(`/quotitation/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateUnidadGasto(id,status) {
    try {
        const res = await API.put(`/quotitation/status/${id}`,status);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}