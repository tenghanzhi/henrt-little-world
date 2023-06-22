import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Tooltip,
  Popconfirm,
  Input,
  message,
} from "antd";
import {
  EditOutlined,
  CodeOutlined,
  EyeOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import {
  SET_SELECTED_FAVORITE_ID,
  SET_FAVORITE_TABLE_PAGENATION,
  SET_FAVORITE_TABLE_SORTER,
  SET_FAVORITE_TABLE_FILTER,
} from "../../redux/constants";

const FavoritesTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteTablePagenation = useSelector(
    (state) => state.favoriteTablePagenation
  );
  const favoriteTableFilter = useSelector((state) => state.favoriteTableFilter);
  const data = props.data.data ? props.data.data : null;
  const total = props?.data?.meta?.pagination?.total
    ? props?.data?.meta?.pagination?.total
    : 0;
  const [inputPassword, setInputPassword] = useState(null);

  const handleTypeTagColor = (type) => {
    switch (type) {
      case "H5C3": {
        return "magenta";
      }
      case "Note": {
        return "red";
      }
      case "Package": {
        return "volcano";
      }
      case "Resource": {
        return "orange";
      }
      case "Utils": {
        return "gold";
      }
      case "VISA": {
        return "lime";
      }
      default:
        break;
    }
  };

  const handleActionBtnOnClick = (type, record) => {
    switch (type.toLowerCase()) {
      case "check":
        window.open(record.attributes.link);
        break;
      case "review":
        dispatch({ type: SET_SELECTED_FAVORITE_ID, payload: record.id });
        navigate(`/${categoryMatrix.FAVORITES.toLowerCase()}/reviewFavorites`);
        break;
      default:
        return null;
    }
  };

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

  const handlePasswordValueChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = (id) => {
    const messageKey = "passwordResult";

    if (inputPassword !== null && inputPassword === password) {
      handleMessage(messageKey, "success");
      dispatch({ type: SET_SELECTED_FAVORITE_ID, payload: id });
      navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editFavorites`);
    } else {
      handleMessage(messageKey, "error");
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_FAVORITE_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  const handleTableChange = (filter, sorter) => {
    let order;
    if (sorter?.order === "ascend") order = ":asc";
    else if (sorter?.order === "descend") order = ":desc";
    else order = null;
    dispatch({
      type: SET_FAVORITE_TABLE_SORTER,
      payload: { sort: sorter.field, order: order },
    });

    dispatch({
      type: SET_FAVORITE_TABLE_FILTER,
      payload: {
        name: favoriteTableFilter.name,
        type: filter?.type?.length > 0 ? filter?.type[0] : null,
      },
    });
  };

  const typeFilterOptions = [
    {
      text: "H5C3",
      value: "H5C3",
    },
    {
      text: "Note",
      value: "Note",
    },
    {
      text: "Package",
      value: "Package",
    },
    {
      text: "Resource",
      value: "Resource",
    },
    {
      text: "Utils",
      value: "Utils",
    },
    {
      text: "VISA",
      value: "VISA",
    },
  ];

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      defaultSortOrder: "ascend",
      render: (_, record) => {
        return (
          <>
            {record.attributes.link ? (
              <Tooltip title="Review on Source Website">
                {/* eslint-disable-next-line */}
                <a onClick={() => handleActionBtnOnClick("check", record)}>
                  {record.attributes.name}
                </a>
              </Tooltip>
            ) : (
              <>{record.attributes.name}</>
            )}
          </>
        );
      },
      sorter: (a, b) => a.attributes?.name?.localeCompare(b.attributes?.name),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (_, record) => (
        <>
          {convertStringToArrayByComma(record.attributes.type)
            .sort((a, b) => a.trim().localeCompare(b.trim()))
            .map((item) => (
              <Tag color={handleTypeTagColor(item.trim())} key={item.trim()}>
                {item.trim().toUpperCase()}
              </Tag>
            ))}
        </>
      ),
      filters: typeFilterOptions.sort((a, b) =>
        a.value > b.value ? 1 : b.value > a.value ? -1 : 0
      ),
      filterMultiple: false,
      sorter: (a, b) => a.attributes?.type?.localeCompare(b.attributes?.type),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (_, record) => {
        return (
          <Tooltip title="Review on Little World">
            {/* eslint-disable-next-line */}
            <a onClick={() => handleActionBtnOnClick("review", record)}>
              {record.attributes.description
                ? record.attributes.description
                : record.attributes.name}
            </a>
          </Tooltip>
        );
      },
      ellipsis: {
        showTitle: (_, record) =>
          record.attributes.description ? true : false,
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 150,
      render: (_, record) => (
        <Space wrap direction="horizantal">
          <Tooltip title="Check on Source Website">
            <Button
              type="text"
              icon={<CodeOutlined />}
              onClick={() => handleActionBtnOnClick("check", record)}
            />
          </Tooltip>
          <Tooltip title="Review on Little World">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleActionBtnOnClick("review", record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Popconfirm
              title={"Please input password to edit."}
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
                    onPressEnter={() => handleConfirmPassword(record.id)}
                  />
                </>
              }
              onConfirm={() => handleConfirmPassword(record.id)}
              onCancel={handleCancelPassword}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="text" icon={<EditOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: favoriteTablePagenation?.size
          ? favoriteTablePagenation.size
          : 20,
        defaultCurrent: favoriteTablePagenation?.current
          ? favoriteTablePagenation.current
          : 1,
        total: total,
        onChange: (current, size) => handlePaginationChange(current, size),
      }}
      bordered
      onChange={(val, filter, sorter, extra) =>
        handleTableChange(filter, sorter)
      }
    />
  );
};

export default FavoritesTable;
