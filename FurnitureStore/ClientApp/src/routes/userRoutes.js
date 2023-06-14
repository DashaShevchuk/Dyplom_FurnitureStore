import HomePage from "../views/userViews/homePage/HomePage";
import Projects from "../views/userViews/projects/Projects";
import Project from "../views/userViews/project/Project";

const routes = [
  { path: "/", exact: true, name: "HomePage", component: HomePage },
  { path: "/projects/:categoryName", exact: true, name: "Projects", component: Projects },
  { path: "/projects/:categoryName/:projectId", exact: true, name: "Project", component: Project },
];

export default routes;