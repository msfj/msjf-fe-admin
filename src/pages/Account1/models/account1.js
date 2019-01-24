import { updateRule, getStaff, addAccount1, removeAccount1 } from '@/services/api';

export default {
  namespace: 'account1',

  state: {
    branchData: [],
    staffData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getStaff({ payload }, { call, put }) {
      const response = yield call(getStaff, payload);
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
    // *getBranch({ payload, callback }, { call, put }) {
    //   const response = yield call(addBranch, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *editBranch({ payload, callback }, { call, put }) {
    //   const response = yield call(addBranch, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *delBranch({ payload, callback }, { call, put }) {
    //   const response = yield call(addBranch, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        staffData: action.payload,
      };
    },
  },
};
