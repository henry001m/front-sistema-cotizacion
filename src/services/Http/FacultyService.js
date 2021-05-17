
import API from '../Service';

/**devuelve las facultades */
export async function getFaculties() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/faculties',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFacultyAdmin() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/faculties/use',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}