import React, { Component } from 'react';
import { Card, Row, Button, Radio, Cascader } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './permission.less';
import { FormattedMessage } from 'umi/locale';

/* const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]; */
// const { Meta } = Card;
// const Search = Input.Search;
const options = [
  {
    value: '运维人员',
    label: '运维人软',
    children: [
      {
        value: '用户管理',
        label: '用户管理',
        children: [
          {
            value: '用户设置',
            label: '用户设置',
          },
          {
            value: '用户权限设置',
            label: '用户权限设置',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
class Permission extends Component {
  state = {
    loading: true,
    // activeKey: 0,
    sel: '1',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  /* haddleProcessChange = key => {
    this.setState({
      activeKey: key,
    });
  }; */

  static onChange(value) {
    console.log(value);
  }

  handleChange = e => {
    this.setState({ sel: e.target.value });
  };

  render() {
    const { loading, sel, onChange } = this.state;
    return (
      <PageHeaderWrapper title={<FormattedMessage id="app.account1.permssionset.title" />}>
        <GridContent>
          <Card
            title="权限分类"
            extra={
              <div>
                <Radio.Group value={sel} onChange={this.handleChange} size="large">
                  <Radio.Button value="1">角色菜单权限</Radio.Button>
                  <Radio.Button value="0">用户角色权限</Radio.Button>
                </Radio.Group>
              </div>
            }
            bordered={false}
            style={{ marginBottom: 24 }}
            loading={loading}
          >
            <Row style={{ display: sel === '1' ? 'block' : 'none' }}>
              <Cascader
                style={{ width: '60%' }}
                options={options}
                onChange={onChange}
                changeOnSelect
              />
              <Button type="primary" style={{ marginLeft: 40 }}>
                授取菜单权限
              </Button>
            </Row>
            <Row style={{ display: sel === '0' ? 'block' : 'none' }}>111</Row>
          </Card>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Permission;
