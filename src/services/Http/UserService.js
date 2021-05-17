import API from '../Service';

/**Lista de Usuarios
 * Obtiene los datos de todos los usario */
export async function getUsers() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/users',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/*Crear nuevo usuario
se envia los datos en un json y en la url el id del rol del usuario */
export async function createUser(user,idrol) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const token = await API.post(`/register/${idrol}`, user,headers);
        return token;
    } catch (error) {
        console.log(error);
    }
}
