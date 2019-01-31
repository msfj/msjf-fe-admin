import React, { PureComponent } from 'react';
import TreeTitle from '@/components/TreeTitle';
import { connect } from 'dva';
// import Link from 'umi/link';
// import router from 'umi/router';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Modal,
  Tree,
  Icon,
  message,
  Select,
  Dropdown,
  Menu,
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './UserSet.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';

const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const { TreeNode } = Tree;
const { confirm } = Modal;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const rows = {
  gutter: {
    md: 8,
    lg: 24,
    xl: 48,
  },
};

const cols = {
  xxl: 8,
  md: 12,
  sm: 24,
};

const treeData = [
  {
    title: '梅山保税区港委会',
    key: '0-0',
    children: [
      { title: '金融产业发展中心', key: '0-0-0' },
      { title: '投资合作局', key: '0-0-1' },
      { title: '口岸事务管理局', key: '0-0-2' },
      { title: '海洋科技文化促进局', key: '0-0-3' },
      { title: '休闲旅游产业发展中心', key: '0-0-4' },
    ],
  },
  {
    title: '梅山街道',
    key: '0-1',
    children: [],
  },
  {
    title: '金融管理科',
    key: '0-3',
    children: [],
  },
  {
    title: '市场监督管理局',
    key: '0-4',
    children: [],
  },
];

// const Data = [];

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

