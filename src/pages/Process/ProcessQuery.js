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
      process: { data },
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
                data={data}
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
