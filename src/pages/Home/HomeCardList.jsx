import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { List, Image } from "antd";
import {
  AppstoreOutlined,
  Html5Outlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { SiLeetcode } from "react-icons/si";
import failPicture from "../common/failPicture";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_PORTFOLIO_ID,
  SET_SELECTED_LEETCODE_ID,
  SET_SELECTED_APPLICATION_ID,
  SET_SELECTED_COMPONENT_ID,
  SET_SELECTED_FAVORITE_ID,
} from "../../redux/constants";
import style from "./style/HomeCardList.module.css";

const HomeCardList = (props) => {
  const dispatch = useDispatch();
  const data = props.data ? props.data : null;
  const type = props.type ? props.type : "";
  const selectedPortfolioId = useSelector((state) => state.selectedPortfolioId);
  const selectedLeetcodeId = useSelector((state) => state.selectedPortfolioId);
  const selectedApplicationId = useSelector(
    (state) => state.selectedPortfolioId
  );
  const selectedComponentId = useSelector((state) => state.selectedPortfolioId);
  const selectedFavoriteId = useSelector((state) => state.selectedPortfolioId);

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
        return (
          <div className={style.lw_homecard_list_font}>
            {item.attributes.name}
          </div>
        );
      }
      case categoryMatrix.LEETCODES: {
        return (
          <div className={style.lw_homecard_list_font}>
            {item.attributes.title}
          </div>
        );
      }
      case categoryMatrix.APPLICATIONS: {
        return (
          <div className={style.lw_homecard_list_font}>
            {item.attributes.name}
          </div>
        );
      }
      case categoryMatrix.COMPONENTS: {
        return (
          <div className={style.lw_homecard_list_font}>
            {item.attributes.name}
          </div>
        );
      }
      case categoryMatrix.FAVORITES: {
        return (
          <div className={style.lw_homecard_list_font}>
            {item.attributes.name}
          </div>
        );
      }
      case categoryMatrix.BULLETINBOARDS: {
        return (
          <div className={style.lw_homecard_list_font}>
            {`${item.attributes.message.slice(0, 40)}...`}
          </div>
        );
      }
      default:
        return "";
    }
  };

  const getDescription = (item) => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return (
          <div className={style.lw_homecard_list_font_description}>
            {item.attributes.jobTitle}
          </div>
        );
      }
      case categoryMatrix.LEETCODES: {
        return (
          <div className={style.lw_homecard_list_font_description}>
            {item.attributes.type}
          </div>
        );
      }
      case categoryMatrix.APPLICATIONS: {
        return (
          <div className={style.lw_homecard_list_font_description}>
            {item.attributes.type}
          </div>
        );
      }
      case categoryMatrix.COMPONENTS: {
        return (
          <div className={style.lw_homecard_list_font_description}>
            {item.attributes.componentType}
          </div>
        );
      }
      case categoryMatrix.FAVORITES: {
        return (
          <div className={style.lw_homecard_list_font_description}>
            {item.attributes.type}
          </div>
        );
      }
      case categoryMatrix.BULLETINBOARDS: {
        return (
          <div className={style.lw_homecard_list_font_description}>
            {item.attributes.user}
          </div>
        );
      }
      default:
        return "";
    }
  };

  const getPathLink = () => {
    switch (type) {
      case categoryMatrix.PORTFOLIO: {
        return `/${categoryMatrix.PORTFOLIO.toLowerCase()}/reviewPortfolio/${selectedPortfolioId}`;
      }
      case categoryMatrix.LEETCODES: {
        return `/${categoryMatrix.LEETCODES.toLowerCase()}/reviewLeetCodes/${selectedLeetcodeId}`;
      }
      case categoryMatrix.APPLICATIONS: {
        return `/${categoryMatrix.APPLICATIONS.toLowerCase()}/reviewApplications/${selectedApplicationId}`;
      }
      case categoryMatrix.COMPONENTS: {
        return `/${categoryMatrix.COMPONENTS.toLowerCase()}/reviewComponents/${selectedComponentId}`;
      }
      case categoryMatrix.FAVORITES: {
        return `/${categoryMatrix.FAVORITES.toLowerCase()}/reviewFavorites/${selectedFavoriteId}`;
      }
      case categoryMatrix.BULLETINBOARDS: {
        return `/${categoryMatrix.BULLETINBOARDS.toLowerCase()}`;
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
        return <SiLeetcode className={style.lw_homecard_list_font_avatar} />;
      }
      case categoryMatrix.APPLICATIONS: {
        return (
          <AppstoreOutlined className={style.lw_homecard_list_font_avatar} />
        );
      }
      case categoryMatrix.COMPONENTS: {
        return <Html5Outlined className={style.lw_homecard_list_font_avatar} />;
      }
      case categoryMatrix.FAVORITES: {
        return <StarOutlined className={style.lw_homecard_list_font_avatar} />;
      }
      case categoryMatrix.BULLETINBOARDS: {
        return (
          <MessageOutlined className={style.lw_homecard_list_font_avatar} />
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
        size: "small",
        className: style.lw_homecard_list_pagination,
      }}
    />
  );
};

export default HomeCardList;
