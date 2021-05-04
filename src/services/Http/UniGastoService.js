import API from '../Service';

export async function getUnidadesGastos() {
    try {
        const response = await API.get('/spendingUnits');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUnidadGasto(newUndidadGasto) {
    try {
        const res = await API.post('/spendingUnits/new', newUndidadGasto);
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