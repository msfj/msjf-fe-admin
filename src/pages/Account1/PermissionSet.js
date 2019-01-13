import React, { Component } from 'react';
import { Card, Row, Button, Radio, List, Col, Input, Icon, Checkbox, Tree, Tabs } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import styles from './PermissionSet.less';

// const { Meta } = Card;
const { Search } = Input;
const { TreeNode } = Tree;
const RadioGroup = Radio.Group;
const { TabPane } = Tabs;
const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i += 1) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
  return 1;
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i += 1) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const dataRole = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const dataJob = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
class Permission extends Component {
  state = {
    loading: true,
    // activeKey: 0,
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
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

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    console.log(e);
    const {
      target: { value },
    } = e;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  createTree(checkable) {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title} />;
      });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          checkable={checkable}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <PageHeaderWrapper title={<FormattedMessage id="app.account1.permssionset.title" />}>
        <GridContent>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="角色菜单权限" key="1">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col lg={6} md={24}>
                    <Search
                      style={{ marginBottom: 8 }}
                      placeholder="Search"
                      onSearch={this.handleSearch}
                    />
                    <RadioGroup name="roleName">
                      <List
                        bordered={false}
                        dataSource={dataRole}
                        renderItem={item => (
                          <List.Item>
                            <Radio value={item} />
                            <div className={styles.iconlist}>
                              <Icon type="user" />
                            </div>
                            {item}
                          </List.Item>
                        )}
                      />
                    </RadioGroup>
                  </Col>
                  <Col lg={6} md={24}>
                    <div>{this.createTree(true)}</div>
                  </Col>
                  <Col lg={6} md={24}>
                    <Button type="primary">授取菜单权限</Button>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="用户角色权限" key="2">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col lg={6} md={24} xs={24}>
                    <div>{this.createTree()}</div>
                  </Col>
                  <Col lg={6} md={24} xs={24}>
                    <Search
                      style={{ marginBottom: 8 }}
                      placeholder="Search"
                      onSearch={this.handleSearch}
                    />
                    <RadioGroup name="jobName">
                      <List
                        bordered={false}
                        dataSource={dataJob}
                        renderItem={item => (
                          <List.Item>
                            <Radio value={item} />
                            <div className={styles.iconlist}>
                              <Icon type="user" />
                            </div>
                            {item}
                          </List.Item>
                        )}
                      />
                    </RadioGroup>
                  </Col>
                  <Col lg={6} md={24} xs={24}>
                    <Search
                      style={{ marginBottom: 8 }}
                      placeholder="Search"
                      onSearch={this.handleSearch}
                    />
                    <List
                      bordered={false}
                      dataSource={dataRole}
                      renderItem={item => (
                        <List.Item>
                          <Checkbox />
                          <div className={styles.iconlist}>
                            <Icon type="user" />
                          </div>
                          {item}
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col lg={6} md={24} xs={24}>
                    <Button type="primary">授权角色</Button>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Permission;
