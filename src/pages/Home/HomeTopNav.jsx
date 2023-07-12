import React from "react";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./style/HomeTopNav.module.css";

const HomeTopNav = () => {
  const quickLinkData = useSelector((state) => state.quickLinkData);

  const handleQuickLinkClick = (link) => {
    let url;

    if (link.indexOf("//") < 0) {
      url = "http://" + link;
    } else url = link;

    window.open(url);
  };

  return (
    <div className={style.lw_hometopnav}>
      <form
        className={style.lw_hometopnav_google_search}
        action="http://www.google.com/search"
        method="get"
        target="_blank"
      >
        <input name="ie" value="UTF-8" type="hidden" />
        <input
          class={style.lw_hometopnav_search_input}
          placeholder="Google Search"
          name="q"
          type="text"
        />
        <Button
          className={style.lw_hometopnav_search_btn}
          type="text"
          htmlType="submit"
          icon={<SearchOutlined class={style.lw_hometopnav_search_icon} />}
          size="large"
        />
      </form>
      {quickLinkData.data.length !== 0 && (
        <Space className={style.lw_hometopnav_quicklinks} wrap>
          <span className={style.lw_hometopnav_quicklinks_title}>
            Quick Links:
          </span>
          {quickLinkData.data.map((item) => {
            return (
              <Button
                type="link"
                block
                onClick={() => handleQuickLinkClick(item.attributes.link)}
              >
                {item.attributes.name
                  ? item.attributes.name
                  : item.attributes.link}
              </Button>
            );
          })}
        </Space>
      )}
    </div>
  );
};

export default HomeTopNav;
