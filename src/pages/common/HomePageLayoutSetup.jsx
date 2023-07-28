import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Button, Tooltip } from "antd";
import { LayoutOutlined } from "@ant-design/icons";
import {
  SET_SHOW_HOME_CARD,
  SET_SHOW_HOME_DATE,
  SET_SHOW_HOME_SEARCH,
  SET_SHOW_HOME_LINK,
  SET_SHOW_HOME_MENU,
  SET_SHOW_HOME_QUICK_LINK,
  SET_SHOW_HOME_FOOTER,
} from "../../redux/constants";
import style from "./style/HomePageLayoutSetup.module.css";

const HomePageLayoutSetup = () => {
  const dispatch = useDispatch();
  const showHomeCard = useSelector((state) => state.showHomeCard);
  const showHomeDate = useSelector((state) => state.showHomeDate);
  const showHomeSearch = useSelector((state) => state.showHomeSearch);
  const showHomeLink = useSelector((state) => state.showHomeLink);
  const showHomeMenu = useSelector((state) => state.showHomeMenu);
  const showHomeQuickLink = useSelector((state) => state.showHomeQuickLink);
  const showHomeFooter = useSelector((state) => state.showHomeFooter);

  const handleTogleChange = (type, value) => {
    switch (type) {
      case "card":
        dispatch({ type: SET_SHOW_HOME_CARD, payload: value });
        break;
      case "date":
        dispatch({ type: SET_SHOW_HOME_DATE, payload: value });
        break;
      case "search":
        dispatch({ type: SET_SHOW_HOME_SEARCH, payload: value });
        break;
      case "link":
        dispatch({ type: SET_SHOW_HOME_LINK, payload: value });
        break;
      case "menu":
        dispatch({ type: SET_SHOW_HOME_MENU, payload: value });
        break;
      case "quickLink":
        dispatch({ type: SET_SHOW_HOME_QUICK_LINK, payload: value });
        break;
      case "footer":
        dispatch({ type: SET_SHOW_HOME_FOOTER, payload: value });
        break;
      case "all":
        dispatch({ type: SET_SHOW_HOME_CARD, payload: value });
        dispatch({ type: SET_SHOW_HOME_DATE, payload: value });
        dispatch({ type: SET_SHOW_HOME_SEARCH, payload: value });
        dispatch({ type: SET_SHOW_HOME_LINK, payload: value });
        dispatch({ type: SET_SHOW_HOME_MENU, payload: value });
        dispatch({ type: SET_SHOW_HOME_QUICK_LINK, payload: value });
        dispatch({ type: SET_SHOW_HOME_FOOTER, payload: value });
        break;
      default:
        break;
    }
  };

  const getTogleContent = (title, key, checked) => {
    return (
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={checked}
          size="small"
          onChange={(value) => handleTogleChange(key, value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>{title}</div>
      </ul>
    );
  };

  const homeLayoutSetupContent = (
    <>
      <div>Home Page Layout</div>
      {getTogleContent(
        "All",
        "all",
        showHomeCard &&
          showHomeDate &&
          showHomeSearch &&
          showHomeLink &&
          showHomeMenu &&
          showHomeQuickLink &&
          showHomeFooter
      )}
      {getTogleContent("Menu", "menu", showHomeMenu)}
      {getTogleContent("Link", "link", showHomeLink)}
      {getTogleContent("Date", "date", showHomeDate)}
      {getTogleContent("Search", "search", showHomeSearch)}
      {getTogleContent("Quick Links", "quickLink", showHomeQuickLink)}
      {getTogleContent("Card", "card", showHomeCard)}
      {getTogleContent("Footer", "footer", showHomeFooter)}
    </>
  );

  return (
    <>
      <Tooltip
        placement="bottom"
        title={homeLayoutSetupContent}
        trigger={"click"}
      >
        <Button
          className={style.lw_homePageLayoutSetup_btn}
          type="link"
          icon={<LayoutOutlined />}
        />
      </Tooltip>
    </>
  );
};

export default HomePageLayoutSetup;
