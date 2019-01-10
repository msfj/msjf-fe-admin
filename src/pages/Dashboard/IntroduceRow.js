import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import { ChartCard } from '@/components/Charts';
import numeral from 'numeral';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="区内注册企业总数"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={numeral(886).format('0,0')}
        contentHeight={46}
      />
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="企业总数"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        contentHeight={46}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="企业总注册资本金(美元/万元)"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(1550202012).format('0,0')}
        contentHeight={46}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="个人用户数"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total="782"
        contentHeight={46}
      />
    </Col>
  </Row>
));

export default IntroduceRow;
