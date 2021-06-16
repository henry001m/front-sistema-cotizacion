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
        const res = await API.post('/quotitacion/response',data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacionDetalle(data,id) {
    try {
        const res = await API.post('/quotitacion/response/'+id,data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacionDetalleFile(data,id) {
    try {
        const res = await API.post('/quotitacion/response/file/'+id,data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}