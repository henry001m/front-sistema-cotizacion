import API from '../Service';

export async function getUnidadesAdministrativas() {
    try {
        const response = await API.get('/administrativeUnit');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUnidadAdministrativa(quotitation) {
    try {
        const res = await API.post('/administrativeUnit/new', quotitation);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export async function getUnidadAdministrativa(id) {
    try {
        const response = await API.get(`/quotitation/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateUnidadAdministrativa(id,status) {
    try {
        const res = await API.put(`/quotitation/status/${id}`,status);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}