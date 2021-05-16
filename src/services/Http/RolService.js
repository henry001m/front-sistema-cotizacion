import API from '../Service';

/**devuelve la lista de todos los roles*/
export async function getRols() {
    try {
        const response = await API.get('/rols');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**crear nuevo rol
 * se le envia los datos en un json
*/
export async function createRol(newRol){
    try {
        const response = await API.post('rols/new',newRol);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**modifica el rol del usuario */
export async function updateRolUser(idu,idr) {
    try {
        const res = await API.put(`users/update/${idu}/${idr}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}