import { parse } from 'url';

// mock process data
let tableListDataSource = [
  {
    key: 0,
    userName: '宁波合家欢乐有限公司',
    certificateType: '营业执照',
    number: '91330206MA2AG2GB4B',
    phone: '15814567521',
    email: 'wjm1997@163.com',
    account: '91330206MA2AG2GB4B',
    userType: '企业',
    status: 0,
    department: '口岸事务管理局',
    workerName: '谢永泰',
    woekerAccount: 'xieyongtai',
    idNum: '33072118511200016',
    workerPhone: '19015821456',
    workerEmail: 'xeyongtai@163.com',
  },
  {
    key: 1,
    userName: '宁波龙行天下有限公司',
    certificateType: '营业执照',
    number: '91330206MA2AG2GB4C',
    phone: '15814567531',
    email: 'zhangwuji1997@163.com',
    account: '91330206MA2AG2GB4C',
    userType: '企业',
    status: 1,
    department: '投资合作局',
    workerName: '谢金',
    woekerAccount: 'xiejin',
    idNum: '33062118511200016',
    workerPhone: '1901534145',
    workerEmail: 'xiejin@163.com',
  },
  {
    key: 2,
    userName: '宁波花好月圆有限公司',
    certificateType: '营业执照',
    number: '91330206MA4GG2GB4C',
    phone: '15814567231',
    email: 'liuyonle1997@163.com',
    account: '91330206MA4GG2GB4C',
    userType: '企业',
    status: 2,
    department: '金融产业发展中心',
    workerName: '王用',
    woekerAccount: 'wangyong',
    idNum: '33062235511200016',
    workerPhone: '190153343456',
    workerEmail: 'wangyong@163.com',
  },
  {
    key: 3,
    userName: '宁波每益添有限公司',
    certificateType: '营业执照',
    number: '91330205WA4GG2GB4C',
    phone: '15814567223',
    email: 'liuHEnle1997@163.com',
    account: '91330205WA4GG2GB4C',
    userType: '企业',
    status: 3,
    department: '海洋科技文化促进局',
    workerName: '王伟',
    woekerAccount: 'wangwei',
    idNum: '33062235621200016',
    workerPhone: '190153343216',
    workerEmail: 'wangwei@163.com',
  },
  {
    key: 4,
    userName: '王丽',
    certificateType: '身份证',
    number: '33062118701040056',
    phone: '15829567223',
    email: 'wangli1997@163.com',
    account: '33062118701040056',
    userType: '自然人',
    status: 3,
    department: '休闲旅游产业发展中心',
    workerName: '王照',
    woekerAccount: 'wangwei',
    idNum: '33062235621200016',
    workerPhone: '190153343216',
    workerEmail: 'wangwei@163.com',
  },
  /* {
    department: '口岸事务管理局',
    workerName: '谢永泰',
    woekerAccount: 'xieyongtai',
    idNum: '33072118511200016',
    workerPhone: '19015821456',
    workerEmail: 'xeyongtai@163.com',
  }, */
];
/* for (let i = 0; i < 46; i += 1) {
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
    checkflagname: '是', 
    userName: `金服人员审核 ${i}`,
    bCertificateType: '身份证',
    bNumber: '33xxxxxxxxxxxxxxxx',
    phone: '18xxxxxxxx',
    email: '41xxxxxxxxx',
    account: 'wwdwdqd',
    userType: '企业',
    status: 0,
    department: 'spng',
  });
} */

function getStaff(req, res, u) {
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

  if (params.userName) {
    dataSource = dataSource.filter(data => data.userName.indexOf(params.userName) > -1);
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

function postStaff(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const {
    desc,
    method,
    userName,
    certificateType,
    key,
    number,
    phone,
    email,
    account,
    userType,
    name,
  } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        status: 0,
        userName,
        certificateType,
        number,
        phone,
        email,
        account,
        userType,
        // progress: Math.ceil(Math.random() * 100),
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
  'GET /api/getStaff': getStaff,
  'POST /api/getStaff': postStaff,
  /* 'GET /api/process/modal': mockjs.mock({
    'modalList|5-20': [{ name: '流程@id', id: '@id', 'type|0-2': 1 }], 
  }), */
};
