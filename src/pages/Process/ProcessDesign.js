import React, { Component } from 'react';
import { Card, Row, Col, List, Icon, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProcessDesign.less';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const { Meta } = Card;
class ProcessDesign extends Component {
  state = {
    loading: true,
    activeKey: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  haddleProcessChange = key => {
    this.setState({
      activeKey: key,
    });
  };

  render() {
    const { loading, activeKey } = this.state;
    return (
      <PageHeaderWrapper>
        <GridContent>
          <Row gutter={24}>
            <Col lg={7} md={24}>
              <Card
                title="模型列表"
                bordered={false}
                style={{ marginBottom: 24 }}
                loading={loading}
              >
                <List
                  bordered
                  dataSource={data}
                  renderItem={item => (
                    <List.Item
                      onClick={() => this.haddleProcessChange(item.id)}
                      className={activeKey === item.id ? 'active' : ''}
                    >
                      <Icon type="setting" theme="twoTone" spin className={styles.icon} />
                      <span>模型1</span>
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
