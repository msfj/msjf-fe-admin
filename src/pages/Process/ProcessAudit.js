import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form, Input, Select, Icon, Button, Tabs, Table, message, Upload } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;

/* eslint react/no-multi-comp:0 */
@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
@Form.create()
class ProcessAudit extends PureComponent {
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

  render() {
    const {
      process: { data },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const {
      form: { getFieldDecorator },
    } = this.props;

    const upLoadProps = {
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
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="基本信息" key="1">
              <iframe
                title="1"
                src="http://127.0.0.1:8097/process/diagram-viewer/index.html"
                width="100%"
                height="300px"
                frameBorder="0"
              />
            </TabPane>
            <TabPane tab="审核信息" key="2">
              <Table dataSource={data.list} columns={this.columns} style={{ height: '300px' }} />
            </TabPane>
            <TabPane tab="流程信息" key="3">
              <iframe
                title="2"
                src="http://127.0.0.1:8097/process/diagram-viewer/index.html"
                width="100%"
                height="300px"
                frameBorder="0"
              />
            </TabPane>
          </Tabs>

          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="附件">
              <Upload {...upLoadProps}>
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="审核意见">
              {getFieldDecorator('editor2', {
                rules: [
                  {
                    required: true,
                    message: '这是必填字段',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="流程走向">
              {getFieldDecorator('editor2', {
                rules: [
                  {
                    required: true,
                    message: '这是必填字段',
                  },
                ],
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="0">金服人员审核</Option>
                  <Option value="1">招商对接人审核</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="审核结果">
              {getFieldDecorator('editor2', {
                rules: [
                  {
                    required: true,
                    message: '这是必填字段',
                  },
                ],
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="">- 请选择 -</Option>
                  <Option value="1">通过</Option>
                  <Option value="0">不通过</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                审核
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProcessAudit;
