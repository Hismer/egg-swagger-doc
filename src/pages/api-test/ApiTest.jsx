import React from "react";
import { connect } from "dva";
import { Select, Row, Col, Button } from "antd";
import MyTestForm from "./TestForm";
import { FormattedMessage } from "react-intl";

const Option = Select.Option;

function ApiTest(props) {
  const {
    DocInfoModel: { clickedApi },
    showDrawer
  } = props;
  if (!clickedApi) {
    return (
      <h1
        style={{
          height: "100%",
          width: 30,
          margin: "40px auto",
          color: "#8c8c8c"
        }}
      >
        请先选择一个待调试接口
      </h1>
    );
  }

  // 解析URL
  const { basePath, path } = clickedApi;
  let showUrl = basePath;
  if (/\/$/.test(basePath) && /^\//.test(path)) {
    showUrl += path.substr(1);
  } else {
    showUrl += path;
  }

  return (
    <div>
      <h3>
        <strong className={clickedApi.method.toLowerCase()}>
          {clickedApi.method ? clickedApi.method.toUpperCase() : ""}
        </strong>
        <span>{showUrl}</span>
      </h3>
      {showDrawer ? <MyTestForm clickedApi={clickedApi} /> : undefined}
    </div>
  );
}

export default connect(state => ({
  DocInfoModel: state.DocInfoModel,
  showDrawer: state.IndexModel.showDrawer
}))(ApiTest);
