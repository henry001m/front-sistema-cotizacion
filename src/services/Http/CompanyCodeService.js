import API from '../Service';

export async function searchCode(code) {
    try {
        const res = await API.post('/searchCode', code);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function detailsQuotitation(id) {
    try {
        const res = await API.get('/quotitation/details/'+id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacion(data) {
    try {
        const res = await API.post('/quoteResponse',data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
