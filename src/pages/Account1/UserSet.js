import React, { PureComponent } from 'react';
import TreeTitle from '@/components/TreeTitle';
// import { connect } from 'dva';
// import Link from 'umi/link';
// import router from 'umi/router';
import { Card, Row, Col, Input, Button, Form, Modal, Table, Tree, Tabs } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './UserSet.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Search } = Input;
const FormItem = Form.Item;
const { DirectoryTree } = Tree;
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
const Data = [];

const StaffModal = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form: { getFieldDecorator },
  } = props;
  return (
    <Modal
      visible={visible}
      title="新增员工"
      okText="保存"
      onCancel={onCancel}
      onOk={onCreate}
      width={600}
    >
      <Form>
        <Form.Item label="员工姓名" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('workerName', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="员工账号" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('workerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="所属部门" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入部门' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="证件号码" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="手机号码" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="邮箱地址" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
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
    onCreate,
    form: { getFieldDecorator },
  } = props;
  return (
    <Modal
      visible={visible}
      title="新增员工"
      okText="保存"
      onCancel={onCancel}
      onOk={onCreate}
      width={600}
    >
      <Form>
        <Form.Item label="员工姓名" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('workerName', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="员工账号" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('workerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="所属部门" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入部门' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="证件号码" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="手机号码" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="邮箱地址" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

const BranchModal = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form: { getFieldDecorator },
  } = props;
  return (
    <Modal visible={visible} title="新增部门" okText="保存" onCancel={onCancel} onOk={onCreate}>
      <Form layout="vertical">
        <Form.Item label="员工姓名">
          {getFieldDecorator('workerName', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(<Input style={{ width: 150 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="员工账号">
          {getFieldDecorator('workerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
          })(<Input style={{ width: 150 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="所属部门">
          {getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入部门' }],
          })(<Input style={{ width: 150 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="证件号码">
          {getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
          })(<Input style={{ width: 200 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="手机号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机' }],
          })(<Input style={{ width: 200 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="邮箱地址">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
          })(<Input style={{ width: 200 }} placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

@Form.create()
class UserSet extends PureComponent {
  state = {
    branchModalVisible: false,
    staffModalVisible: false,
    roleModalVisible: false,
    loading: false,
  };

  componentDidMount() {}

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

  showBranchModal = () => {
    this.setState({ branchModalVisible: true });
  };

  delTree = () => {
    console.log('删除');
  };

  handleCancel = () => {
    this.setState({ branchModalVisible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ branchModalVisible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { loading, branchModalVisible, staffModalVisible, roleModalVisible } = this.state;

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
                  <DirectoryTree defaultExpandAll>
                    <TreeNode
                      key="0"
                      title={
                        <TreeTitle
                          title="parent -1"
                          isRoot
                          haddleAdd={this.showBranchModal}
                          haddleEdit={this.showBranchModal}
                          haddleDel={this.delTree}
                        />
                      }
                    >
                      <TreeNode title={<TreeTitle title="parent 0" />} key="0-0">
                        <TreeNode title={<TreeTitle title="leaf 0-0-0" />} key="0-0-0" isLeaf />
                        <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                      </TreeNode>
                      <TreeNode title="parent 1" key="0-1">
                        <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                        <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                      </TreeNode>
                    </TreeNode>
                  </DirectoryTree>
                </div>
              </Card>
            </Col>
            <Col xxl={18} xl={16} lg={14} md={24}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="部门管理" key="1">
                    <div className={styles.tableListForm}>{this.searchform()}</div>
                    <div>
                      <Button icon="plus" type="primary" onClick={this.showModal}>
                        新增员工
                      </Button>
                    </div>
                    <Table columns={columns} dataSource={Data} />
                  </TabPane>
                  <TabPane tab="角色管理" key="2">
                    <div className={styles.tableListForm}>{this.searchform()}</div>
                    <div>
                      <Button icon="plus" type="primary" onClick={this.showModal}>
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
        <BranchModal
          wrappedComponentRef={this.saveFormRef}
          visible={branchModalVisible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <StaffModal
          wrappedComponentRef={this.saveFormRef}
          visible={staffModalVisible}
          // onCancel={this.handleCancel}
          // onCreate={this.handleCreate}
        />
        <RoleModal
          wrappedComponentRef={this.saveFormRef}
          visible={roleModalVisible}
          // onCancel={this.handleCancel}
          // onCreate={this.handleCreate}
        />
      </PageHeaderWrapper>
    );
  }
}
export default UserSet;
