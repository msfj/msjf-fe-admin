import { parse } from 'url';

// mock process data
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    /* key: i + 1,
    processInstanceId: Math.floor(Math.random() * 1000),
    flowType: '0',
    flowName: '企业设立',
    actName: `金服人员审核 ${i}`,
    title: '主题',
    desc: `请对企业设立${i}审核`,
    startTime: '20181223190000',
    endTime: '20181226190000',
    assigneeName: 'admin',
    approve: Math.floor(Math.random() * 10) % 3,
    auditinfo: '意见',
    phone: '17190308842',
    files: {
      url: '/',
      fileName: '企业设立流程附件',
    },
    bexno: Math.floor(Math.random() * 1000),
    processname: '企业设立',
    funcname: `金服人员审核 ${i}`,
    checkflagname: '是', */
    userName: `金服人员审核 ${i}`,
    certificateType: '身份证',
    number: '33xxxxxxxxxxxxxxxx',
    phone: '18xxxxxxxx',
    email: '41xxxxxxxxx',
    account: 'wwdwdqd',
    userType: '企业',
    status: '正常',
  });
}

function getProcess(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postProcess(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/account1': getProcess,
  'POST /api/account1': postProcess,
  /* 'GET /api/process/modal': mockjs.mock({
    'modalList|5-20': [{ name: '流程@id', id: '@id', 'type|0-2': 1 }], 
  }), */
};
