import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Input,
  Modal,
  message,
  Badge,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BussinessUserSet.less';

const FormItem = Form.Item;
const { Option } = Select;
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

const CreateForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    formValues,
    handleModalVisible,
    isShowOrg,
    toggleClientType,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
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
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="登陆账号">
          {form.getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入账号' }],
            initialValue: formValues.account,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="用户名称">
          {form.getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: formValues.userName,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件类型">
          {form.getFieldDecorator('certificateType', {
            initialValue: formValues.certificateType || '0',
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="0">身份证</Option>
              <Option value="1">营业执照</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件号码">
          {form.getFieldDecorator('number', {
            rules: [{ required: true, message: '请输入证件号码' }],
            initialValue: formValues.number,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="手机号码">
          {form.getFieldDecorator('phone', {
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
    {
      title: '用户名称',
      dataIndex: 'userName',
      sorter: true,
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
      title: '登陆帐号',
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
        <Fragment>
          <a
            onClick={() => {
              this.handleModalVisible();
              this.haddleFormParams(record);
            }}
          >
            编辑
          </a>
          <a> 重置密码 </a>
          <a> 冻结 </a>
          <a> 锁定 </a>
          <a> 删除 </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/getClient',
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

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });
      console.log(values);
      dispatch({
        type: 'account1/getStaff',
        payload: values,
      });
    });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  haddleFormParams = record => {
    const isShowOrg = record.userType && record.userType === '1';
    this.setState({
      formValues: record || {},
      isShowOrg,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/add',
      payload: {
        userName: fields.userName,
        certificateType: fields.certificateType,
        number: fields.number,
        phone: fields.phone,
        email: fields.email,
        account: fields.account,
        userType: fields.userType,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        // name: fields.name,
        userName: fields.userName,
        certificateType: fields.certificateType,
        number: fields.number,
        phone: fields.phone,
        email: fields.emali,
        account: fields.account,
        userType: fields.userType,
        enterpriseType: fields.enterpriseType,
        enterpriseClass: fields.enterpriseClass,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row {...rows}>
          <Col {...cols}>
            <FormItem label="用户名称">
              {getFieldDecorator('userNmae')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="证件号码">
              {getFieldDecorator('id')(<Input placeholder="请输入" />)}
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
                  this.handleModalVisible();
                  this.haddleFormParams();
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
            <FormItem label="用户名称">
              {getFieldDecorator('userNmae')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="证件号码">
              {getFieldDecorator('id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="登陆账号">
              {getFieldDecorator('actId')(<Input placeholder="请输入" />)}
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
              onClick={() => this.handleModalVisible()}
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
      // rule: { data },
      account1: { staffData },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, isShowOrg, formValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">冻结</Menu.Item>
        <Menu.Item key="unlock">解锁</Menu.Item>
        <Menu.Item key="reset">重置密码 </Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
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
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <div className={styles.tableListOperator}>
                {selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )}
              </div>
              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={staffData}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
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
