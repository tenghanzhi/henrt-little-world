import React from "react";
import { Button, Tooltip, Space, Image } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  CodeOutlined,
  WechatOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
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
      case "bilibili":
        window.open(
          "https://space.bilibili.com/914572",
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
      <Tooltip placement="bottom" title={"Check Henry's LeetCode"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<CodeOutlined />}
          onClick={() => onRightBtnsClick("leetcode")}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={"Check Henry's Stack Overflow"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<DesktopOutlined />}
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
      <Tooltip placement="bottom" title={"Check Henry's Bilibili"}>
        <Button
          className={style.lw_header_links}
          type="link"
          icon={<VideoCameraOutlined />}
          onClick={() => onRightBtnsClick("bilibili")}
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
