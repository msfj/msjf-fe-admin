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
    console.log(notice);

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
        <RadioGroup defaultValue="0">
          <RadioButton value="0">全部</RadioButton>
          <RadioButton value="1">企业拟设立</RadioButton>
          <RadioButton value="2">企业确认设立</RadioButton>
          <RadioButton value="3">企业变更</RadioButton>
          <RadioButton value="4">企业迁入</RadioButton>
          <RadioButton value="5">企业注销</RadioButton>
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
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ height: 391, padding: 0 }}
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="待办任务"
              bordered={false}
              loading={projectLoading}
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
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="审核指数 （每月）"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
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
              renderItem={item => (
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
              )}
            />
          </Card>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
