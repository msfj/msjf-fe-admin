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
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';

import styles from './BussinessUserSet.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '异常', '冻结', '@@'];
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
  const { modalVisible, form, handleAdd, handleModalVisible, show, judge } = props;
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
      title="编辑用户"
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
            initialValue: '自然人',
          })(
            <Select onChange={judge}>
              <Option value="自然人">自然人</Option>
              <Option value="企业">企业</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          label="企业类型"
          style={{ display: show ? 'block' : 'none' }}
        >
          {form.getFieldDecorator('enterpriseType', {
            rules: [{ required: true }],
            initialValue: '-请选择-',
          })(
            <Select>
              <Option value="自然人">自然人</Option>
              <Option value="企业">企业</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          label="企业分类"
          style={{ display: show ? 'block' : 'none' }}
        >
          {form.getFieldDecorator('enterpriseClass', {
            rules: [{ required: true }],
            initialValue: '-请选择-',
          })(
            <Select>
              <Option value="自然人">自然人</Option>
              <Option value="企业">企业</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="登陆账号">
          {form.getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入账号' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="用户名称">
          {form.getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件类型">
          {form.getFieldDecorator('certificateType', {
            initialValue: '身份证',
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="身份证">身份证</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="证件号码">
          {form.getFieldDecorator('number', {
            rules: [{ required: true, message: '请输入证件号码' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="手机号码">
          {form.getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="邮箱">
          {form.getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
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
    // updateModalVisible: false,
    // expandForm: false,
    selectedRows: [],
    formValues: {},
    // stepFormValues: {},
    show: false,
  };

  columns = [
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '证件类型',
      dataIndex: 'certificateType',
    },
    {
      title: '证件号码',
      dataIndex: 'number',
      // sorter: true,
      // align: 'right',
      // render: val => `${val} 万`,
      // mark to display a total number
      // needTotal: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '邮箱地址',
      dataIndex: 'email',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '登陆帐号',
      dataIndex: 'account',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
    },
    {
      title: '用户状态',
      dataIndex: 'status',
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
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/fetch',
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
      type: 'rule/fetch',
      payload: params,
    });
  };

  judge = value => {
    if (value === '自然人')
      this.setState({
        show: false,
      });
    else
      this.setState({
        show: true,
      });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'account1/fetch',
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
          type: 'rule/remove',
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
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      console.log(values);
      dispatch({
        type: 'account1/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = () => {
    this.setState({});
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        userName: fields.userName,
        certificateType: fields.certificateType,
        number: fields.number,
        phone: fields.phone,
        email: fields.emali,
        account: fields.account,
        userType: fields.userType,
        enterpriseType: fields.enterpriseType,
        enterpriseClass: fields.enterpriseClass,
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
    this.handleUpdateModalVisible();
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
              {getFieldDecorator('userName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="证件号码">
              {getFieldDecorator('number')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="用户类型">
              {getFieldDecorator('userType')(
                <Select placeholder="请选择">
                  <Option value="自然人">自然人</Option>
                  <Option value="企业">企业</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="用户状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="0">正常</Option>
                  <Option value="1">异常</Option>
                  <Option value="2">冻结</Option>
                  <Option value="3">11</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right' }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    // const { expandForm } = this.state;
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    return this.renderSimpleForm();
  }

  render() {
    const {
      // rule: { data },
      account1: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, show } = this.state;
    console.log(data);
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      judge: this.judge,
      modalVisible,
      show,
    };
    return (
      <PageHeaderWrapper title={<FormattedMessage id="app.account1.bussinessuserset.title" />}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
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
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}

export default BUserSet;
