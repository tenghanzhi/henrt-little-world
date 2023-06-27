import React from "react";
import { Layout, Space, ConfigProvider } from "antd";
import categoryMatrix from "./categoryMatrix";
import style from "./style/LwLayout.module.css";

const LwLayout = (props) => {
  const pageKey =
    props.pageKey && props.pageKey !== "" ? props.pageKey : "default";
  const direction =
    props.direction && props.direction !== "" ? props.direction : "vertical";
  const size = props.size && props.size !== "" ? props.size : "large";
  const wrap = props.wrap && props.wrap !== null ? props.wrap : true;
  const pageContent =
    props.content && props.content !== {} ? (
      props.content
    ) : (
      <>Hello World...</>
    );

  const className =
    pageKey === categoryMatrix.HOME
      ? style.lw_lwlayout_space_home
      : style.lw_lwlayout_space;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#212121",
          colorBgBase: "#171717",
          colorInfo: "#171717",
          colorBgSpotlight: "#212121",
          colorTextBase: "rgba(255, 255, 255, 0.65)",
          colorText: "rgba(255, 255, 255, 0.65)",
          colorLink: "#FFFFFF",
          colorLinkHover: "#FFFFFF",
        },
      }}
    >
      <Layout className={style.lw_lwlayout_wrapper}>
        <Layout.Content>
          <div className={style.lw_lwlayout_top_placeholder}></div>
          <Space
            className={className}
            direction={direction}
            size={size}
            wrap={wrap}
            align={
              pageKey === categoryMatrix.APPLICATIONS ||
              pageKey === categoryMatrix.LEETCODES ||
              pageKey === categoryMatrix.COMPONENTS ||
              pageKey === categoryMatrix.FAVORITES ||
              pageKey === categoryMatrix.PORTFOLIO ||
              pageKey === categoryMatrix.HOME
                ? "center"
                : null
            }
          >
            {pageContent}
          </Space>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

export default LwLayout;
