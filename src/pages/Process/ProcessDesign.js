import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, List, Icon, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProcessDesign.less';

const { Meta } = Card;

@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
class ProcessDesign extends Component {
  state = {
    activeKey: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'process/fetchModalList',
    });
  }

  haddleProcessChange = key => {
    this.setState({
      activeKey: key,
    });
  };

  render() {
    const { activeKey } = this.state;
    const {
      process: { modalList },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <GridContent>
          <Row gutter={12}>
            <Col lg={7} md={24}>
              <Card
                title="模型列表"
                bordered={false}
                style={{ marginBottom: 24 }}
                loading={loading}
              >
                <List
                  bordered
                  dataSource={modalList}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      onClick={() => this.haddleProcessChange(item.id)}
                      className={activeKey === item.id ? 'active' : ''}
                    >
                      <Icon type="setting" theme="twoTone" spin className={styles.icon} />
                      <span>{item.name}</span>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col lg={17} md={24}>
              <Card
                bordered={false}
                style={{ height: '400px' }}
                title={
                  <Meta
                    avatar={<Icon type="setting" theme="twoTone" className={styles.iconLg} />}
                    title="模型1"
                    description="版本1.0.0"
                  />
                }
              >
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary">
                    部署模型
                  </Button>
                  <Button icon="edit" type="primary">
                    编辑模型
                  </Button>
                  <Button icon="delete" type="primary">
                    删除模型
                  </Button>
                  <Button icon="import" type="primary">
                    导入模型
                  </Button>
                  <Button icon="export" type="primary">
                    导出模型
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default ProcessDesign;
