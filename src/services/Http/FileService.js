import API from '../Service';

/**devuelve los nombres de los archivos */
export async function getFileNames(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`files/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}