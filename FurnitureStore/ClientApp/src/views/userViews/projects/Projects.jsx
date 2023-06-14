import React, { Component } from "react";
import * as getListActions from "./reducer";
import get from "lodash.get";
import { connect } from "react-redux";
import "../../../accests/css/userProjectsStyle.css";
import CategoriesSideBar from "../../../components/userComponents/categoriesSidebar";
import ProjectCard from "../../../components/userComponents/projectCard";

class Projects extends Component {
  state = {
    isLoading: false,
    visible: true,
  };

  onVisibleChange = () => {
    this.setState({ visible: !this.state.visible });
  };

  componentDidMount() {
    const { match } = this.props;
    const { categoryName } = match.params;
    this.props.getProjects({ categoryName: categoryName });
  }

  render() {
    const { match } = this.props;
    const { categoryName } = match.params;
    const { data } = this.props;
    console.log("projects", this.props.data);
    const cards =
      data &&
      data.map((element) => (
        //console.log(element)
        <ProjectCard 
        project={element}
        key={element.Id}
        category={categoryName}
        />
      ));
    return (
      <div className="projects-main">
        <CategoriesSideBar />
        <div className="content">{cards}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "projects.list.data"),
    loading: get(state, "projects.list.loading"),
    failed: get(state, "projects.list.failed"),
    success: get(state, "projects.list.success"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (filter) => {
      dispatch(getListActions.getProjects(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
