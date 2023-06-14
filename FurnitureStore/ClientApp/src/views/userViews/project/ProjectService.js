import axios from "axios";
import {serverUrl} from '../../../config';

export default class ProjectService {
    static getProject(model) {
        return axios.post(`${serverUrl}api/user/get/projects/${model.CategoryName}/${model.ProjectId}`, model)
    };
}