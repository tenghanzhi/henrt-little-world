import React from "react";
import { Button, Tooltip, Space, Image } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  WechatOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { FaBilibili, FaYoutube, FaSteam, FaFacebook } from "react-icons/fa6";
import { BsStackOverflow } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import style from "./style/HeaderLinks.module.css";

const HeaderLinks = () => {
  const onRightBtnsClick = (type) => {
    switch (type.toLowerCase()) {
      case "leetcode":
        window.open(
          "https://leetcode.cn/u/tenghanzhi/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "stackoverflow":
        window.open(
          "https://stackoverflow.com/users/21989386/hanzhi-teng",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "github":
        window.open(
          "https://github.com/tenghanzhi",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/tenghanzhi/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "facebook":
        window.open(
          "https://www.facebook.com/hanzhi.teng",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "x":
        window.open(
          "https://x.com/tenghanzhi",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "bilibili":
        window.open(
          "https://space.bilibili.com/914572",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "youtube":
        window.open(
          "https://www.youtube.com/@hanzhiteng3449",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "steam":
        window.open(
          "https://steamcommunity.com/id/Legend_T/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "wows":
        window.open(
          "https://profile.worldofwarships.com/statistics/1031221943",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.lw_header_links_wrapper}>
      <Tooltip placement="bottom" title={"Check Henry's Steam"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<FaSteam />}
          onClick={() => onRightBtnsClick("steam")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's World of Warships"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<IoGameController />}
          onClick={() => onRightBtnsClick("wows")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's LeetCode"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<SiLeetcode />}
          onClick={() => onRightBtnsClick("leetcode")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's Stack Overflow"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<BsStackOverflow />}
          onClick={() => onRightBtnsClick("stackoverflow")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's GitHub"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<GithubOutlined />}
          onClick={() => onRightBtnsClick("github")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's LinkedIn"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<LinkedinOutlined />}
          onClick={() => onRightBtnsClick("linkedin")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's YouTube"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<FaYoutube />}
          onClick={() => onRightBtnsClick("youtube")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's Bilibili"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<FaBilibili />}
          onClick={() => onRightBtnsClick("bilibili")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's X"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<TwitterOutlined />}
          onClick={() => onRightBtnsClick("x")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's FaceBook"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<FaFacebook />}
          onClick={() => onRightBtnsClick("facebook")}
        />
      </Tooltip>
      <Tooltip
        placement="bottom"
        title={
          <Space direction="vertical">
            <div>Scan to Add WeChat</div>
            <Image src={require("../../images/QR_WeChat.png")} width={130} />
          </Space>
        }
      >
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<WechatOutlined />}
        />
      </Tooltip>
    </div>
  );
};

export default HeaderLinks;
