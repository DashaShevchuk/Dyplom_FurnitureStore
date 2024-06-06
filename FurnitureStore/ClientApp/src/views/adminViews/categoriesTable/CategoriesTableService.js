import axios from "axios";
import {serverUrl} from '../../../config';

export default class CategoriesTableService {
    static getCategories(model) {
        return axios.post(`${serverUrl}api/admin/get/categories/`, model)
    };
    static deleteCategory(model) {
        return axios.delete(`${serverUrl}api/admin/delete/category/${model.categoryId}`)
    };
    static editCategory(model) {
        return axios.post(`${serverUrl}api/admin/edit/category/${model.categoryId}`, model)
    };
    static addCategory(model) {
        return axios.post(`${serverUrl}api/admin/add/category`, model)
    };
}