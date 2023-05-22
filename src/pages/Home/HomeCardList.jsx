import React from 'react';
import { List, Image } from "antd";
import failPicture from "../common/failPicture";
import categoryMatrix from "../common/categoryMatrix";

const HomeCardList = (props) => {
  const data = props.data ? props.data : null;
  const type = props.type ? props.type : "";

  const getDescription = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return item.period;
      }
      default:
        return "";
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Image
                src={item.icon}
                fallback={failPicture}
                preview={false}
                width={50}
                height={50}
              />
            }
            title={item.name}
            description={getDescription(item)}
          />
        </List.Item>
      )}
      pagination={{
        position: "bottom",
        align: "end",
        pageSize: "6",
      }}
    />
  );
};

export default HomeCardList;
