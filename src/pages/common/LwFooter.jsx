import React from 'react';
import { Layout, Divider } from "antd";
import style from "./style/LwFooter.module.css";

const LwFooter = () => {
  return (
    <Layout.Footer className={style.lw_footer_wrapper}>
      <Divider className={style.lw_footer_devider}/>
      <div className={style.lw_footer_content}>Henry's Little World</div>
      <div className={style.lw_footer_content}>
        Created on May/15/2023 with Katherine.
      </div>
    </Layout.Footer>
  );
};

export default LwFooter;
