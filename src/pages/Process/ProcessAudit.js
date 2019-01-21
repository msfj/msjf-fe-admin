import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form, Input, Select, Button, Tabs, message, Steps, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProcessAudit.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const name = 'zzz';
const success = require('../../assets/success.svg');
const fail = require('../../assets/fail.svg');

/* eslint react/no-multi-comp:0 */
@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
@Form.create()
class ProcessAudit extends PureComponent {
  state = {
    current: 6,
    value: 0,
  };

  columns = [
    {
      title: '流程类型',
      dataIndex: 'flowName',
    },
    {
      title: '任务名称',
      dataIndex: 'actName',
    },
    {
      title: '任务描述',
      dataIndex: 'desc',
    },
    {
      title: '发起人',
      dataIndex: 'assigneeName',
    },
    {
      title: '最近审核时间',
      dataIndex: 'startTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '审核附件',
      dataIndex: 'files',
      render: val => (
        <Fragment>
          <a download={val.url}>{val.name}</a>
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

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
        message.success('操作成功！');
      }
    });
  };

  callback = key => {
    console.log(key);
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { current, value } = this.state;

    const formItemLayout = {
      /* labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      }, */
    };
    const submitFormLayout = {
      wrapperCol: {
        // xs: { span: 24, offset: 0 },
        // sm: { span: 10, offset: 1 },
      },
    };
    const {
      form: { getFieldDecorator },
    } = this.props;

    /* const upLoadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }; */

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="基本信息" key="1">
              <div>
                <iframe
                  title="1"
                  src="http://127.0.0.1:8097/process/diagram-viewer/index.html"
                  width="100%"
                  height="300px"
                  frameBorder="0"
                />
              </div>
              <div>
                <span style={{ fontSize: 18, paddingLeft: '3.7%' }}>
                  <b>审核操作</b>
                </span>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: '1.1%' }} layout="vertical">
                  <FormItem
                    {...formItemLayout}
                    style={{ paddingLeft: '2.8%', paddingRight: '2.8%' }}
                  >
                    {getFieldDecorator('editor1', {})(
                      <div className={styles.radioSet}>
                        <RadioGroup onChange={this.onChange} value={value} buttonStyle="solid">
                          <Radio.Button
                            value={1}
                            style={{ marginRight: 20, fontSize: 16, borderRadius: 20 }}
                            className="pass"
                          >
                            <span
                              style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 61,
                                marginRight: 61,
                              }}
                            >
                              <img src={success} alt="pass" style={{ paddingRight: 10 }} />
                              通过
                            </span>
                          </Radio.Button>
                          <Radio.Button
                            value={2}
                            style={{
                              fontSize: 16,
                              borderRadius: 20,
                            }}
                            className="notpass"
                          >
                            <span
                              style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 61,
                                marginRight: 61,
                              }}
                            >
                              <img src={fail} alt="notpass" style={{ paddingRight: 10 }} />
                              不通过
                            </span>
                          </Radio.Button>
                        </RadioGroup>
                      </div>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="审核意见(审核不通过，必须填写相关不通过的意见)"
                    style={{ paddingLeft: '2.8%', paddingRight: '2.8%' }}
                  >
                    {getFieldDecorator('editor2', {})(<TextArea rows={4} />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    style={{ paddingLeft: '2.8%', paddingRight: '2.8%' }}
                    label="流程走向"
                  >
                    {getFieldDecorator('editor3', {})(
                      <Select style={{ width: 388 }}>
                        <Option value="0">金服人员审核</Option>
                        <Option value="1">招商对接人审核</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...submitFormLayout} style={{ marginTop: 32, paddingLeft: '2.8%' }}>
                    <Button style={{ marginRight: '2%', width: 100 }}>取消</Button>
                    <Button type="primary" htmlType="submit">
                      提交审核
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="流程信息" key="2" style={{ paddingLeft: 30 }}>
              <Steps
                progressDot
                current={current}
                direction="vertical"
                className={styles.stepHeight}
              >
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: 14 }}>
                          <b>提交拟设立申请</b>
                        </span>
                        <span style={{ fontSize: 14, color: 'blue' }}>
                          <b>{`【${name}】`}</b>
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: 'rgba(145,152,158)', paddingLeft: 200 }}>
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description="This is a description."
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>招商部门对接人确认</b>
                      </span>
                      <span
                        style={{
                          display: current > 1 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description="This is a description."
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>招商部门分管领导确认</b>
                      </span>
                      <span
                        style={{
                          display: current > 2 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description="This is a description."
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>金融服务管理部确认</b>
                      </span>
                      <span
                        style={{
                          display: current > 3 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description="This is a description."
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>金融服务管理部确认</b>
                      </span>
                      <span
                        style={{
                          display: current > 4 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description="This is a description."
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>市场监督管理确认</b>
                      </span>
                      <span
                        style={{
                          display: current > 5 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>市场监督管理确认</b>
                      </span>
                      <span
                        style={{
                          display: current > 6 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                  description=""
                />
                <Step
                  title={
                    <div style={{ width: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14 }}>
                        <b>审核完成</b>
                      </span>
                      <span
                        style={{
                          display: current > 7 ? 'block' : 'none',
                          fontSize: 12,
                          color: 'rgba(145,152,158)',
                          paddingLeft: 200,
                        }}
                      >
                        {moment().format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  }
                />
              </Steps>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProcessAudit;