function showResetPwdConfirm() {
  confirm({
    title: '操作提示',
    content: '确定重置密码?',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      message.success('操作成功');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function showFreezeConfirm() {
  confirm({
    title: '操作提示',
    content: '确定冻结该员工?',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      message.success('操作成功');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function showDeleteConfirm() {
  confirm({
    title: '操作提示',
    content: '确定删除该员工?',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      message.success('操作成功');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const BranchModal = Form.create()(props => {
  const {
    visible,
    onCancel,
    form,
    dispatch,
    form: { getFieldDecorator },
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const params = {
        ...fieldsValue,
        operateType: 'ADD',
      };
      dispatch({
        type: 'account1/editBranch',
        payload: JSON.stringify(params),
      });
      message.success(`操作成功`);
      onCancel();
    });
  };

  return (
    <Modal visible={visible} title="新增部门" okText="保存" onCancel={onCancel} onOk={okHandle}>
      <Form>
        <Form.Item label="部门名称" {...formItemLayout}>
          {getFieldDecorator('branchName', {
            rules: [{ required: true, message: '请输入部门名称，至少两个字符', min: 2 }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

const StaffModal = Form.create()(props => {
  const { visible, onCancel, form, stepFormValues } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log(fieldsValue);
      message.success(`操作成功`);
      onCancel();
    });
  };

  return (
    <Modal
      visible={visible}
      title="员工管理"
      okText="保存"
      onCancel={onCancel}
      onOk={okHandle}
      width={600}
    >
      <Form>
        <Form.Item label="员工姓名" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {form.getFieldDecorator('workerName', {
            rules: [{ required: true, message: '请输入账号' }],
            initialValue: stepFormValues.workerName,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="登陆账号">
          {form.getFieldDecorator('woekerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
            initialValue: stepFormValues.woekerAccount,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="所属部门">
          {form.getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: stepFormValues.department || '',
          })(
            <Select>
              <Option value="">- 请选择 -</Option>
              <Option value="0">金融产业发展中心</Option>
              <Option value="1">投资合作局</Option>
              <Option value="2">口岸事务管理局</Option>
              <Option value="3">休闲旅游产业发展中心</Option>
              <Option value="4">梅山街道</Option>
              <Option value="5">金融管理科</Option>
              <Option value="6">市场监督管理局</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件号码">
          {form.getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
            initialValue: stepFormValues.idNum,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="手机号码">
          {form.getFieldDecorator('workerPhone', {
            rules: [{ required: true, message: '请输入手机号' }],
            initialValue: stepFormValues.workerPhone,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="邮箱">
          {form.getFieldDecorator('workerEmail', {
            rules: [{ required: true, message: '请输入邮箱' }],
            initialValue: stepFormValues.workerEmail,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

const RoleModal = Form.create()(props => {
  const {
    visible,
    onCancel,
    form,
    form: { getFieldDecorator },
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      message.info(`操作成功；入参为${JSON.stringify(fieldsValue)}`);
      onCancel();
    });
  };
  return (
    <Modal
      visible={visible}
      title="新增员工"
      okText="保存"
      onCancel={onCancel}
      onOk={okHandle}
      width={600}
    >
      <Form>
        <Form.Item label="员工姓名" {...formItemLayout}>
          {getFieldDecorator('workerName', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="员工账号" {...formItemLayout}>
          {getFieldDecorator('workerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="所属部门" {...formItemLayout}>
          {getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入部门' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="证件号码" {...formItemLayout}>
          {getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="手机号码" {...formItemLayout}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="邮箱地址" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

@connect(({ account1, loading }) => ({
  account1,
  loading: loading.models.account1,
}))
@Form.create()
class UserSet extends PureComponent {
  state = {
    visible: {
      branch: false,
      staff: false,
      role: false,
    },
    Loading: false,
    selectedRows: [],
    formValues: {},
    expandForm: false,
    stepFormValues: {},
    updateModalVisible: false,
  };

  columns = [
    {
      title: '员工姓名',
      dataIndex: 'workerName',
      sorter: true,
      fixed: 'left',
      // key: 'name',
      // render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: '登陆账号',
      dataIndex: 'woekerAccount',
      sorter: true,
      // fixed: 'left',
      // key: 'age',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      sorter: true,
      // key: 'address',
    },
    {
      title: '证件号码',
      // key: 'tags',
      dataIndex: 'idNum',
      sorter: true,
    },
    {
      title: '手机号码',
      // key: 'tags',
      dataIndex: 'workerPhone',
      sorter: true,
    },
    {
      title: '邮箱地址',
      // key: 'tags',
      dataIndex: 'workerEmail',
      sorter: true,
    },
    {
      title: '操作',
      render: record => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.updateStaffModal(record);
                    this.toggleModal('staff');
                  }}
                >
                  编辑
                </a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={showResetPwdConfirm}>重置密码</a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={showFreezeConfirm}>冻结</a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={showDeleteConfirm}>删除</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link">
            更多 <Icon type="down" />
          </a>
        </Dropdown>
      ),
      fixed: 'right',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/getStaff',
    });
  }

  renderOperateBtn = key => (
    <span>
      {key !== '-1' && (
        <Icon onClick={() => this.toggleModal('branch')} className={styles.icon} type="plus" />
      )}
      <Icon onClick={() => this.toggleModal('branch')} className={styles.icon} type="form" />
      <Icon className={styles.icon} type="delete" />
    </span>
  );

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={<TreeTitle title={item.title} operateBtn={this.renderOperateBtn(item.key)} />}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...item}
          title={<TreeTitle title={item.title} operateBtn={this.renderOperateBtn(item.key)} />}
        />
      );
    });

  handleChange = () => {
    // this.setState({ sel: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  toggleModal = key => {
    const { visible } = this.state;
    this.setState({
      visible: {
        ...visible,
        [key]: !visible[key],
      },
    });
  };

  haddleResetPwd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/resetpwdClient',
      payload: {},
    });
  };

  onChange = () => {};

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'account1/getStaff',
      payload: params,
    });
  };

  handleSelectRows = rows1 => {
    this.setState({
      selectedRows: rows1,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  updateStaffModal = record => {
    this.setState({
      stepFormValues: record || {},
    });
  };

  handleDone = () => {
    this.setState({
      updateModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      updateModalVisible: false,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row {...rows}>
          <Col {...cols}>
            <FormItem label="员工姓名">
              {getFieldDecorator('userNmae')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="登陆账号">
              {getFieldDecorator('actId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  this.toggleModal('staff');
                  this.handleFormReset();
                }}
              >
                新增
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row {...rows}>
          <Col {...cols}>
            <FormItem label="员工姓名">{getFieldDecorator('userNmae')(<Input />)}</FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="登陆账号">{getFieldDecorator('actId')(<Input />)}</FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="证件号码">
              {getFieldDecorator('id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="邮箱地址">
              {getFieldDecorator('email')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="手机号码">
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={() => {
                this.toggleModal('staff');
                this.handleFormReset();
              }}
            >
              新增
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      Loading,
      visible: { branch, staff, role },
      selectedRows,
      updateModalVisible,
      stepFormValues,
    } = this.state;

    const {
      account1: { staffData },
      loading,
      form,
    } = this.props;

    const getModalContent = () => (
      <Form>
        <Form.Item label="员工姓名" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {form.getFieldDecorator('workerName', {
            rules: [{ required: true }],
            initialValue: stepFormValues.workerName,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="登陆账号">
          {form.getFieldDecorator('woekerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
            initialValue: stepFormValues.woekerAccount,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="所属部门">
          {form.getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: stepFormValues.department,
          })(
            <Select>
              <Option value="">请选择</Option>
              <Option value="0">金融产业发展中心</Option>
              <Option value="1">投资合作局</Option>
              <Option value="2">口岸事务管理局</Option>
              <Option value="3">休闲旅游产业发展中心</Option>
              <Option value="4">梅山街道</Option>
              <Option value="5">金融管理科</Option>
              <Option value="6">市场监督管理局</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件号码">
          {form.getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
            initialValue: stepFormValues.idNum,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="手机号码">
          {form.getFieldDecorator('workerPhone', {
            rules: [{ required: true, message: '请输入手机号' }],
            initialValue: stepFormValues.workerPhone,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="邮箱">
          {form.getFieldDecorator('workerEmail', {
            rules: [{ required: true, message: '请输入邮箱' }],
            initialValue: stepFormValues.workerEmail,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    );

    const modalFooter = { onOk: this.handleDone, onCancel: this.handleCancel };

    return (
      <PageHeaderWrapper>
        <GridContent className={styles.userCenter}>
          <div
            style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
            className={styles.buttonColor}
          >
            <Row gutter={12}>
              <Col xxl={4} xl={6} lg={6} md={24} className={styles.cardhead}>
                <Card bordered={false} style={{ marginBottom: 24 }} loading={Loading}>
                  <Search
                    style={{ marginBottom: 8 }}
                    placeholder="搜索部门"
                    onChange={this.onChange}
                  />
                  <div className={styles.tree}>
                    <Tree defaultExpandAll>{this.renderTreeNodes(treeData)}</Tree>
                  </div>
                </Card>
              </Col>
              <Col xxl={20} xl={18} lg={18} md={24}>
                <Card bordered={false} style={{ marginBottom: 24 }} loading={Loading}>
                  <div className={styles.tableListForm}>{this.renderForm()}</div>
                  <StandardTable
                    selectedRows={selectedRows}
                    loading={loading}
                    data={staffData}
                    columns={this.columns}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                    scroll={{ x: true }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </GridContent>
        <BranchModal visible={branch} onCancel={() => this.toggleModal('branch')} />
        <StaffModal
          visible={staff}
          onCancel={() => this.toggleModal('staff')}
          stepFormValues={stepFormValues}
        />
        <RoleModal visible={role} onCancel={() => this.toggleModal('role')} />
        <Modal width={600} visible={updateModalVisible} title="编辑用户" {...modalFooter}>
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default UserSet;
