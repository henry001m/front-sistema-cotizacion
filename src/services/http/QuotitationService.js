
import API from '../Service';

/**lista de todas las cotizaciones existente */
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

/**devuelve las cotizaciones de una unidad de gasto */
export async function getQuotitationSpendingUnit(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`quotitations/spending/${idUnit}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**devuelve las soliciudes de cotizaciones de una unidad Aministrativa*/
export async function getQuotitationAdministrativeUnit(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`quotitations/${idUnit}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Crea una nueva cotizacion */
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

/**envia los correos y la descripcion de con el id de la solicitud asociada */
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

/**devuelve los detalles de una solicitud enviandole su id */
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

/**devuleve el pdf de la solicitud */
export async function getPdf(id,bussunes) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/v2requestquotitationpdf`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**actualiza el estado de un solicitud "aceptado, rechazado" */
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

/**devuelve los datos del usuario que realizara una solicitud */
export async function getInform(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/getInform/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Devuelve los datos de una cotizacion mediante su id y el id de la solicitud*/
export async function getQuotitationId(idCo,idRe){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quote/${idCo}/${idRe}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Devueve una lista de cotizaciones realizadas dado el id de solicitud */
export async function getQuotitationList(idRe){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/listQuotation/${idRe}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**devuelve los datos para el cuadro comparativo */
export async function getComparativeChart(idRe){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/getComparativeChart/${idRe}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**devuelve las soliciudes de cotizaciones de una unidad Aministrativa por pagina*/
export async function getQuotitationAdministrativeUnitPage(idUnit,page,search) {
    const token=window.localStorage.getItem("tokenContizacion");
    const config = {
        params:search,
        headers:{'Authorization': `Bearer ${token}`}
    }
    try {
        const response = await API.get(`Request/page/${idUnit}?page=${page}`,config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**devuelve las soliciudes de cotizaciones de una unidad de gasto por pagina*/
export async function getQuotitationSpendingUnitPage(idUnit,page,search) {
    const token=window.localStorage.getItem("tokenContizacion");
    const config = {
        params:search,
        headers:{'Authorization': `Bearer ${token}`}
    }
    try {
        const response = await API.get(`Request/spending/page/${idUnit}?page=${page}`,config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**devuelve los codigos de cotizaciones impresas que no han sido respondidas*/
export async function getCodeNotAnswer(idRe){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/ua/quotitacion/printedQuotesValides/${idRe}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function solicitudesDeCotizacion(id){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`ua/quotitacion/all/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function verificarSolicitudDeCotizacion(id){
    try {
        const response = await API.get(`ua/quotitacion/verify/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
