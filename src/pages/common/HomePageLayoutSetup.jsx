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
      default:
        break;
    }
  };

  const homeLayoutSetupContent = (
    <>
      <div>Home Page Layout</div>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Menu:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeMenu}
          size="small"
          onChange={(value) => handleTogleChange("menu", value)}
        />
      </ul>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Link:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeLink}
          size="small"
          onChange={(value) => handleTogleChange("link", value)}
        />
      </ul>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Date:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeDate}
          size="small"
          onChange={(value) => handleTogleChange("date", value)}
        />
      </ul>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Search:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeSearch}
          size="small"
          onChange={(value) => handleTogleChange("search", value)}
        />
      </ul>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Quick Link:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeQuickLink}
          size="small"
          onChange={(value) => handleTogleChange("quickLink", value)}
        />
      </ul>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Card:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeCard}
          size="small"
          onChange={(value) => handleTogleChange("card", value)}
        />
      </ul>
      <ul>
        <div className={style.lw_homePageLayoutSetup_title}>Footer:</div>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          className={style.lw_lw_homePageLayoutSetup_title_switch}
          checked={showHomeFooter}
          size="small"
          onChange={(value) => handleTogleChange("footer", value)}
        />
      </ul>
    </>
  );

  return (
    <>
      <Tooltip placement="bottom" title={homeLayoutSetupContent}>
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
