import API from '../Service';

export async function searchCode(code) {
    try {
        const res = await API.post('/searchCode', code);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}