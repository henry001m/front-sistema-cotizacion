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
/**Devuelve los usuarios de una unidad*/
export async function getPersonal(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`users/unit/administrative/${idUnit}`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**usuarios que tienen el rol de jefe administrativos y no estan asignados*/
export async function getAdmins() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`usersAdmi/WithoutDrives`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


