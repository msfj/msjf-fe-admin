import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import Link from 'umi/link';
// import router from 'umi/router';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Button,
  Radio,
  Form,
  Modal,
  Table,
  Menu,
  Dropdown,
  message,
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { FormattedMessage } from 'umi/locale';
import styles from './userSet.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Search } = Input;
const FormItem = Form.Item;

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
const data = [];

const handleMenuClick = e => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const menu = (
  <Menu onClick={handleMenuClick} selectedKeys={[]}>
    <Menu.Item key="1">1</Menu.Item>
    <Menu.Item key="2">2</Menu.Item>
    <Menu.Item key="3">3</Menu.Item>
  </Menu>
);

const CollectionCreateForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form: { getFieldDecorator },
  } = props;
  return (
    <Modal visible={visible} title="新增员工" okText="保存" onCancel={onCancel} onOk={onCreate}>
      <Form layout="vertical">
        <Form.Item label="员工姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('workerName', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(<Input style={{ width: 150 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="员工账号" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('workerAccount', {
            rules: [{ required: true, message: '请输入账号' }],
          })(<Input style={{ width: 150 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="所属部门" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('department', {
            rules: [{ required: true, message: '请输入部门' }],
          })(<Input style={{ width: 150 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="证件号码" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('idNum', {
            rules: [{ required: true, message: '请输入证件号码' }],
          })(<Input style={{ width: 200 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="手机号码" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机' }],
          })(<Input style={{ width: 200 }} placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="邮箱地址" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
          })(<Input style={{ width: 200 }} placeholder="请输入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});
const departInfo = Form.create()(props => {
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
/* @connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
})) */
@Form.create()
class Center extends PureComponent {
  state = {
    visible: false,
    loading: false,
    sel: '组织架构',
  };

  componentDidMount() {
    /* const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    }); */
  }

  /* onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  }; */
  handleChange = e => {
    this.setState({ sel: e.target.value });
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

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  searchform() {
    /* const {
      form: { getFieldDecorator },
    } = this.props; */
    // const { getFieldDecorator } = this.props.form;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('userName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="证件号码">
              {getFieldDecorator('number')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
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

  /* handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  }; */

  render() {
    const { sel, loading, visible } = this.state;
    /* const {
      listLoading,
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      match,
      location,
      children,
    } = this.props;

    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'applications',
        tab: (
          <span>
            应用 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ]; */

    return (
      <PageHeaderWrapper title={<FormattedMessage id="app.account1.userSet.title" />}>
        <GridContent className={styles.userCenter}>
          <Row gutter={24}>
            <Col lg={7} md={24}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
                <Search
                  placeholder="搜索部门"
                  onSearch={value => console.log(value)}
                  style={{ width: '100%' }}
                />
                <br />
                <br />
                <Radio.Group value={sel} onChange={this.handleChange} size="large">
                  <Radio.Button value="组织架构">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组织架构&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Radio.Button>
                  <Radio.Button value="角色管理">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Radio.Button>
                </Radio.Group>
                <br />
                <Card
                  title="部门"
                  bordered={false}
                  extra={
                    <div>
                      <Button icon="plus" type="primary" onClick={this.showModal}>
                        新增
                      </Button>
                      <departInfo
                        wrappedComponentRef={this.saveFormRef}
                        visible={visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                      />
                      <Dropdown overlay={menu}>
                        <Button type="primary">
                          操作 <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </div>
                  }
                  style={{ marginBottom: 24 }}
                />
              </Card>
            </Col>
            <Col lg={17} md={24}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
                <div className={styles.tableListForm}>{this.searchform()}</div>
                <div>
                  <Button icon="plus" type="primary" onClick={this.showModal}>
                    新增员工
                  </Button>
                  <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                  />
                </div>
                <Table columns={columns} dataSource={data} />
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Center;
