import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Space, Button, Popconfirm, Input } from "antd";
import {
  PlusOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import FavoritesTable from "./FavoritesTable";
import LwLayout from "../common/LwLayout";
import {
  SET_FAVORITE_DATA,
  SET_FAVORITE_TABLE_FILTER,
} from "../../redux/constants";
import style from "./style/Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteData = useSelector((state) => state.favoriteData);
  const favoriteTablePagenation = useSelector(
    (state) => state.favoriteTablePagenation
  );
  const favoriteTableSorter = useSelector((state) => state.favoriteTableSorter);
  const favoriteTableFilter = useSelector((state) => state.favoriteTableFilter);
  const [inputPassword, setInputPassword] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);

  useEffect(() => {
    handleClearSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetFavoriteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteTablePagenation, favoriteTableSorter, favoriteTableFilter]);

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        message.loading({
          key: key,
          content: messageMatrix.LOADING_MESSAGE_LOADING,
        });
        break;
      }
      case "success": {
        message.success({
          key: key,
          content: messageMatrix.LOADING_MESSAGE_SUCCESS,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: key,
          content: `${messageMatrix.LOADING_MESSAGE_ERROR}${content}`,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleGetFavoriteData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.FAVORITE_GET_ALL}?pagination[page]=${
          favoriteTablePagenation.current
        }&pagination[pageSize]=${favoriteTablePagenation.size}&sort=${
          favoriteTableSorter.sort
        }${favoriteTableSorter.order}${
          favoriteTableFilter.name
            ? `&filters[name][$containsi][0]=${favoriteTableFilter.name}`
            : ""
        }${
          favoriteTableFilter.type
            ? `&filters[type][$containsi][1]=${favoriteTableFilter.type}`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_FAVORITE_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const handlePasswordValueChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = () => {
    const messageKey = "passwordResult";

    if (inputPassword !== null && inputPassword === password) {
      handleMessage(messageKey, "success");
      navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/createFavorites`);
    } else {
      handleMessage(messageKey, "error");
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  const handleSearchValueChange = (e) => {
    setInputSearch(e.target.value);
    dispatch({
      type: SET_FAVORITE_TABLE_FILTER,
      payload: {
        name: e.target.value,
        type: favoriteTableFilter.type,
      },
    });
  };

  const handleClearSearchResult = () => {
    setInputSearch(null);
    dispatch({
      type: SET_FAVORITE_TABLE_FILTER,
      payload: {
        name: null,
        type: null,
      },
    });
  };

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_favorite_btn_wrapper}>
        <Popconfirm
          title={"Please input password to create."}
          placement="topRight"
          description={
            <>
              <Input.Password
                placeholder="Input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => handlePasswordValueChange(e)}
                allowClear={true}
                value={inputPassword}
                onPressEnter={handleConfirmPassword}
              />
            </>
          }
          onConfirm={handleConfirmPassword}
          onCancel={handleCancelPassword}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Create New
          </Button>
        </Popconfirm>
        <Input
          className={style.lw_favorite_search}
          placeholder="Input Favorite Name to search"
          onChange={(e) => handleSearchValueChange(e)}
          value={inputSearch}
          allowClear
        />
        <Button
          danger
          onClick={handleClearSearchResult}
          disabled={!inputSearch}
        >
          Clear Results
        </Button>
      </Space>
      <FavoritesTable data={favoriteData} />
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.COMPONENTS} />;
};

export default Favorites;
