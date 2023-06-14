import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddProjectService {
    static addProject(model) {
        return axios.post(`${serverUrl}api/admin/add/project`, model)
    };
    static getCategories() {
        return axios.get(`${serverUrl}api/admin/get/categories`)
    };
}