import React from "react";
import { Layout, Space } from "antd";
import categoryMatrix from "./categoryMatrix";
import style from "./style/LwLayout.module.css";

const LwLayout = (props) => {
  const pageKey =
    props.pageKey && props.pageKey !== "" ? props.pageKey : "default";
  const direction =
    props.direction && props.direction !== "" ? props.direction : "vertical";
  const size = props.size && props.size !== "" ? props.size : "large";
  const wrap = props.wrap && props.wrap !== null ? props.wrap : true;
  const content =
    props.content && props.content !== {} ? (
      props.content
    ) : (
      <>Nothing to show on this page...</>
    );

  const className =
    pageKey === categoryMatrix.HOME
      ? style.lw_lwlayout_space_home
      : style.lw_lwlayout_space;

  return (
    <Layout>
      <Layout.Content>
        <div className={style.lw_top_placeholder}></div>
        <Space
          className={className}
          direction={direction}
          size={size}
          wrap={wrap}
        >
          {content}
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default LwLayout;
