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
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeMenu}
          size="small"
          onChange={(value) => handleTogleChange("menu", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Menu</div>
      </ul>
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeLink}
          size="small"
          onChange={(value) => handleTogleChange("link", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Link</div>
      </ul>
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeDate}
          size="small"
          onChange={(value) => handleTogleChange("date", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Date</div>
      </ul>
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeSearch}
          size="small"
          onChange={(value) => handleTogleChange("search", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Search</div>
      </ul>
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeQuickLink}
          size="small"
          onChange={(value) => handleTogleChange("quickLink", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Quick Links</div>
      </ul>
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeCard}
          size="small"
          onChange={(value) => handleTogleChange("card", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Card</div>
      </ul>
      <ul className={style.lw_homePageLayoutSetup_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_homePageLayoutSetup_switch}
          checked={showHomeFooter}
          size="small"
          onChange={(value) => handleTogleChange("footer", value)}
        />
        <div className={style.lw_homePageLayoutSetup_title}>Footer</div>
      </ul>
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
