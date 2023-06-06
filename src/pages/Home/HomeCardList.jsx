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

  const handleTitleOnClick = (data) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        dispatch({
          type: SET_CLICKED_HOME_PAGE_ITEM_ID,
          payload: data.attributes.name
            .replace(/\s/g, "")
            .replace(",", "")
            .replace(".", ""),
        });
        break;
      }
      case categoryMatrix.LEETCODES: {
        window.open(data.attributes.link, "_self");
        break;
      }
      default:
        return null;
    }
  };

  const getTitle = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return <div>{item.attributes.name}</div>;
      }
      case categoryMatrix.LEETCODES: {
        return <div>{item.attributes.title}</div>;
      }
      default:
        return "";
    }
  };

  const getDescription = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return item.attributes.jobTitle;
      }
      case categoryMatrix.LEETCODES: {
        return item.attributes.type;
      }
      default:
        return "";
    }
  };

  const getPathLink = () => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return "portfolio";
      }
      case categoryMatrix.LEETCODES: {
        return "leetcodes";
      }
      default:
        return "";
    }
  };

  const getAvatar = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return (
          <Image
            src={item.attributes.icon}
            fallback={failPicture}
            preview={false}
            width={50}
            height={50}
          />
        );
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
        <Link
          to={{ pathname: getPathLink() }}
          onClick={() => handleTitleOnClick(item)}
        >
          <List.Item>
            <List.Item.Meta
              avatar={getAvatar(item)}
              title={getTitle(item)}
              description={getDescription(item)}
            />
          </List.Item>
        </Link>
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
