import axios from 'axios';
import {URL_API} from './const';

export default axios.create({
    baseURL: URL_API
})