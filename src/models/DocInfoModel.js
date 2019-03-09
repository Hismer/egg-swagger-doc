import apiService from "@services/ApiService";
import Util from "@util/Util";
import { notification } from "antd";
import apiRemoteService from "@services/ApiRemoteService";
import docResponseConvert from "@help/DocServerDataConvertHelp";
import ApiUtil from "@util/AxiosUtil.js";

export default {
  namespace: "DocInfoModel",
  state: {
    docUrlSuffix: "",
    docUrlHttpType: "", // 1.表示'http://' ,2.表示'https://'
    clickedApi: null,
    simpleDocInfo: null,
    apiInfoMap: null
  },
  reducers: {
    fitDocInfo(state, action) {
      const {
        payload: {
          docInfo: { simpleDocInfo, apiInfoMap, clickedApi }
        }
      } = action;
      return {
        ...state,
        simpleDocInfo,
        apiInfoMap,
        clickedApi
      };
    },
    clearDocInfo(state) {
      const simpleDocInfo = null;
      const apiInfoMap = null;
      const clickedApi = null;
      return {
        ...state,
        clickedApi,
        simpleDocInfo,
        apiInfoMap
      };
    },
    fitClickedApi(state, action) {
      const clickedApi = action.payload;
      return {
        ...state,
        clickedApi
      };
    }
  },
  effects: {
    *findClickedApi(action, { put, select }) {
      const apiKey = action.payload;
      let apiInfoMap = yield select(
        state => state["DocInfoModel"]["apiInfoMap"]
      );
      let simpleDocInfo = yield select(
        state => state["DocInfoModel"]["simpleDocInfo"]
      );

      const clickedApi = yield apiService.findClickApiInfo(apiKey, apiInfoMap);
      let newClickedApi = Object.assign({}, clickedApi, {
        basePath: simpleDocInfo.basePath
      });
      yield put({ type: "fitClickedApi", payload: newClickedApi });
    },

    *loadDocData({ payload }, { put, select, call }) {
      const { url, apiKey } = payload;
      try {
        const docInfo = yield apiService.docSearch$(url);
        console.log("docInfo", docInfo);
        let clickedApi = null;
        if (Util.strNotBlank(apiKey)) {
          clickedApi = yield apiService.findClickApiInfo(
            apiKey,
            docInfo.apiInfoMap
          );
          clickedApi.basePath = docInfo.simpleDocInfo.basePath;
        }
        docInfo["clickedApi"] = clickedApi;
        const payload = { docInfo };
        yield put({ type: "fitDocInfo", payload: payload });
      } catch (e) {
        console.log(e);
        yield put({ type: "clearDocInfo" });
        notification["error"]({
          message: "接口文档获取异常",
          description: e.message
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: "loadDocData", payload: { url: "swagger.json" } });
    }
  }
};
