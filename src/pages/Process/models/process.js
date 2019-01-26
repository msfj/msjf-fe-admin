import { queryProcesslist, queryModalList, queryProcessQuery } from '@/services/api';

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
    *fetchList({ payload }, { call, put }) {
      // const { pagination: { pageSize, current } } = payload;
      const response = yield call(queryProcesslist, payload);
      yield put({
        type: 'getProcessList',
        payload: {
          list: response.data,
          // pagination: {
          //   pageSize,
          //   current,
          //   total: response.data.length,
          // }
        },
      });
    },
    *fetchQuery({ payload }, { call, put }) {
      const response = yield call(queryProcessQuery, payload);
      yield put({
        type: 'getProcessList',
        payload: {
          list: response.data,
          // pagination: {
          //   pageSize,
          //   current,
          //   total: response.data.length,
          // }
        },
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
