import { queryProcess, queryModalList } from '@/services/api';

export default {
  namespace: 'process',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    modalList: [],
  },

  effects: {
    *fetchModalList({ payload }, { call, put }) {
      const response = yield call(queryModalList, payload);
      yield put({
        type: 'haddleModalList',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProcess, payload);
      yield put({
        type: 'getProcessList',
        payload: response,
      });
    },
  },

  reducers: {
    haddleModalList(state, action) {
      return {
        ...state,
        modalList: action.payload.modalList,
      };
    },
    getProcessList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
