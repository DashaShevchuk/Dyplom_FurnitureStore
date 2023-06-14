import axios from "axios";
import {serverUrl} from '../../../config';

export default class ProjectsTableService {
    static getCategories() {
        return axios.get(`${serverUrl}api/admin/get/categories`)
    };
    static getProjects(model) {
        return axios.post(`${serverUrl}api/admin/get/projects/`, model)
    };
    static deleteProject(model) {
        return axios.delete(`${serverUrl}api/admin/delete/project/${model.projectId}`)
    };
    static editProject(model) {
        return axios.post(`${serverUrl}api/admin/edit/project/${model.projectId}`, model)
    };
}