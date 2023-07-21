import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import ClockCalendar from "./ClockCalendar";
import SearchBar from "./SearchBar";
import QuickLink from "./QuickLink";
import style from "./style/HomeTopNav.module.css";

const HomeTopNav = () => {
  const userInfoData = useSelector((state) => state.userInfoData);
  const quickLinkData = useSelector((state) => state.quickLinkData);
  const showHomeDate = useSelector((state) => state.showHomeDate);
  const showHomeSearch = useSelector((state) => state.showHomeSearch);
  const showHomeQuickLink = useSelector((state) => state.showHomeQuickLink);

  return (
    <div className={style.lw_hometopnav}>
      {showHomeDate && <ClockCalendar />}
      {showHomeSearch && <SearchBar />}
      {quickLinkData.data.length !== 0 && showHomeQuickLink && <QuickLink />}
      {(!userInfoData.jwt || quickLinkData.data.length === 0) &&
        showHomeQuickLink && (
          <Space className={style.lw_hometopnav_tip} wrap>
            Tips: Logged-in user can create Quick Links from user management
            page and leave message on Bulletin Board.
          </Space>
        )}
    </div>
  );
};

export default HomeTopNav;
