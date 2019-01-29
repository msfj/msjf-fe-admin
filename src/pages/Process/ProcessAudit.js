import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form, Input, Select, Button, Tabs, message, Steps, Radio, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classNames from 'classnames';
import styles from './ProcessAudit.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const name = '李云龙';
const success = require('../../assets/success.svg');
const fail = require('../../assets/fail.svg');
const back = require('../../assets/back.svg');
const general = require('../../assets/general-partner.png');
const interfac = require('../../assets/interface.svg');
// const logo = require('../../assets/logo.png');
const mobile = require('../../assets/mobile.svg');
const attachment = require('../../assets/static-attachment.jpg');
const user = require('../../assets/user.svg');

/* eslint react/no-multi-comp:0 */

function InfoTitle(props) {
  const { style, type, className } = props;
  return (
    <div style={style} className={classNames(styles.infoTitle, className)}>
      <i />
      <span className="fs-16-t">{type}</span>
    </div>
  );
}

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
    const {
      dispatch,
      location: {
        query: { isShowAudit },
      },
    } = this.props;
    dispatch({
      type: 'process/fetch',
    });
    this.setState({
      showIsAudit: isShowAudit,
    });
  }

  setInfo = data =>
    data.map(item => (
      <Col className={styles.col} span={12} xxl={6}>
        <div>{item[0]}</div>
        <div className={styles.right}>{item[1]}</div>
      </Col>
    ));

  setPersonInfo = data =>
    data.map(item => (
      <Col className={styles.col} span={12} xxl={8}>
        <div className={styles.staffItem}>
          <p className="fs-16">{item.title}</p>
          <div className={styles.staffItemDetail}>
            <div className={styles.items}>
              <img alt="" src={user} />
              <div className={styles.breakLine} />
              <span>{item.name}</span>
            </div>
            <div className={styles.items}>
              <img alt="" src={mobile} />
              <div className={styles.breakLine} />
              <span>{item.phone}</span>
            </div>
            <div className={styles.items}>
              <img alt="" src={interfac} />
              <div className={styles.breakLine} />
              <span>{item.idcard}</span>
            </div>
          </div>
        </div>
      </Col>
    ));

  callback = key => {
    console.log(key);
  };

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

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { current, value, showIsAudit } = this.state;
    console.log(showIsAudit, '1');
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
              <div className={styles.newEtpInfo}>
                <div className={styles.tips}>
                  <img alt="" src={back} />
                  <span className="fs-14">退出/查看详情</span>
                </div>
                <div className={styles.titleBlock}>
                  <img src={general} alt="" />
                  <div className={styles.breakLine} />
                  <span className="fs-24">公司名称公司名称公司名称</span>
                  <div className={classNames(styles.typeBlock, 'fs-14')}>拟设立</div>
                  <i />
                  <p>审批中</p>
                </div>
                <div className="fs-24">拟设立详情内容</div>
                <div className={styles.detailContent}>
                  <InfoTitle type="登记申请信息" />
                  <Row gutter={20} className={styles.row}>
                    {this.setInfo([
                      ['企业地址选择：', '浙江省宁波市眉山区'],
                      ['申请企业名称：', '我是申请企业的名称'],
                      ['企业类型：', '有限'],
                      ['企业分类：', '企业分类内容'],
                    ])}
                  </Row>
                  <InfoTitle
                    type="基本信息"
                    style={{ paddingTop: '20px' }}
                    className={styles.rowBorder}
                  />
                  <Row gutter={20} className={styles.row}>
                    {this.setInfo([
                      ['招商对接人：', '张某某'],
                      ['办理流程', '全电子'],
                      ['经营年限（年）：', '30年'],
                      ['缴付期限（年）：', '4年'],
                      ['注册资本认缴出资额：', '10,000,000'],
                      ['币种：', '人民币'],
                      ['企业电话：', '0574-86708719'],
                      ['企业邮箱：', 'jinfu512@163.com'],
                    ])}
                  </Row>
                  <Row gutter={20} className={styles.row}>
                    <Col className={styles.col} span={12}>
                      <div>经营范围：</div>
                      <div className={styles.right}>显示具体填写的经营范围内容</div>
                    </Col>
                    <Col className={styles.col} span={12}>
                      <div>企业联系地址：</div>
                      <div className={styles.right}>
                        显示具体的地址内容显示具体的地址内容显示具体的地址内容
                      </div>
                    </Col>
                  </Row>
                  <InfoTitle
                    type="邀请认证"
                    style={{ paddingTop: '20px' }}
                    className={styles.rowBorder}
                  />
                  <Row gutter={20} className={styles.row}>
                    <Col className={styles.col} span={12}>
                      <div>执行事务合伙人类型：</div>
                      <div className={styles.right}>类型类型类型</div>
                    </Col>
                    <Col className={styles.col} span={12}>
                      <div>执行事务合伙人名称：</div>
                      <div className={styles.right}>合伙人名称</div>
                    </Col>
                  </Row>
                  <Row className={styles.staffBlock} gutter={20}>
                    {this.setPersonInfo([
                      {
                        title: '联络员',
                        name: '刘辉',
                        phone: '187****5789',
                        idcard: '身份证 - 430528********4587',
                      },
                      {
                        title: '财务负责人',
                        name: '刘辉',
                        phone: '187****5789',
                        idcard: '身份证 - 430528********4587',
                      },
                      {
                        title: '法定代表人/执行事务合伙人',
                        name: '刘辉',
                        phone: '187****5789',
                        idcard: '身份证 - 430528********4587',
                      },
                    ])}
                  </Row>
                  <p className="fs-16">投资人信息</p>
                  <div className={styles.grayBlock}>
                    <Row gutter={20} className={styles.row}>
                      {this.setInfo([
                        ['投资人姓名：', '张某某'],
                        ['证件类型', '身份证 - 430528********4587'],
                        ['承担责任方式：', '方式文本'],
                        ['出资方式：', '货币'],
                        ['认缴出资额：', '10,000,000'],
                        ['认缴出资额比例：', '比例文本'],
                        ['缴付期限：', '期限文本'],
                        ['住所', '显示具体的地址内容'],
                      ])}
                    </Row>
                  </div>
                  <InfoTitle
                    type="其他信息"
                    style={{ paddingTop: '20px' }}
                    className={styles.rowBorder}
                  />
                  <p className={classNames('fs-16', 'mb-10')}>主要负责人（1）从业经历介绍</p>
                  <div className={classNames(styles.grayBlock, 'fs-14')}>
                    <Row gutter={20} className={styles.row}>
                      <Col className={styles.col} span={24}>
                        具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域
                      </Col>
                    </Row>
                  </div>
                  <p className={classNames('fs-16', 'mb-10')}>主要负责人（2）从业经历介绍</p>
                  <div className={classNames(styles.grayBlock, 'fs-14')}>
                    <Row gutter={20} className={styles.row}>
                      <Col className={styles.col} span={24}>
                        具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域
                      </Col>
                    </Row>
                  </div>
                  <p className={classNames('fs-16', 'mb-10')}>其他主要负责人介绍</p>
                  <div className={classNames(styles.grayBlock, 'fs-14')}>
                    <Row gutter={20} className={styles.row}>
                      <Col className={styles.col} span={24}>
                        具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域
                      </Col>
                    </Row>
                  </div>
                  <p className={classNames('fs-16', 'mb-10')}>股东背景介绍</p>
                  <div className={classNames(styles.grayBlock, 'fs-14')}>
                    <Row gutter={20} className={styles.row}>
                      <Col className={styles.col} span={24}>
                        具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域
                      </Col>
                    </Row>
                  </div>
                  <p className={classNames('fs-16', 'mb-10')}>关注的项目阶段</p>
                  <div className={classNames(styles.grayBlock, 'fs-14')}>
                    <Row gutter={20} className={styles.row}>
                      <Col className={styles.col} span={24}>
                        具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域
                      </Col>
                    </Row>
                  </div>
                  <Row gutter={20} className={styles.row}>
                    <Col className={styles.col} span={24}>
                      <div style={{ width: '168px' }}>从业人员数量：</div>
                      <div className={styles.right}>235人</div>
                    </Col>
                    <Col className={styles.col} span={24}>
                      <div style={{ width: '168px' }}>投资所关注行业市场类型：</div>
                      <div className={styles.right}>类型类型类型</div>
                    </Col>
                    <Col className={styles.col} span={24}>
                      <div style={{ width: '168px' }}>投资获得收益方式：</div>
                      <div className={styles.right}>方式方式</div>
                    </Col>
                    <Col className={styles.col} span={24}>
                      <div style={{ width: '168px' }}>附件：</div>
                      <div className={classNames(styles.right, styles.attachment)}>
                        <Row gutter={20}>
                          <Col span={6}>
                            <img src={attachment} alt="附件" />
                          </Col>
                          <Col span={6}>
                            <span className={styles.attachmentName}>
                              <i className={styles.word} />
                              文档.doc
                            </span>
                          </Col>
                          <Col span={6}>
                            <span className={styles.attachmentName}>
                              <i className={styles.pdf} />
                              文档.pdf
                            </span>
                          </Col>
                          <Col span={6}>
                            <span className={styles.attachmentName}>
                              <i className={styles.xls} />
                              文档.xls
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <p className={classNames('fs-16', 'mb-10')}>备注</p>
                  <div className={classNames(styles.grayBlock, 'fs-14')}>
                    <Row gutter={20} className={styles.row}>
                      <Col className={styles.col} span={24}>
                        具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域具体的介绍内容展示区域
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="fs-24">确认设立内容</div>
                <div className={styles.detailContent}>
                  <Row gutter={20} className={styles.row}>
                    <Col className={styles.col} span={12}>
                      <div>申请企业名称：</div>
                      <div className={styles.right}>我是申请的企业名称</div>
                    </Col>
                    <Col className={styles.col} span={12}>
                      <div>注册地址：</div>
                      <div className={styles.right}>具体的地址名称内容具体的地址名称内容</div>
                    </Col>
                    <Col className={styles.col} span={12}>
                      <div>名称核准书：</div>
                      <div className={styles.right}>我是申请的企业名称</div>
                    </Col>
                    <Col className={styles.col} span={12}>
                      <div>注册地址租赁协议：</div>
                      <div className={styles.right}>具体的地址名称内容具体的地址名称内容</div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div />
              {showIsAudit && (
                <div>
                  <div className={styles.newEtpInfo}>
                    <div className={styles.detailContent}>
                      <InfoTitle type="审核操作" />
                    </div>
                  </div>
                  <Form
                    onSubmit={this.handleSubmit}
                    style={{ marginTop: '1.1%' }}
                    layout="vertical"
                  >
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
                                  paddingRight: 61,
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
                                  paddingRight: 61,
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
              )}
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
                        <b>登记办理</b>
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
