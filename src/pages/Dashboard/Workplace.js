import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar, Radio, Input, Progress } from 'antd';

import { Radar } from '@/components/Charts';
// import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Workplace.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const dic = ['企业拟设立', '企业确认设立', '企业变更', '企业迁入', '企业注销', ''];

const list = [
  {
    logo: '',
    subDescription: '企业拟设立',
    title: '宁波梅山保税港区荣浪云商电子商务有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
    per: '曹韬',
  },
  {
    logo: '',
    subDescription: '企业拟设立',
    title: '宁波梅山保税港区无尾熊电子商务有限公司',
    start: new Date(),
    end: new Date(),
    status: 'normal',
    percent: 70,
    per: '张蕾',
  },
  {
    logo: '',
    subDescription: '企业拟设立',
    title: '宁波梅山保税港区龙强投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'normal',
    percent: 80,
    per: '陈竹',
  },
  {
    logo: '',
    subDescription: '企业确认设立',
    title: '宁波梅山保税港区梅森贸易有限公司',
    start: new Date(),
    end: new Date(),
    status: 'normal',
    percent: 70,
    per: '吴章穆',
  },
  {
    logo: '',
    subDescription: '企业确认设立',
    title: '宁波梅山保税港区堃俍投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'exception',
    percent: 70,
    per: '徐云芳',
  },
  {
    logo: '',
    subDescription: '企业确认设立',
    title: '宁波梅山保税港区嘉信金诚投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'active',
    percent: 90,
    per: '孙路',
  },
  {
    logo: '',
    subDescription: '企业变更',
    title: '宁波梅山保税港区杰跃投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'exception',
    percent: 40,
    per: '郑珊',
  },
  {
    logo: '',
    subDescription: '企业变更',
    title: '宁波梅山保税港区星颐投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'normal',
    percent: 50,
    per: '杜娟',
  },
  {
    logo: '',
    subDescription: '企业变更',
    title: '宁波梅山保税港区湘矽投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'exception',
    percent: 90,
    per: '李侠',
  },
  {
    logo: '',
    subDescription: '企业迁入',
    title: '宁波梅山保税港区臻昳投资有限公司',
    start: new Date(),
    end: new Date(),
    status: 'active',
    percent: 50,
    per: '王龙',
  },
  {
    logo: '',
    subDescription: '企业迁入',
    title: '宁波梅山保税港区梁悦投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'active',
    percent: 50,
    per: '郭孟鸿',
  },
  {
    logo: '',
    subDescription: '企业迁入',
    title: '宁波梅山保税港区诚启创业投资有限公司',
    start: new Date(),
    end: new Date(),
    status: 'active',
    percent: 50,
    per: '姚玮',
  },
  {
    logo: '',
    subDescription: '企业注销',
    title: '宁波梅山保税港区顺势明道投资管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
    per: '杨钧迪',
  },
  {
    logo: '',
    subDescription: '企业注销',
    title: '宁波梅山保税港区金镗企业管理咨询有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
    per: '朱耀军',
  },
  {
    logo: '',
    subDescription: '企业注销',
    title: '宁波梅山保税港区坤七资产管理有限公司',
    start: new Date(),
    end: new Date(),
    status: 'success',
    percent: 100,
    per: '洪涛',
  },
];
const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 5,
  total: 50,
};

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

@connect(({ user, project, activities, chart, loading }) => ({
  currentUser: user.currentUser,
  project,
  activities,
  chart,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
class Workplace extends PureComponent {
  state = {
    value: 5,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  static renderActivities() {
    /* const {
      activities: { list },
    } = this.props; */
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      chart: { radarData },
    } = this.props;
    const { value } = this.state;
    console.log(radarData);
    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

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

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>企业用户</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>个人用户</p>
          <p>24</p>
        </div>
        <div className={styles.statItem}>
          <p>注册资本金（人民币）</p>
          <p>2223万</p>
        </div>
        <div className={styles.statItem}>
          <p>注册资本金（美元）</p>
          <p>22万</p>
        </div>
        <div className={styles.statItem}>
          <p>企业数量</p>
          <p>20</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <div
          style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
          className={styles.buttonColor}
        >
          <Row gutter={24}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
              <Card
                bodyStyle={{ padding: 0, background: '#f1f1f1' }}
                className={styles.projectList}
                style={{ marginBottom: 24 }}
                title="待办任务"
                bordered={false}
                loading={projectLoading}
              >
                {notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}>
                    <Link to={item.href}>
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
                        </div>
                        <div className={styles.projectItemContent}>
                          <Link to={item.memberLink}>{item.member[1].men || ''}</Link>
                          {item.member[1].updatedAt && (
                            <span className={styles.datetime} title={item.member[1].updatedAt}>
                              {moment(item.member[1].updatedAt).fromNow()}
                            </span>
                          )}
                        </div>
                        <div className={styles.projectItemContent}>
                          <Link to={item.memberLink}>{item.member[2].men || ''}</Link>
                          {item.member[2].updatedAt && (
                            <span className={styles.datetime} title={item.member[0].updatedAt}>
                              {moment(item.member[2].updatedAt).fromNow()}
                            </span>
                          )}
                        </div>
                      </Card>
                    </Link>
                  </Card.Grid>
                ))}
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                style={{ marginBottom: 24 }}
                bordered={false}
                title="审核数量 （每月）"
                loading={radarData.length === 0}
              >
                <div className={styles.chart}>
                  <Radar hasLegend height={343} data={radarData} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: -24 }}>
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

export default Workplace;
