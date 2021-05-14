import API from '../Service';
import axios from 'axios';

export async function getFiles(id) {

    try {
        const response = await API.get('/files/'+id);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getFile(id,name) {

    try {
        const response = await API.get('/showFile/'+id+'/'+name);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}


export async function getDowloadFile(id,name) {
    const URL = 'http://127.0.0.1:8000/api/dowloadFile/'+id+'/'+name;
    try {
        const res = await  axios({
        url: URL,
        method:'GET',
        responseType:'blob'
    });
    return res;
    } catch (error) {
        console.log(error)
    }
}
