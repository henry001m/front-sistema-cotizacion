import API from '../Service';

export async function getRols() {
    try {
        const response = await API.get('/rols');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function createRol(newRol){
    try {
        const response = await API.post('rols/new',newRol);
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