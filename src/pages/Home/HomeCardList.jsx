import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { List, Image } from "antd";
import {
  CodeOutlined,
  AppstoreOutlined,
  Html5Outlined,
  StarOutlined,
} from "@ant-design/icons";
import failPicture from "../common/failPicture";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_PORTFOLIO_ID,
  SET_SELECTED_LEETCODE_ID,
  SET_SELECTED_APPLICATION_ID,
  SET_SELECTED_COMPONENT_ID,
  SET_SELECTED_FAVORITE_ID,
} from "../../redux/constants";

const HomeCardList = (props) => {
  const dispatch = useDispatch();
  const data = props.data ? props.data : null;
  const type = props.type ? props.type : "";

  const handleTitleOnClick = (data) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        dispatch({
          type: SET_SELECTED_PORTFOLIO_ID,
          payload: data.id,
        });
        break;
      }
      case categoryMatrix.LEETCODES: {
        dispatch({
          type: SET_SELECTED_LEETCODE_ID,
          payload: data.id,
        });
        break;
      }
      case categoryMatrix.APPLICATIONS: {
        dispatch({
          type: SET_SELECTED_APPLICATION_ID,
          payload: data.id,
        });
        break;
      }
      case categoryMatrix.COMPONENTS: {
        dispatch({
          type: SET_SELECTED_COMPONENT_ID,
          payload: data.id,
        });
        break;
      }
      case categoryMatrix.FAVORITES: {
        dispatch({
          type: SET_SELECTED_FAVORITE_ID,
          payload: data.id,
        });
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
      case categoryMatrix.APPLICATIONS: {
        return <div>{item.attributes.name}</div>;
      }
      case categoryMatrix.COMPONENTS: {
        return <div>{item.attributes.name}</div>;
      }
      case categoryMatrix.FAVORITES: {
        return <div>{item.attributes.name}</div>;
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
      case categoryMatrix.APPLICATIONS: {
        return item.attributes.type;
      }
      case categoryMatrix.COMPONENTS: {
        return item.attributes.componentType;
      }
      case categoryMatrix.FAVORITES: {
        return item.attributes.type;
      }
      default:
        return "";
    }
  };

  const getPathLink = () => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return `/${categoryMatrix.PORTFOLIO.toLowerCase()}/reviewPortfolio`;
      }
      case categoryMatrix.LEETCODES: {
        return `/${categoryMatrix.LEETCODES.toLowerCase()}/reviewLeetCodes`;
      }
      case categoryMatrix.APPLICATIONS: {
        return `/${categoryMatrix.APPLICATIONS.toLowerCase()}/reviewApplications`;
      }
      case categoryMatrix.COMPONENTS: {
        return `/${categoryMatrix.COMPONENTS.toLowerCase()}/reviewComponents`;
      }
      case categoryMatrix.FAVORITES: {
        return `/${categoryMatrix.FAVORITES.toLowerCase()}/reviewFavorites`;
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
      case categoryMatrix.LEETCODES: {
        return <CodeOutlined />;
      }
      case categoryMatrix.APPLICATIONS: {
        return <AppstoreOutlined />;
      }
      case categoryMatrix.COMPONENTS: {
        return <Html5Outlined />;
      }
      case categoryMatrix.FAVORITES: {
        return <StarOutlined />;
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
