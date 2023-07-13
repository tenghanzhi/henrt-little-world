import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "antd";
import { SET_SHOW_HOME_CARD } from "../../redux/constants";
import style from "./style/HomeCardSwitch.module.css";

const HomeCardSwitch = () => {
  const dispatch = useDispatch();
  const showHomeCard = useSelector((state) => state.showHomeCard);
  const handleTogleChange = (value) => {
    dispatch({ type: SET_SHOW_HOME_CARD, payload: value });
  };
  return (
    <div className={style.lw_homecardswitch_wrapper}>
      <div className={style.lw_homecardswitch_title}>Card:</div>
      <Switch
        checkedChildren="On"
        unCheckedChildren="Off"
        className={style.lw_homecardswitch_switch}
        defaultChecked={showHomeCard}
        size="small"
        onChange={(value) => handleTogleChange(value)}
      />
    </div>
  );
};

export default HomeCardSwitch;
