import React from "react";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
import style from "./style/QuickLink.module.css";

const QuickLink = () => {
  const quickLinkData = useSelector((state) => state.quickLinkData);

  const handleQuickLinkClick = (link) => {
    let url;
    if (link.indexOf("//") < 0) {
      url = "http://" + link;
    } else url = link;
    window.open(url);
  };

  return (
    <Space className={style.lw_hometopnav_quicklinks} wrap>
      <span className={style.lw_hometopnav_quicklinks_title}>Quick Links:</span>
      {quickLinkData.data.map((item) => {
        return (
          <Button
            type="link"
            block
            onClick={() => handleQuickLinkClick(item.attributes.link)}
          >
            {item.attributes.name ? item.attributes.name : item.attributes.link}
          </Button>
        );
      })}
    </Space>
  );
};

export default QuickLink;
