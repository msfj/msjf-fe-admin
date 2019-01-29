import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Icon,
  Button,
  Input,
  Modal,
  message,
  Badge,
  Dropdown,
  Menu,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BussinessUserSet.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '冻结', '锁定', '销户'];
const rows = {
  gutter: {
    md: 8,
    lg: 24,
    xl: 48,
  },
};

const cols = {
  xxl: 6,
  xl: 8,
  md: 12,
  sm: 24,
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
    content: '确定冻结该客户?',
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
    content: '确定删除该客户?',
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

const CreateForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleFormSummit,
    formValues,
    handleModalVisible,
    isShowOrg,
    toggleClientType,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleFormSummit(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="客户管理"
      okText="保存"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={600}
    >
      <Form>
        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          label="机构"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('branchid', {
            rules: [{ required: true, message: '请输入邮箱' }],
            initialValue: formValues.branchid || '06b857654291467f8316d08518792b12',
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="用户类型" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {form.getFieldDecorator('userType', {
            rules: [{ required: true }],
            initialValue: formValues.userType || '0',
          })(
            <Select onChange={toggleClientType}>
              <Option value="0">自然人</Option>
              <Option value="1">企业</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          label="企业类型"
          style={{ display: isShowOrg ? 'block' : 'none' }}
        >
          {form.getFieldDecorator('enterpriseType', {
            rules: [{ required: true }],
            initialValue: formValues.organtype || '0',
          })(
            <Select>
              <Option value="0">自然人</Option>
              <Option value="1">企业</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          label="企业分类"
          style={{ display: isShowOrg ? 'block' : 'none' }}
        >
          {form.getFieldDecorator('enterpriseClass', {
            rules: [{ required: true }],
            initialValue: formValues.organclass || '0',
          })(
            <Select>
              <Option value="0">自然人</Option>
              <Option value="1">企业</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="登录账号">
          {form.getFieldDecorator('loginname', {
            rules: [{ required: true, message: '请输入账号' }],
            initialValue: formValues.account,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="客户名称">
          {form.getFieldDecorator('custname', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: formValues.userName,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件类型">
          {form.getFieldDecorator('certificatetype', {
            initialValue: formValues.certificateType || '0',
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="0">身份证</Option>
              <Option value="1">护照</Option>
              <Option value="A">营业执照</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件号码">
          {form.getFieldDecorator('certificateno', {
            rules: [{ required: true, message: '请输入证件号码' }],
            initialValue: formValues.number,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="手机号码">
          {form.getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入手机号' }],
            initialValue: formValues.phone,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="邮箱">
          {form.getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
            initialValue: formValues.email,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ account1, loading }) => ({
  account1,
  loading: loading.models.account1,
}))
@Form.create()
class BUserSet extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    isShowOrg: false,
  };

  columns = [
    // {
    //   title: '序号',
    //   dataIndex: 'key',
    //   sorter: true,
    //   render: key => key + 1,
    // },
    {
      title: '用户名称',
      dataIndex: 'userName',
      sorter: true,
      fixed: 'left',
    },
    {
      title: '证件类型',
      dataIndex: 'certificateType',
      sorter: true,
    },
    {
      title: '证件号码',
      dataIndex: 'number',
      sorter: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: '邮箱地址',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: '登录帐号',
      dataIndex: 'account',
      sorter: true,
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      sorter: true,
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      sorter: true,
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: record => (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.haddleSetFormParams(record);
                    this.handleModalVisible();
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
      type: 'account1/getClient',
      payload: {
        pageNum: 1,
        pageSize: 10,
      },
    });
  }

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
      type: 'account1/getClient',
      payload: params,
    });
  };

  toggleClientType = value => {
    const isShowOrg = value === '1';
    this.setState({
      isShowOrg,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'account1/getClient',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'account1/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  haddleResetPwd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/resetpwdClient',
      payload: {},
    });
  };

  handleSelectRows = rows_ => {
    this.setState({
      selectedRows: rows_,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      dispatch({
        type: 'account1/getClient',
        payload: fieldsValue,
      });
    });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  haddleSetOperateType = operateType => {
    this.operateType = operateType;
  };

  haddleSetFormParams = record => {
    const isShowOrg = record && record.userType && record.userType === '1';
    this.setState({
      formValues: record || {},
      isShowOrg,
    });
  };

  handleFormSummit = fields => {
    const { dispatch } = this.props;
    if (this.operateType === 'add') {
      dispatch({
        type: 'account1/addClient',
        payload: fields,
      });
    } else {
      dispatch({
        type: 'account1/editClient',
        payload: fields,
      });
    }

    message.success('操作成功');
    this.handleModalVisible();
  };

  renderTableListForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { expandForm } = this.state;
    const isFormItemBlock = expandForm ? 'block' : 'none';
    const isExpandText = expandForm ? '收起' : '展开';
    const isExpandIcon = expandForm ? <Icon type="up" /> : <Icon type="down" />;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row {...rows}>
          <Col {...cols}>
            <FormItem label="用户名称">
              {getFieldDecorator('membername')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="证件号码">
              {getFieldDecorator('certificateno')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols} style={{ display: isFormItemBlock }}>
            <FormItem label="登录账号">
              {getFieldDecorator('loginname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols} style={{ display: isFormItemBlock }}>
            <FormItem label="邮箱地址">
              {getFieldDecorator('email')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols} style={{ display: isFormItemBlock }}>
            <FormItem label="手机号码">
              {getFieldDecorator('mobile')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={() => {
                this.handleFormReset();
                this.handleModalVisible();
                this.haddleSetOperateType('add');
              }}
            >
              新增
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              {isExpandText}
              {isExpandIcon}
            </a>
          </div>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      account1: { clientData },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, isShowOrg, formValues } = this.state;

    const parentMethods = {
      handleFormSummit: this.handleFormSummit,
      handleModalVisible: this.handleModalVisible,
      toggleClientType: this.toggleClientType,
      modalVisible,
      formValues,
      isShowOrg,
    };
    return (
      <PageHeaderWrapper>
        <div
          style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
          className={styles.buttonColor}
        >
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderTableListForm()}</div>
              <div className={styles.tableListOperator} />
              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={clientData}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                scroll={{ x: true }}
              />
            </div>
          </Card>
        </div>
        <CreateForm {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}

export default BUserSet;
