import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { List, Image } from "antd";
import failPicture from "../common/failPicture";
import categoryMatrix from "../common/categoryMatrix";
import { SET_CLICKED_HOME_PAGE_ITEM_ID } from "../../redux/constants";

const HomeCardList = (props) => {
  const dispatch = useDispatch();
  const data = props.data ? props.data : null;
  const type = props.type ? props.type : "";

  const handlePorfolioNameClick = (id) => {
    dispatch({ type: SET_CLICKED_HOME_PAGE_ITEM_ID, payload: id });
  };

  const getTitle = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return (
          <Link
            to={{ pathname: "portfolio" }}
            onClick={() =>
              handlePorfolioNameClick(item.attributes.name.replace(/\s/g, "").replace(',','').replace('.',''))
            }
          >
            {item.attributes.name}
          </Link>
        );
      }
      default:
        return "";
    }
  };

  const getDescription = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return item.attributes.period;
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
                src={item.attributes.icon}
                fallback={failPicture}
                preview={false}
                width={50}
                height={50}
              />
            }
            title={getTitle(item)}
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
