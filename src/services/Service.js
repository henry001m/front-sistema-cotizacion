import axios from 'axios';

export default axios.create({
    baseURL: "https://sistemacotizacion.herokuapp.com/api"
})