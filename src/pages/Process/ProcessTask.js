import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  DatePicker,
  Avatar,
  Radio,
  List,
  Progress,
} from 'antd';
// import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import PageLoading from '@/components/PageLoading';
import styles from './ProcessTask.less';

// const ProcessTaskClassify = React.lazy(() => import('./ProcessTaskClassify'));

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const FormItem = Form.Item;
const { Option } = Select;
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
  xxl: 6,
  xl: 8,
  md: 12,
  sm: 24,
};

const titles = ['企业拟设立', '企业确认设立', '企业变更', '企业迁入', '企业注销'];

const dic = ['企业拟设立', '企业确认设立', '企业变更', '企业迁入', '企业注销', ''];

const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 5,
  total: 50,
};

const list = [
  {
    logo: '',
    subDescription: '企业拟设立',
    title: '宁波花好月圆有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
  },
  {
    logo: '',
    subDescription: '企业拟设立',
    title: '宁波花好月圆有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
  },
  {
    logo: '',
    subDescription: '企业拟设立',
    title: '宁波花好月圆有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
    per: '王龙',
  },
  {
    logo: '',
    subDescription: '企业确认设立',
    title: '宁波花好月圆有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
    per: '王龙',
  },
];

const ListContent = ({ data: { per, start, recent, percent, status } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>发起人</span>
      <p>{per}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(start).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>最近审核时间</span>
      <p>{moment(recent).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
    </div>
  </div>
);

const notice = [
  {
    id: 'xxx1',
    title: titles[0],
    // logo: avatars[0],
    // description: ``,
    // updatedAt: new Date(),
    member: [
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
    ],
    description: '最早三条',
    href: { pathname: 'process-list', query: titles[0] },
    memberLink: 'process-init',
  },
  {
    id: 'xxx2',
    title: titles[1],
    // logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    member: [
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
    ],
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    // logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    member: [
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
    ],
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    // logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    member: [
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
    ],
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    // logo: avatars[4],
    description: '凛冬将至',
    member: [
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
      { men: '花好月圆', updatedAt: new Date() },
    ],
    href: '',
    memberLink: '',
  },
];

/* eslint react/no-multi-comp:0 */
@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    value: 5,
  };

  columns = [
    {
      title: '任务描述',
      dataIndex: 'desc',
      sorter: true,
    },
    {
      title: '最近审核时间',
      dataIndex: 'startTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'processInstanceId',
      render: val => (
        <Fragment>
          <Link
            to={{
              pathname: '/process/process-audit',
              query: val,
            }}
          >
            审核
          </Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'process/fetch',
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
      type: 'process/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'process/fetch',
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
          type: 'process/remove',
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

  handleSelectRows = row_ => {
    this.setState({
      selectedRows: row_,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'process/fetch',
        payload: values,
      });
    });
  };

  haddleClick = () => {
    this.setState({});
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
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
            <FormItem label="发起人">{getFieldDecorator('assigneeName')(<Input />)}</FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="发起人手机号">{getFieldDecorator('phone')(<Input />)}</FormItem>
          </Col>
          <Col {...cols}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
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
            <FormItem label="发起人">{getFieldDecorator('assigneeName')(<Input />)}</FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="发起人手机号">{getFieldDecorator('phone')(<Input />)}</FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="流程类型">
              {getFieldDecorator('flowType')(
                <Select placeholder="请选择">
                  <Option value="0">企业设立</Option>
                  <Option value="1">企业变更申请</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="任务名称">
              {getFieldDecorator('actName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="任务描述">
              {getFieldDecorator('desc')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="最近审核日期">
              {getFieldDecorator('startTime')(<RangePicker />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
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
    // const {
    //   // process: { data },
    //   // loading,
    // } = this.props;
    const { value } = this.state;
    const extraContent1 = (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.onChange} value={value}>
          <RadioButton value={5}>全部</RadioButton>
          <RadioButton value={0}>企业拟设立</RadioButton>
          <RadioButton value={1}>企业确认设立</RadioButton>
          <RadioButton value={2}>企业变更</RadioButton>
          <RadioButton value={3}>企业迁入</RadioButton>
          <RadioButton value={4}>企业注销</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );
    console.log(value);
    return (
      <PageHeaderWrapper>
        <div
          style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
          className={styles.buttonColor}
        >
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card
                bodyStyle={{ height: 391, padding: 0 }}
                className={styles.projectList}
                style={{ marginBottom: 24 }}
                title="待办任务"
                bordered={false}
              >
                {notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <Card.Meta
                        title={
                          <div className={styles.cardTitle}>
                            <Avatar size="small" src={item.logo} />
                            <Link to={item.href}>{item.title}</Link>
                          </div>
                        }
                        description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to={item.memberLink}>{item.member[0].men || ''}</Link>
                        {item.member[0].updatedAt && (
                          <span className={styles.datetime} title={item.member[0].updatedAt}>
                            {moment(item.member[0].updatedAt).fromNow()}
                          </span>
                        )}
                        <Link to={item.memberLink}>{item.member[0].men || ''}</Link>
                        {item.member[0].updatedAt && (
                          <span className={styles.datetime} title={item.member[0].updatedAt}>
                            {moment(item.member[0].updatedAt).fromNow()}
                          </span>
                        )}
                        <Link to={item.memberLink}>{item.member[0].men || ''}</Link>
                        {item.member[0].updatedAt && (
                          <span className={styles.datetime} title={item.member[0].updatedAt}>
                            {moment(item.member[0].updatedAt).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))}
              </Card>
            </Col>
          </Row>
          <Row>
            <Card
              bordered={false}
              title="审核历史动态"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}
              extra={extraContent1}
            >
              <List
                size="large"
                rowKey="id"
                pagination={paginationProps}
                dataSource={list}
                renderItem={item =>
                  dic[value] === item.subDescription || value === 5 ? (
                    <List.Item
                      actions={[
                        <a
                          onClick={e => {
                            e.preventDefault();
                          }}
                        >
                          查看
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.logo} shape="square" size="large" />}
                        title={item.title}
                        description={item.subDescription}
                      />
                      <ListContent data={item} />
                    </List.Item>
                  ) : (
                    <div />
                  )
                }
              />
            </Card>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
