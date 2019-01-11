import analysis from './zh-CN/analysis';
import exception from './zh-CN/exception';
import form from './zh-CN/form';
import globalHeader from './zh-CN/globalHeader';
import login from './zh-CN/login';
import menu from './zh-CN/menu';
import monitor from './zh-CN/monitor';
import result from './zh-CN/result';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pwa from './zh-CN/pwa';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.home.introduce': '介绍',
  'app.forms.basic.title': '基础表单',
  'app.forms.basic.description':
    '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
  'app.process.processdesign.title': '流程设计',
  'app.process.processinitlist.title': '流程发起',
  'app.process.processinit.title': '流程发起1',
  'app.process.processtask.title': '待办任务查询',
  'app.process.processaudit.title': '流程审核',
  'app.process.processlist.title': '流程列表',
  'app.process.processquery.title': '流程查询',
  'app.account1.userSet.title': '用户设置',
  'app.account1.bUserSet.title': '业务用户设置',
  'app.account1.permssion.title': '权限设置',
  'app.process.processdetail.title': '流程详情',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
};
