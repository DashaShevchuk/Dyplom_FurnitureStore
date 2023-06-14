import React, { Component } from "react";
import * as getListActions from "./reducer";
import * as getCategoriesListActions from "./reducer";
import * as getDeleteListActions from "./reducer";
import * as getEditProjectListActions from "./reducer";
import {
  Table,
  Space,
  Input,
  Button,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import get from "lodash.get";
import Loader from "../../../components/loader/loader";
import ShowMoreDialog from "../../../components/adminComponents/dialogs/showMoreDialog";
import DeleteDialog from "../../../components/adminComponents/dialogs/deleteDialog";
import EditDialog from "../../../components/adminComponents/dialogs/editDialog";
import "../../../accests/css/adminPagesStyle.css";
const { Search } = Input;

class ProjectsTable extends Component {
  state = {
    isLoading: false,
    showMoreOpenDialog: false,
    deleteOpenDialog: false,
    editOpenDialog: false,

    sortOrder: null,
    columnKey: null,
    searchString: null,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };

  componentDidMount = () => {
    const model = {
      CategoryName:"",
      Current: this.state.pagination.current,
      PageSize: this.state.pagination.pageSize,
    };
    this.setState({ isLoading: true });
    this.props.getProjects(model);
    this.props.getCategories();
  };

  showMoreDialogClickOpen = (record) => {
    this.setState({
      selectedProjectId: record.key,
      showMoreOpenDialog: true,
    });
  };

  showMoreDialogCloseClick = () => {
    this.setState({ showMoreOpenDialog: false });
  };

deleteDialogClickOpen = (e) => {
    this.setState({
      selectedProjectId: e.key,
      deleteOpenDialog: true,
    });
  };

  deleteDialogCloseClick = () => {
    this.setState({ deleteOpenDialog: false });
  };

  editDialogClickOpen = (record, e) => {
    this.setState({ selectedProjectId: record.key, editOpenDialog: true });
  };

  editDialogCloseClick = () => {
    this.setState({ editOpenDialog: false });
  };

  showMoreDialog = () => {
    const { data } = this.props;
    const { showMoreOpenDialog, selectedProjectId } = this.state;
    const project = data && data.Projects.find(
      (project) => project.Id === selectedProjectId
    );

    return (
      <ShowMoreDialog
        isOpen={showMoreOpenDialog}
        onClose={this.showMoreDialogCloseClick}
        project={project}
      />
    );
  };

  deleteDialog = () => {
    const { data } = this.props;
    const { selectedProjectId, deleteOpenDialog } = this.state;
    const project = data && data.Projects.find(
      (project) => project.Id === selectedProjectId
    );
    return (
      <DeleteDialog
        isOpen={deleteOpenDialog}
        onClose={this.deleteDialogCloseClick}
        project={project}
        onOk={this.deleteButtonClicked}
      />
    );
  };

  editDialog = () => {
    const { data, categories } = this.props;
    const { editOpenDialog, selectedProjectId } =
      this.state;
      const project = data && data.Projects.find(
        (project) => project.Id === selectedProjectId
      );
      console.log(this.props)
    return (
      <EditDialog
        isOpen={editOpenDialog}
        onClose={this.editDialogCloseClick}
        project={project}
        categories={categories}
        onFinish={this.editButtonClicked}
      />
    );
  };

 deleteButtonClicked = () => {
    this.setState({ isLoading: true });
    this.props.deleteProject({ projectId: this.state.selectedProjectId });
    message.success("Проект видалено успішно");
    this.setState({ deleteOpenDialog: false }, () => {
      const model = {
        CategoryName:"",
        Page: this.state.pagination.current,
        PageSize: this.state.pagination.pageSize,
        SortOrder: this.state.order,
        ColumnKey: this.state.columnKey,
        SearchString: this.state.searchString
      };
      this.props.getProjects(model);
    });
  };

  editButtonClicked = (project, changedImages) => {
    this.setState({ isLoading: true });
    console.log("project", project);
    const formData = new FormData();
    formData.append("id", this.state.selectedProjectId);
    formData.append("name", project.Name);
    formData.append("categoryId", project.CategoryId);
    formData.append("facade", project.Facade);
    formData.append("tabletop", project.Tabletop);
    formData.append("materials", project.Materials);
    formData.append("furniture", project.Furniture);
    formData.append("features", project.Features);
    for (let i = 0; i < changedImages.length; i++) {
      formData.append("images", changedImages[i].originFileObj);
    }

    this.props.editProject(formData);
    message.success("Проект відредаговано успішно");
    this.setState({ editOpenDialog: false }, () => {
      const model = {
        CategoryName:"",
        Page: this.state.pagination.current,
        PageSize: this.state.pagination.pageSize,
        SortOrder: this.state.order,
        ColumnKey: this.state.columnKey,
        SearchString: this.state.searchString
      };
      this.props.getProjects(model);
    });
  };


  handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    this.setState({ pagination });

    const model = {
      CategoryName:"",
      Page: current,
      PageSize: pageSize,
      SortOrder: sorter.order,
      ColumnKey: sorter.columnKey,
      SearchString: this.state.searchString,
    };
    this.props.getProjects(model);
  };

  search = (event) => {
    this.setState({
      searchString: event.target.value,
    });
    const model = {
      CategoryName:"",
      Page: this.state.pagination.current,
      PageSize: this.state.pagination.pageSize,
      SortOrder: this.state.order,
      ColumnKey: this.state.columnKey,
      SearchString: event.target.value,
    };
    this.props.getProjects(model);
  };

  render() {
    const { data } = this.props;
    const { isLoading } = this.state; 

    const columns = [
      {
        title: "№",
        dataIndex: "num",
        key: "num",
      },
      {
        title: "Назва",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "Категорія",
        dataIndex: "category",
        key: "category",
        sorter: true,
      },
      {
        title: "Фасад",
        dataIndex: "facade",
        key: "facade",
        sorter: true,
      },
      {
        title: "Стільниця",
        dataIndex: "tabletop",
        key: "tabletop",
        sorter: true,
      },
      {
        title: "Дія",
        key: "actions",
        render: (record) => (
          <Space size="middle">
            <EditOutlined
              onClick={(e) => {
                e.stopPropagation();
                this.editDialogClickOpen(record);
              }}
            />
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                this.deleteDialogClickOpen(record);
              }}
              style={{ color: "red" }}
            />
          </Space>
        ),
      },
    ];

    const listProjects =
      data &&
      data.Projects.map((element, index) => {
        return {
          num: index + 1,
          key: element.Id,
          name: element.Name,
          category: element.CategoryName,
          facade: element.Facade,
          tabletop: element.Tabletop,
        };
      });

      return (
        <div>
           {isLoading && !data ? (
            <Loader />
          ) : (
            <div className="project-table-main p-2">
              <Search
                placeholder="Введіть текст"
                onChange={this.search}
                style={{ marginBottom: 3 }}
                enterButton={
                  <Button
                    type="primary"
                    style={{ background: "#293b38" }}
                    icon={<SearchOutlined />}
                  ></Button>
                }
              />
              <Table
                dataSource={listProjects}
                columns={columns}
                total={data && data.TotalCount}
                onChange={this.handleTableChange}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      this.showMoreDialogClickOpen(record, record.key);
                    },
                  };
                }}
                pagination={{
                  current: this.state.currentPage,
                  pageSize: this.state.pageSize,
                  total: data && data.TotalCount,
                  onChange: (page, size) => {
                    this.setState({
                      currentPage: page,
                      pageSize: size,
                    });
      
                    const model = {
                      Page: page,
                      PageSize: size,
                    };
                    this.props.getProjects(model);
                  },
                  onShowSizeChange: (page, size) => {
                    this.setState({
                      currentPage: page,
                      pageSize: size,
                    });
      
                    const model = {
                      Page: page,
                      PageSize: size,
                    };
                    this.props.getProjects(model);
                  },
                }}
              />
            </div>
          )}
          {this.deleteDialog()}
          {this.editDialog()}
           {this.showMoreDialog()}
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "projectsTable.list.data"),
    categories: get(state, "projectsTable.list.categories"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (filter) => {
      dispatch(getListActions.getProjects(filter));
    },
    getCategories: () => {
      dispatch(getCategoriesListActions.getCategories());
    },
    deleteProject: (filter) => {
      dispatch(getDeleteListActions.deleteProject(filter));
    },
    editProject: (filter) => {
      dispatch(getEditProjectListActions.editProject(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
