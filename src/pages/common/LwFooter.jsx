import React from "react";
import { useSelector } from "react-redux";
import { Layout, Divider } from "antd";
import style from "./style/LwFooter.module.css";

const LwFooter = () => {
  const showHomeFooter = useSelector((state) => state.showHomeFooter);

  return (
    <Layout.Footer className={style.lw_footer_wrapper}>
      {showHomeFooter && (
        <>
          <Divider className={style.lw_footer_devider} />
          <div className={style.lw_footer_content}>Henry's Little World</div>
          <div className={style.lw_footer_content}>
            Est. 05.15.2023 with Katherine.
          </div>
        </>
      )}
    </Layout.Footer>
  );
};

export default LwFooter;
