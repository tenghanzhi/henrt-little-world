import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import HomeTopNav from "./HomeTopNav";
import HomeCardArea from "./HomeCardArea";
import LwLayout from "../common/LwLayout";
import categoryMatrix from "../common/categoryMatrix";

const Home = () => {
  const showHomeCard = useSelector((state) => state.showHomeCard);

  const pageContent = (
    <Space direction="vertical" align="center" wrap>
      <HomeTopNav />
      {showHomeCard && <HomeCardArea />}
    </Space>
  );

  return (
    <LwLayout
      direction="horizontal"
      content={pageContent}
      pageKey={categoryMatrix.HOME}
    />
  );
};

export default Home;
