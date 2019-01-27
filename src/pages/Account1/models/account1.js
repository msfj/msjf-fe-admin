import {
  getClient,
  addClient,
  editClient,
  delClient,
  getBranch,
  editBranch,
  delBranch,
  getStaff,
  editStaff,
  delStaff,
  addAccount1,
  removeAccount1,
  updateRule,
} from '@/services/api';

export default {
  namespace: 'account1',

  state: {
    clientData: {
      list: [],
      pagination: {},
    },
    branchData: [],
    staffData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    // 客户
    *getClient({ payload }, { call, put }) {
      const response = yield call(getClient, payload);
      yield put({
        type: 'saveClient',
        payload: response,
      });
    },
    *addClient({ payload }, { call, put }) {
      const response = yield call(addClient, payload);
      yield put({
        type: 'saveClient',
        payload: response,
      });
    },
    *editClient({ payload }, { call, put }) {
      const response = yield call(editClient, payload);
      yield put({
        type: 'saveClient',
        payload: response,
      });
    },
    *delClient({ payload }, { call, put }) {
      const response = yield call(delClient, payload);
      yield put({
        type: 'saveClient',
        payload: response,
      });
    },

    // 部门
    *getBranch({ payload, callback }, { call, put }) {
      const response = yield call(getBranch, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *editBranch({ payload, callback }, { call, put }) {
      const response = yield call(editBranch, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delBranch({ payload, callback }, { call, put }) {
      const response = yield call(delBranch, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 员工
    *getStaff({ payload }, { call, put }) {
      const response = yield call(getStaff, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *editStaff({ payload }, { call, put }) {
      const response = yield call(editStaff, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *delStaff({ payload }, { call, put }) {
      const response = yield call(delStaff, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addAccount1, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeAccount1, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveClient(state, action) {
      return {
        ...state,
        clientData: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        staffData: action.payload,
      };
    },
  },
};
