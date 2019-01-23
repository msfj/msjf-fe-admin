import React, { Component } from 'react';
import { Card, Row, Button, Radio, List, Col, Input, Icon, Checkbox, Tree, Tabs } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import { FormattedMessage } from 'umi/locale';
import styles from './PermissionSet.less';

// const { Meta } = Card;
const { Search } = Input;
const { TreeNode } = Tree;
const RadioGroup = Radio.Group;
const { TabPane } = Tabs;

const treeData1 = [
  {
    title: '梅山保税区港委会',
    key: '0-0',
    children: [
      { title: '金融产业发展中心', key: '0-0-0' },
      { title: '投资合作局', key: '0-0-1' },
      { title: '口岸事务管理局', key: '0-0-2' },
      { title: '海洋科技文化促进局', key: '0-0-3' },
      { title: '休闲旅游产业发展中心', key: '0-0-4' },
    ],
  },
  {
    title: '梅山街道',
    key: '0-1',
    children: [],
  },
  {
    title: '对应单位局领导',
    key: '0-2',
    children: [],
  },
  {
    title: '金融管理科',
    key: '0-3',
    children: [],
  },
  {
    title: '市场监督管理局',
    key: '0-4',
    children: [],
  },
];

const treeData = [
  {
    title: '管理中心',
    key: '0-0',
    children: [
      { title: '客户管理', key: '0-0-0' },
      { title: '用户管理', key: '0-0-1' },
      { title: '权限管理', key: '0-0-2' },
    ],
  },
  {
    title: '征审中心',
    key: '0-1',
    children: [
      { title: '待办任务管理', key: '0-1-0' },
      { title: '当前审核管理', key: '0-1-1' },
      { title: '历史审核管理', key: '0-1-2' },
    ],
  },
];

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
generateList(treeData);

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

const dataRole = ['系统管理员', '招商部门对接员', '金融监督员', '招商部门分管领导', '登记办理员'];
const dataJob = ['谢永泰', '赵薇', '王洪', '赵刚', '田雨'];
class Permission extends Component {
  state = {
    loading: false,
    // activeKey: 0,
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  componentDidMount() {
    /* setTimeout(() => {
      this.setState({ loading: false });
    }, 1000); */
  }

  /* haddleProcessChange = key => {
    this.setState({
      activeKey: key,
    });
  }; */

  /* static onChange(value) {
    console.log(value);
  } */

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    // console.log(e);
    const {
      target: { value },
    } = e;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
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

  onChange1 = e => {
    // console.log(e);
    const {
      target: { value },
    } = e;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData1);
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
  /* createTree(checkable) {
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
  } */

  render() {
    const { loading, expandedKeys, autoExpandParent, searchValue } = this.state;
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
      <PageHeaderWrapper>
        <GridContent>
          <div
            style={{ marginLeft: -12, marginRight: -12, marginTop: -12 }}
            className={styles.buttonColor}
          >
            <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="角色菜单权限" key="1">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col lg={6} md={24}>
                      <Search
                        style={{ marginBottom: 8 }}
                        placeholder="输入角色名称"
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
                      <div>
                        <Search
                          style={{ marginBottom: 8 }}
                          placeholder="输入菜单名称"
                          onChange={this.onChange}
                        />
                        <Tree
                          onExpand={this.onExpand}
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                          checkable="true"
                        >
                          {loop(treeData)}
                        </Tree>
                      </div>
                    </Col>
                    <Col lg={6} md={24}>
                      <Button type="primary">授取菜单权限</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="用户角色权限" key="2" style={{ paddingBottom: 30 }}>
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col lg={6} md={24} xs={24}>
                      <div>
                        <Search
                          style={{ marginBottom: 8 }}
                          placeholder="输入机构名称"
                          onChange={this.onChange1}
                        />
                        <Tree
                          onExpand={this.onExpand}
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                        >
                          {loop(treeData1)}
                        </Tree>
                      </div>
                    </Col>
                    <Col lg={6} md={24} xs={24}>
                      <Search
                        style={{ marginBottom: 8 }}
                        placeholder="输入员工名称"
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
                        placeholder="输入角色名称"
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
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Permission;
