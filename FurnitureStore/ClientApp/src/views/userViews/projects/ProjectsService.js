import axios from "axios";
import {serverUrl} from '../../../config';

export default class ProjectsService {
    static getProjects(model) {
        return axios.post(`${serverUrl}api/user/get/projects/${model.categoryName}`, model)
    };
}