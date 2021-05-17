import API from '../Service';

export async function getPermissions() {
    try {
        const response = await API.get('/permissions');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}