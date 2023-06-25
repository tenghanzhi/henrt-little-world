import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Tooltip,
  Space,
  Image,
  ConfigProvider,
} from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  CodeOutlined,
  AppstoreOutlined,
  Html5Outlined,
  UserOutlined,
  HomeOutlined,
  StarOutlined,
  WechatOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import categoryMatrix from "./categoryMatrix";
import style from "./style/LwHeader.module.css";

const LwHeader = () => {
  const location = useLocation();

  const menuItems = [
    {
      label: <Link to="/">{categoryMatrix.HOME}</Link>,
      key: categoryMatrix.HOME.toLowerCase(),
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link to={`/${categoryMatrix.LEETCODES.toLowerCase()}`}>
          {categoryMatrix.LEETCODES}
        </Link>
      ),
      key: categoryMatrix.LEETCODES.toLowerCase(),
      icon: <CodeOutlined />,
    },
    {
      label: (
        <Link to={`/${categoryMatrix.APPLICATIONS.toLowerCase()}`}>
          {categoryMatrix.APPLICATIONS}
        </Link>
      ),
      key: categoryMatrix.APPLICATIONS.toLowerCase(),
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Link to={`/${categoryMatrix.COMPONENTS.toLowerCase()}`}>
          {categoryMatrix.COMPONENTS}
        </Link>
      ),
      key: categoryMatrix.COMPONENTS.toLowerCase(),
      icon: <Html5Outlined />,
    },
    {
      label: (
        <Link to={`/${categoryMatrix.FAVORITES.toLowerCase()}`}>
          {categoryMatrix.FAVORITES}
        </Link>
      ),
      key: categoryMatrix.FAVORITES.toLowerCase(),
      icon: <StarOutlined />,
    },
    {
      label: (
        <Link to={`/${categoryMatrix.PORTFOLIO.toLowerCase()}`}>About Me</Link>
      ),
      key: categoryMatrix.PORTFOLIO.toLowerCase(),
      icon: <UserOutlined />,
    },
  ];

  const selectedKeys = location.pathname.slice(1);

  const onRightBtnsClick = (type) => {
    switch (type.toLowerCase()) {
      case "leetcode":
        window.open("https://leetcode.cn/u/tenghanzhi/");
        break;
      case "stackoverflow":
        window.open("https://stackoverflow.com/users/21989386/hanzhi-teng");
        break;
      case "github":
        window.open("https://github.com/tenghanzhi");
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/tenghanzhi/");
        break;
      case "bilibili":
        window.open("https://space.bilibili.com/914572");
        break;
      default:
        break;
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#212121",
          colorInfoHover: "#FFFFFF",
          colorBgSpotlight: "#212121",
        },
      }}
    >
      <Layout.Header className={style.lw_header_wrapper}>
        <Menu
          className={style.lw_header_menu}
          theme="dark"
          mode="horizontal"
          items={menuItems}
          defaultSelectedKeys={["home"]}
          selectedKeys={[selectedKeys === "" ? "home" : selectedKeys]}
        />
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
                <Image
                  src={require("../../images/QR_WeChat.png")}
                  width={130}
                />
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
      </Layout.Header>
      <Outlet />
    </ConfigProvider>
  );
};

export default LwHeader;
