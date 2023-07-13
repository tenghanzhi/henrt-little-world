import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./style/SearchBar.module.css";

const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
