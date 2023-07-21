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
      value: "stackoverflow",
      label: "StackOverflow",
    },
    {
      value: "leetcode",
      label: "LeetCode",
    },
    {
      value: "opensourceui",
      label: "OpenSourceUI",
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
        className={style.lw_hometopnav_search_input}
        placeholder="Search on Google"
        name="q"
        type="text"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
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
        className={style.lw_hometopnav_search_input}
        placeholder="Search on Wikipedia"
        name="search"
        type="text"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
        size="large"
      />
    </form>
  );

  const stackOverflowSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://stackoverflow.com/search"
      method="get"
      target="_blank"
    >
      <input
        className={style.lw_hometopnav_search_input}
        placeholder="Search on Stack Overflow"
        name="q"
        type="text"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
        size="large"
      />
    </form>
  );

  const leetCodeSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://leetcode.cn/problemset/all/"
      method="get"
      target="_blank"
    >
      <input
        className={style.lw_hometopnav_search_input}
        placeholder="Search on LeetCode"
        name="search"
        type="text"
      />
      <input
        className={style.lw_hometopnav_search_input}
        name="page"
        value={1}
        type="hidden"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
        size="large"
      />
    </form>
  );

  const openSourceUiSearchForm = (
    <form
      className={style.lw_hometopnav_search}
      action="https://uiverse.io/all"
      method="get"
      target="_blank"
    >
      <input
        className={style.lw_hometopnav_search_input}
        placeholder="Search on Open Source UI"
        name="search"
        type="text"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
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
        className={style.lw_hometopnav_search_input}
        placeholder="Search on YouTube"
        name="search_query"
        type="text"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
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
        className={style.lw_hometopnav_search_input}
        placeholder="Search on Bili Bili"
        name="keyword"
        type="text"
      />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
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
        className={style.lw_hometopnav_search_input}
        placeholder="Search on Douban Movie"
        name="search_text"
        type="text"
      />
      <input name="cat" value="1002" type="hidden" />
      <Button
        className={style.lw_hometopnav_search_btn}
        type="text"
        htmlType="submit"
        icon={<SearchOutlined className={style.lw_hometopnav_search_icon} />}
        size="large"
      />
    </form>
  );

  return (
    <div>
      <Select
        className={style.lw_hometopnav_selector}
        value={searchType}
        bordered={false}
        onChange={handleSearchTypeChange}
        options={searchTypeOptions}
        size="large"
      />
      {searchType === "google" && googleSearchForm}
      {searchType === "wikipedia" && wikipediaSearchForm}
      {searchType === "stackoverflow" && stackOverflowSearchForm}
      {searchType === "leetcode" && leetCodeSearchForm}
      {searchType === "opensourceui" && openSourceUiSearchForm}
      {searchType === "youtube" && youTubeSearchForm}
      {searchType === "bilibili" && biliBiliSearchForm}
      {searchType === "douban" && doubanSearchForm}
    </div>
  );
};

export default SearchBar;
