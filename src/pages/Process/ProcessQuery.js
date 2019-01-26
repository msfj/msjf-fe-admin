import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
// import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './ProcessList.less';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
// const statusMap = ['error', 'success', 'default'];
// const status = ['不同意', '同意', '已退回'];
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

const dataRe1 = [
  {
    Id: '07110dce0be54d58ac2d05844e35b39a',
    proInstance: '3712501',
    proDefKey: 'kingdom_1525662692438:2:2525',
    proDefName: '用户注册',
    auditorName: '谢忠全',
    custName: '1213',
    custNo: '132',
    actName: '金服人员审核',
    startTime: '2019-01-19 08:53:48',
    endTime: '2019-01-23 15:27:56',
    messageText: '已退回',
    auditResult: '发起流程',
  },
  {
    Id: '8b42828616614c5bbc284acc30956315',
    proInstance: '3712765',
    proDefKey: 'kingdom_1526978404700:5:3479967',
    proDefName: '企业变更',
    auditorId: '000',
    auditorName: '张天',
    custName: '宁波市瑞芯网络科技合伙企业',
    custNo: '12134',
    actName: '金服人员审核',
    startTime: '2019-01-16 09:53:48',
    endTime: '2019-01-23 15:27:56',
    messageText: '同意',
    auditResult: '发起流程',
  },
  {
    Id: '044bdf1c3c124dfa8a44b81f75f2423e',
    proInstance: '3712699',
    proDefKey: 'kingdom_1526978404700:5:3479967',
    proDefName: '企业变更',
    auditorId: '000',
    auditorName: '谢金',
    custName: '宁波市瑞芯网络科技合伙企业',
    custNo: '12134',
    actName: '金服人员审核',
    startTime: '2019-01-19 09:53:48',
    endTime: '2019-01-23 15:23:49',
    messageText: '同意',
    auditResult: '发起流程',
  },
  {
    Id: '4939e02ecf8640149b5e0a774a1172dc',
    proInstance: '3712633',
    proDefKey: 'kingdom_1526978404700:5:3479967',
    proDefName: '企业变更',
    auditorId: '000',
    custName: '宁波市瑞芯网络科技合伙企业',
    custNo: '12134',
    auditorName: '李元霸',
    actName: '金服人员审核',
    startTime: '2019-01-19 11:55:48',
    endTime: '2019-01-23 15:13:38',
    messageText: '不同意',
    auditResult: '发起流程',
  },
  {
    Id: 'd7d3546884a742178e6f34a9854f5a3a',
    proInstance: '3712567',
    proDefKey: 'kingdom_1526978404700:5:3479967',
    proDefName: '企业变更',
    auditorId: '000',
    auditorName: '李浩',
    custName: '宁波市瑞芯网络科技合伙企业',
    custNo: '12134',
    actName: '金服人员审核',
    startTime: '2019-01-19 11:53:48',
    endTime: '2019-01-23 15:13:35',
    messageText: '已退回',
    auditResult: '发起流程',
  },
  {
    Id: 'e1c75a875d724782be9587b0bc4fe947',
    proInstance: '3712501',
    proDefKey: 'kingdom_1526978404700:5:3479967',
    proDefName: '企业变更',
    auditorId: '000',
    auditorName: '张浩',
    custName: '宁波市瑞芯网络科技合伙企业',
    custNo: '12134',
    actName: '金服人员审核',
    startTime: '2019-01-19 13:53:48',
    endTime: '2019-01-23 15:12:54',
    messageText: '同意',
    auditResult: '发起流程',
  },
  {
    Id: '95f29019fdd74657af98256c03a0ebe7',
    proInstance: '3697521',
    proDefKey: 'kingdom_1525662692438:2:2525',
    proDefName: '用户注册',
    auditorId: '111',
    auditorName: '张三',
    custName: '1213',
    custNo: '132',
    actId: '2121',
    actName: '金服人员审核',
    startTime: '2019-01-19 16:53:48',
    endTime: '2019-01-19 16:54:12',
    messageText: '同意',
    auditResult: '审核通过',
  },
  {
    Id: 'e66fae8e70ff4a2da4225992f7222321',
    proInstance: '3720001',
    proDefKey: 'kingdom_1526978404700:5:3479967',
    proDefName: '企业变更',
    auditorId: '111',
    auditorName: '谢永泰',
    custName: '1213',
    custNo: '132',
    actName: '金服人员审核',
    startTime: '2019-01-14 15:53:48',
    endTime: '2019-01-19 14:16:24',
    messageText: '不同意',
    auditResult: '发起流程',
  },
];
const dataRe = {
  list: dataRe1,
};

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
  };

  columns = [
    {
      title: '流程类型',
      dataIndex: 'proDefName',
      sorter: true,
    },
    {
      title: '任务名称',
      dataIndex: 'actName',
      sorter: true,
    },
    {
      title: '任务描述',
      dataIndex: 'des',
      sorter: true,
    },
    {
      title: '发起时间',
      dataIndex: 'startTime',
      sorter: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      sorter: true,
    },
    {
      title: '审核人',
      dataIndex: 'auditorName',
      sorter: true,
    },
    {
      title: '审核结果',
      dataIndex: 'auditResult',
      sorter: true,
      /* filters: [
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
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />; 
      }, */
    },
    {
      title: '审核意见',
      dataIndex: 'messageText',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'processInstanceId',
      render: val => (
        <Fragment>
          <Link
            to={{
              pathname: 'process-detail',
              query: val,
            }}
          >
            详情
          </Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'process/fetchQuery',
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

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row {...rows}>
          <Col {...cols}>
            <FormItem label="任务类型">
              {getFieldDecorator('flowType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
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
            <FormItem label="任务类型">
              {getFieldDecorator('flowType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
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
            <FormItem label="发起人手机号">
              {getFieldDecorator('phone')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col {...cols}>
            <FormItem label="发起日期">{getFieldDecorator('startTime')(<RangePicker />)}</FormItem>
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
    const {
      // process: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper>
        <div
          style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
          className={styles.buttonColor}
        >
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={dataRe}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
