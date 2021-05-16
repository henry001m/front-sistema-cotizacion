import API from '../Service';

export async function getRols() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/rols',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function createRol(newRol){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.post('roles/new',newRol,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function updateRolUser(idu,idr) {
    try {
        const res = await API.put(`users/update/${idu}/${idr}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}