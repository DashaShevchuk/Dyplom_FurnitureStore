import axios from "axios";
import {serverUrl} from '../../../config';

export default class HomePageService {
    static getCategories() {
        return axios.get(`${serverUrl}api/user/categories`)
    };
    static getProjects(model) {
        return axios.post(`${serverUrl}api/user/projects/${model}`, model)
    };
}