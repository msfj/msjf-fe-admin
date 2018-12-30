/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Card, Row, Col } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProcessDesign.less';

class ProcessDesign extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        className={styles.less}
        title={<FormattedMessage id="app.process.processdesign.title" />}
      >
        <GridContent>
          <Row gutter={24}>
            <Col lg={7} md={24}>
              <Card title="模型列表" bordered={false} style={{ marginBottom: 24 }}>
                left
              </Card>
            </Col>
            <Col lg={17} md={24}>
              <Card title="测试.BPMN20.XML.BPMN20.XML" bordered={false}>
                right
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default ProcessDesign;
