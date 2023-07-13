import React from "react";
import { useSelector } from "react-redux";
import ClockCalendar from "./ClockCalendar";
import SearchBar from "./SearchBar";
import QuickLink from "./QuickLink";
import style from "./style/HomeTopNav.module.css";

const HomeTopNav = () => {
  const quickLinkData = useSelector((state) => state.quickLinkData);

  return (
    <div className={style.lw_hometopnav}>
      <ClockCalendar />
      <SearchBar />
      {quickLinkData.data.length !== 0 && <QuickLink />}
    </div>
  );
};

export default HomeTopNav;
