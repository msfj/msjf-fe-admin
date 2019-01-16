import React, { PureComponent } from 'react';
import TreeTitle from '@/components/TreeTitle';
// import { connect } from 'dva';
// import Link from 'umi/link';
// import router from 'umi/router';
import { Card, Row, Col, Input, Button, Form, Modal, Table, Tree, Tabs, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './UserSet.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Search } = Input;
const FormItem = Form.Item;
const { TreeNode } = Tree;

const { TabPane } = Tabs;

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

const columns = [
  {
    title: '员工姓名',
    dataIndex: 'workerName',
    // key: 'name',
    // render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '登陆账号',
    dataIndex: 'woekerAccount',
    // key: 'age',
  },
  {
    title: '所属部门',
    dataIndex: 'department',
    // key: 'address',
  },
  {
    title: '证件号码',
    // key: 'tags',
    dataIndex: 'idNum',
  },
  {
    title: '手机号码',
    // key: 'tags',
    dataIndex: 'phone',
  },
  {
    title: '邮箱地址',
    // key: 'tags',
    dataIndex: 'email',
  },
];

const treeData = [
  {
    title: '根节点',
    key: '-1',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
];

const Data = [];

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const BranchModal = Form.create()(props => {
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
    <Modal visible={visible} title="新增部门" okText="保存" onCancel={onCancel} onOk={okHandle}>
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

const StaffModal = Form.create()(props => {
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

@Form.create()
class UserSet extends PureComponent {
  state = {
    visible: {
      branch: false,
      staff: false,
      role: false,
    },
    loading: false,
  };

  componentDidMount() {}

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
    console.log({
      visible: {
        ...visible,
        [key]: !visible[key],
      },
    });
  };

  onChange = () => {};

  searchform() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
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
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      visible: { branch, staff, role },
    } = this.state;

    return (
      <PageHeaderWrapper>
        <GridContent className={styles.userCenter}>
          <Row gutter={24}>
            <Col xxl={6} xl={8} lg={10} md={24} className={styles.cardhead}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
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
            <Col xxl={18} xl={16} lg={14} md={24}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="部门管理" key="1">
                    <div className={styles.tableListForm}>{this.searchform()}</div>
                    <div>
                      <Button icon="plus" type="primary" onClick={() => this.toggleModal('staff')}>
                        新增员工
                      </Button>
                    </div>
                    <Table columns={columns} dataSource={Data} />
                  </TabPane>
                  <TabPane tab="角色管理" key="2">
                    <div className={styles.tableListForm}>{this.searchform()}</div>
                    <div>
                      <Button icon="plus" type="primary" onClick={() => this.toggleModal('role')}>
                        新增角色
                      </Button>
                    </div>
                    <Table columns={columns} dataSource={Data} />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </GridContent>
        <BranchModal visible={branch} onCancel={() => this.toggleModal('branch')} />
        <StaffModal visible={staff} onCancel={() => this.toggleModal('staff')} />
        <RoleModal visible={role} onCancel={() => this.toggleModal('role')} />
      </PageHeaderWrapper>
    );
  }
}
export default UserSet;
