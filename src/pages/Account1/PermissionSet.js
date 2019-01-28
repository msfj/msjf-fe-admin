import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Row,
  Button,
  Radio,
  List,
  Col,
  Input,
  Icon,
  Checkbox,
  Tree,
  Tabs,
  Form,
  Modal,
  Dropdown,
  Menu,
  message,
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import styles from './PermissionSet.less';

const { Search } = Input;
const { TreeNode } = Tree;
const RadioGroup = Radio.Group;
const { TabPane } = Tabs;
const { confirm } = Modal;
const FormItem = Form.Item;

const rows = {
  gutter: {
    md: 8,
    lg: 24,
    xl: 48,
    xxl: 48,
  },
};

const cols = {
  xxl: 6,
  xl: 8,
  md: 12,
  sm: 24,
};

const treeData1 = [
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
    title: '对应单位局领导',
    key: '0-2',
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

const treeData = [
  {
    title: '管理中心',
    key: '0-0',
    children: [
      { title: '客户管理', key: '0-0-0' },
      { title: '用户管理', key: '0-0-1' },
      { title: '权限管理', key: '0-0-2' },
    ],
  },
  {
    title: '征审中心',
    key: '0-1',
    children: [
      { title: '待办任务管理', key: '0-1-0' },
      { title: '当前审核管理', key: '0-1-1' },
      { title: '历史审核管理', key: '0-1-2' },
    ],
  },
];

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i += 1) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(treeData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const dataRole = ['系统管理员', '招商部门对接员', '金融监督员', '招商部门分管领导', '登记办理员'];
const dataJob = ['谢永泰', '赵薇', '王洪', '赵刚', '田雨'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleFormSummit, formValues, handleModalVisible } = props;
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
      title="角色管理"
      okText="保存"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={600}
    >
      <Form>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="角色名称">
          {form.getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入角色名称' }],
            initialValue: formValues.account,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="备注">
          {form.getFieldDecorator('userName', {
            initialValue: formValues.userName,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

function showDeleteConfirm() {
  confirm({
    title: '操作提示',
    content: '确定删除该角色?',
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

@connect(({ account1, loading }) => ({
  account1,
  loading: loading.models.account1,
}))
@Form.create()
class Permission extends Component {
  state = {
    selectedRows: [],
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    modalVisible: false,
    formValues: {},
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
      sorter: true,
      render: key => key + 1,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      sorter: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
                    this.handleModalVisible();
                  }}
                >
                  编辑
                </a>
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
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account1/getStaff',
    });
  }

  updateStaffModal = record => {
    this.setState({
      formValues: record || {},
    });
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const {
      target: { value },
    } = e;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onChange1 = e => {
    const {
      target: { value },
    } = e;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData1);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
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

  handleFormSummit = fields => {
    const { dispatch } = this.props;
    if (this.operateType === 'add') {
      dispatch({
        type: 'account1/addRole',
        payload: fields,
      });
    } else {
      dispatch({
        type: 'account1/editRole',
        payload: fields,
      });
    }

    message.success('操作成功');
    this.handleModalVisible();
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row {...rows}>
          <Col {...cols}>
            <FormItem label="角色名称">
              {getFieldDecorator('roleNmae')(<Input placeholder="请输入" />)}
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
                  this.handleFormReset();
                }}
              >
                新增
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
      expandedKeys,
      autoExpandParent,
      searchValue,
      selectedRows,
      modalVisible,
      formValues,
    } = this.state;
    const {
      account1: { staffData },
      loading,
    } = this.props;
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title} />;
      });
    const parentMethods = {
      handleFormSummit: this.handleFormSummit,
      handleModalVisible: this.handleModalVisible,
      modalVisible,
      formValues,
    };
    return (
      <PageHeaderWrapper>
        <GridContent>
          <div
            style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
            className={styles.buttonColor}
          >
            <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="角色管理" key="1">
                  <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                  <StandardTable
                    selectedRows={selectedRows}
                    loading={loading}
                    data={staffData}
                    columns={this.columns}
                  />
                </TabPane>
                <TabPane tab="角色菜单权限" key="2">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col lg={6} md={24}>
                      <Search
                        style={{ marginBottom: 8 }}
                        placeholder="输入角色名称"
                        onSearch={this.handleSearch}
                      />
                      <RadioGroup name="roleName">
                        <List
                          bordered={false}
                          dataSource={dataRole}
                          renderItem={item => (
                            <List.Item>
                              <Radio value={item} />
                              <div className={styles.iconlist}>
                                <Icon type="user" />
                              </div>
                              {item}
                            </List.Item>
                          )}
                        />
                      </RadioGroup>
                    </Col>
                    <Col lg={6} md={24}>
                      <div>
                        <Search
                          style={{ marginBottom: 8 }}
                          placeholder="输入菜单名称"
                          onChange={this.onChange}
                        />
                        <Tree
                          onExpand={this.onExpand}
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                          checkable="true"
                        >
                          {loop(treeData)}
                        </Tree>
                      </div>
                    </Col>
                    <Col lg={6} md={24}>
                      <Button type="primary" onClick={() => message.success('操作成功')}>
                        授取菜单权限
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="用户角色权限" key="3" style={{ paddingBottom: 30 }}>
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col lg={6} md={24} xs={24}>
                      <div>
                        <Search
                          style={{ marginBottom: 8 }}
                          placeholder="输入机构名称"
                          onChange={this.onChange1}
                        />
                        <Tree
                          onExpand={this.onExpand}
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                        >
                          {loop(treeData1)}
                        </Tree>
                      </div>
                    </Col>
                    <Col lg={6} md={24} xs={24}>
                      <Search
                        style={{ marginBottom: 8 }}
                        placeholder="输入员工名称"
                        onSearch={this.handleSearch}
                      />
                      <RadioGroup name="jobName">
                        <List
                          bordered={false}
                          dataSource={dataJob}
                          renderItem={item => (
                            <List.Item>
                              <Radio value={item} />
                              <div className={styles.iconlist}>
                                <Icon type="user" />
                              </div>
                              {item}
                            </List.Item>
                          )}
                        />
                      </RadioGroup>
                    </Col>
                    <Col lg={6} md={24} xs={24}>
                      <Search
                        style={{ marginBottom: 8 }}
                        placeholder="输入角色名称"
                        onSearch={this.handleSearch}
                      />
                      <List
                        bordered={false}
                        dataSource={dataRole}
                        renderItem={item => (
                          <List.Item>
                            <Checkbox />
                            <div className={styles.iconlist}>
                              <Icon type="user" />
                            </div>
                            {item}
                          </List.Item>
                        )}
                      />
                    </Col>
                    <Col lg={6} md={24} xs={24}>
                      <Button type="primary" onClick={() => message.success('操作成功')}>
                        授权角色
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </GridContent>
        <CreateForm {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}

export default Permission;
