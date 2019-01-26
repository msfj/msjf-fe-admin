import { stringify } from 'qs';
import request from '@/utils/request';

function getParams({ apiName, method, version, status, params }) {
  const param = {
    method,
    version: version || '1.0.0',
    api_name: apiName,
    status: status || 'oauth',
    timestamp: +new Date(),
    params: JSON.stringify(params || {}),
  };

  return {
    method: 'POST',
    body: param,
  };
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function accountLogin(params) {
  const param = getParams({
    params,
    apiName: 'setEmployeeLogin',
    method: 'employeeLogin',
    status: 'open',
  });
  return request('/api/real', param);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// process
export async function queryModalList() {
  return request(`/api/process/modal`);
}

export async function queryProcesslist(params) {
  const param = getParams({
    params,
    apiName: 'getPasTodo',
    method: 'queryTodoList',
  });
  return request('/api/real', param);
}

export async function queryProcessQuery(params) {
  const param = getParams({
    params,
    apiName: 'getPasHisList',
    method: 'queryPasHisList',
  });
  return request('/api/real', param);
}

// account1
export async function getStaff(params) {
  return request(`/api/getStaff?${stringify(params)}`);
}

export async function addAccount1(params) {
  return request('/api/account1', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function removeAccount1(params) {
  return request('/api/account1', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
