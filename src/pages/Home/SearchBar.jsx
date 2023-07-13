import React, { useState } from "react";
import { Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./style/SearchBar.module.css";

const SearchBar = () => {
  const [searchType, setSearchType] = useState("google");

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
  };

  const searchTypeOptions = [
    {
      value: "google",
      label: "Google",
    },
    {
      value: "wikipedia",
      label: "Wikipedia",
    },
    {
      value: "youtube",
      label: "YouTube",
    },
    {
      value: "bilibili",
      label: "Bili Bili",
    },
    {
      value: "douban",
      label: "Douban",
    },
  ];

  const googleSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="http://www.google.com/search"
      method="get"
      target="_blank"
    >
      <input name="ie" value="UTF-8" type="hidden" />
      <input
        class={style.lw_hometopnav_search_input}
        placeholder="Search"
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

  const wikipediaSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://en.wikipedia.org/w/index.php"
      method="get"
      target="_blank"
    >
      <input
        class={style.lw_hometopnav_search_input}
        placeholder="Search"
        name="search"
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

  const youTubeSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://www.youtube.com/results"
      method="get"
      target="_blank"
    >
      <input
        class={style.lw_hometopnav_search_input}
        placeholder="Search"
        name="search_query"
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

  const biliBiliSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://search.bilibili.com/all"
      method="get"
      target="_blank"
    >
      <input
        class={style.lw_hometopnav_search_input}
        placeholder="Search"
        name="keyword"
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

  const doubanSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://search.douban.com/movie/subject_search"
      method="get"
      target="_blank"
    >
      <input
        class={style.lw_hometopnav_search_input}
        placeholder="Search"
        name="search_text"
        type="text"
      />
      <input name="cat" value="1002" type="hidden" />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined class={style.lw_hometopnav_search_icon} />}
        size="large"
      />
    </form>
  );

  return (
    <>
      <Select
        className={style.lw_hometopnav_selector}
        defaultValue={searchType}
        bordered={false}
        onChange={handleSearchTypeChange}
        options={searchTypeOptions}
        size="large"
      />
      {searchType === "google" && googleSearchForm}
      {searchType === "wikipedia" && wikipediaSearchForm}
      {searchType === "youtube" && youTubeSearchForm}
      {searchType === "bilibili" && biliBiliSearchForm}
      {searchType === "douban" && doubanSearchForm}
    </>
  );
};

export default SearchBar;
