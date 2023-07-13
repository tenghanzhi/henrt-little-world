import React from "react";
import { useSelector } from "react-redux";
import ClockCalendar from "./ClockCalendar";
import SearchBar from "./SearchBar";
import QuickLink from "./QuickLink";
import style from "./style/HomeTopNav.module.css";

const HomeTopNav = () => {
  const quickLinkData = useSelector((state) => state.quickLinkData);
  const showHomeDate = useSelector((state) => state.showHomeDate);
  const showHomeSearch = useSelector((state) => state.showHomeSearch);
  const showHomeLink = useSelector((state) => state.showHomeLink);

  return (
    <div className={style.lw_hometopnav}>
      {showHomeDate && <ClockCalendar />}
      {showHomeSearch && <SearchBar />}
      {quickLinkData.data.length !== 0 && showHomeLink && <QuickLink />}
    </div>
  );
};

export default HomeTopNav;
