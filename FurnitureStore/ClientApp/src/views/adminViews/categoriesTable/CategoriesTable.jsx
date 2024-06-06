import React, { Component } from "react";
import * as getListActions from "./reducer";
import * as deleteListActions from "./reducer";
import * as editCategoryListActions from "./reducer";
import * as addCategoryListActions from "./reducer";

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
import Loader from "../../../components/loaders/adminLoader";
import DeleteDialog from "../../../components/adminComponents/dialogs/categories/deleteDialog";
import EditDialog from "../../../components/adminComponents/dialogs/categories/editDialog";
import AddDialog from "../../../components/adminComponents/dialogs/categories/addDialog";
import "../../../accests/css/adminPagesStyle.css";
const { Search } = Input;

class CategoriesTable extends Component {
  state = {
    isLoading: false,

    deleteOpenDialog: false,
    editOpenDialog: false,
    addOpenDialog:false,

    selectedCategoryId:0,

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
      Current: this.state.pagination.current,
      PageSize: this.state.pagination.pageSize,
    };
    this.setState({ isLoading: true });
    this.props.getCategories(model);
  };
deleteDialogClickOpen = (e) => {
    this.setState({
      selectedCategoryId: e.key,
      deleteOpenDialog: true,
    });
  };

  deleteDialogCloseClick = () => {
    this.setState({ deleteOpenDialog: false });
  };

  editDialogClickOpen = (record, e) => {
    this.setState({ selectedCategoryId: record.key, editOpenDialog: true });
  };

  editDialogCloseClick = () => {
    this.setState({ editOpenDialog: false });
  };

  addDialogClickOpen = () => {
    this.setState({ addOpenDialog: true });
  };

  addDialogCloseClick = () => {
    this.setState({ addOpenDialog: false });
  };

  deleteDialog = () => {
    const { data } = this.props;
    const { selectedCategoryId, deleteOpenDialog } = this.state;
    const category = data && data.Categories.find(
      (category) => category.Id === selectedCategoryId
    );
    return (
      <DeleteDialog
        isOpen={deleteOpenDialog}
        onClose={this.deleteDialogCloseClick}
        category={category}
        onOk={this.deleteButtonClicked}
      />
    );
  };
editDialog = () => {
    const { data } = this.props;
    const { editOpenDialog, selectedCategoryId } =
      this.state;
      const category = data && data.Categories.find(
        (category) => category.Id === selectedCategoryId
      );
    return (
      <EditDialog
        isOpen={editOpenDialog}
        onClose={this.editDialogCloseClick}
        category={category}
        onFinish={this.editButtonClicked}
      />
    );
  };
  addDialog = () => {
    const { addOpenDialog } = this.state;
    
    return (
      <AddDialog
        isOpen={addOpenDialog}
        onClose={this.addDialogCloseClick}
        onFinish={this.addButtonClicked}
      />
    );
  };
  deleteButtonClicked = () => {
    this.setState({ isLoading: true });
    this.props.deleteCategory({ categoryId: this.state.selectedCategoryId });
    message.success("Категорію видалено успішно");
    this.setState({ deleteOpenDialog: false }, () => {
      const model = {
        Page: this.state.pagination.current,
        PageSize: this.state.pagination.pageSize,
        SortOrder: this.state.order,
        ColumnKey: this.state.columnKey,
        SearchString: this.state.searchString
      };
      this.props.getCategories(model);
    });
  };

  editButtonClicked = (category) => {
    this.setState({ isLoading: true });
    const formData = new FormData();
    formData.append("id", this.state.selectedCategoryId);
    formData.append("name", category.Name);

    this.props.editCategory(formData);
    message.success("Категорію відредаговано успішно");
    this.setState({ editOpenDialog: false }, () => {
      const model = {
        Page: this.state.pagination.current,
        PageSize: this.state.pagination.pageSize,
        SortOrder: this.state.order,
        ColumnKey: this.state.columnKey,
        SearchString: this.state.searchString
      };
      this.props.getCategories(model);
    });
  };

  addButtonClicked=(newCategoryName)=>{    
    this.setState({ isLoading: true });
    const formData = new FormData();
    formData.append("name", newCategoryName);
    this.props.addCategory(formData);

    message.success("Категорію додано успішно");
    this.setState({ addOpenDialog: false }, () => {
      const model = {
        Page: this.state.pagination.current,
        PageSize: this.state.pagination.pageSize,
        SortOrder: this.state.order,
        ColumnKey: this.state.columnKey,
        SearchString: this.state.searchString
      };
      this.props.getCategories(model);
    });
  }

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
        showSorterTooltip:false
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

    const listCategories =
      data &&
      data.Categories.map((element, index) => {
        return {
          num: index + 1,
          key: element.Id,
          name: element.Name,
        };
      });

      return (
        <div>
           {isLoading && !data ? (
            <Loader />
          ) : (
            <div className="project-table-main p-2">
              <div className="table-header-div">
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
              <Button
                    type="primary"
                    style={{ background: "#293b38" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.addDialogClickOpen();
                    }}
                  >
                    Додати
                  </Button>
                  </div>
              <Table
                dataSource={listCategories}
                columns={columns}
                total={data && data.TotalCount}
                onChange={this.handleTableChange}
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
                    this.props.getCategories(model);
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
                    this.props.getCategories(model);
                  },
                }}
              />
            </div>
          )}
           {this.deleteDialog()}
           {this.editDialog()}
           {this.addDialog()}
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "categoriesTable.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (filter) => {
      dispatch(getListActions.getCategories(filter));
    },
    deleteCategory: (filter) => {
      dispatch(deleteListActions.deleteCategory(filter));
    },
    editCategory: (filter) => {
      dispatch(editCategoryListActions.editCategory(filter));
    },
    addCategory: (filter) => {
      dispatch(addCategoryListActions.addCategory(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTable);
