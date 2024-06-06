import {lazy} from 'react';

const AddProject = lazy(() => import('../views/adminViews/addProject/AddProject'));
const ProjectTable = lazy(()=>import('../views/adminViews/projectsTable/ProjectsTable'));
const CategoriesTable = lazy(()=>import('../views/adminViews/categoriesTable/CategoriesTable'));

const routes = [
    { path: '/admin/addproject', exact: true, name: 'AddProject', component: AddProject },
    { path: '/admin/projects', exact: true, name: 'ProjectTable', component: ProjectTable },
    { path: '/admin/categories', exact: true, name: 'ProjectTable', component: CategoriesTable },

]; 

export default routes;