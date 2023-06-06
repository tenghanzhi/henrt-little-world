import React, { Fragment } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Input, Button } from "antd";
import {
  GithubOutlined,
  CodeOutlined,
  AppstoreOutlined,
  Html5Outlined,
  UserOutlined,
  HomeOutlined,
  SearchOutlined,
  StarOutlined,
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
        <Link to={"/" + categoryMatrix.PORTFOLIO.toLowerCase()}>
          {categoryMatrix.PORTFOLIO}
        </Link>
      ),
      key: categoryMatrix.PORTFOLIO.toLowerCase(),
      icon: <UserOutlined />,
    },
    {
      label: (
        <Link to={"/" + categoryMatrix.COMPONENTS.toLowerCase()}>
          {categoryMatrix.COMPONENTS}
        </Link>
      ),
      key: categoryMatrix.COMPONENTS.toLowerCase(),
      icon: <Html5Outlined />,
    },
    {
      label: (
        <Link to={"/" + categoryMatrix.APPLICATIONS.toLowerCase()}>
          {categoryMatrix.APPLICATIONS}
        </Link>
      ),
      key: categoryMatrix.APPLICATIONS.toLowerCase(),
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Link to={"/" + categoryMatrix.LEETCODES.toLowerCase()}>
          {categoryMatrix.LEETCODES}
        </Link>
      ),
      key: categoryMatrix.LEETCODES.toLowerCase(),
      icon: <CodeOutlined />,
    },
    {
      label: (
        <Link to={"/" + categoryMatrix.GITHUB.toLowerCase()}>
          {categoryMatrix.GITHUB}
        </Link>
      ),
      key: categoryMatrix.GITHUB.toLowerCase(),
      icon: <GithubOutlined />,
    },
    {
      label: (
        <Link to={"/" + categoryMatrix.MORE.toLowerCase()}>
          {categoryMatrix.MORE}
        </Link>
      ),
      key: categoryMatrix.MORE.toLowerCase(),
      icon: <StarOutlined />,
    },
  ];

  const selectedKeys = location.pathname.slice(1);
  console.log(selectedKeys ? true : false);

  const onSearch = (value) => console.log(value);

  return (
    <Fragment>
      <Layout.Header className={style.lw_header_wrapper}>
        <Menu
          className={style.lw_header_menu}
          theme="dark"
          mode="horizontal"
          items={menuItems}
          defaultSelectedKeys={["home"]}
          selectedKeys={[selectedKeys === "" ? "home" : selectedKeys]}
        />
        {selectedKeys ? (
          <>
            <Input.Search
              className={style.lw_header_search}
              placeholder="Input Search Text"
              onSearch={onSearch}
            />
            <Button
              className={style.lw_header_search_button}
              icon={<SearchOutlined />}
            />
          </>
        ) : null}
      </Layout.Header>
      <Outlet />
    </Fragment>
  );
};

export default LwHeader;
