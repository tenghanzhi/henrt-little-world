import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Tooltip } from "antd";
import { EditOutlined, LinkOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_FAVORITE_ID,
  SET_FAVORITE_TABLE_PAGENATION,
  SET_FAVORITE_TABLE_SORTER,
  SET_FAVORITE_TABLE_FILTER,
} from "../../redux/constants";
import style from "./style/FavoritesTable.module.css";

const FavoritesTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const favoriteData = useSelector((state) => state.favoriteData);
  const favoriteTablePagenation = useSelector(
    (state) => state.favoriteTablePagenation
  );
  const favoriteTableFilter = useSelector((state) => state.favoriteTableFilter);

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
        window.open(record.attributes.link, "_blank", "noopener, noreferrer");
        break;
      case "review":
        dispatch({ type: SET_SELECTED_FAVORITE_ID, payload: record.id });
        navigate(`/${categoryMatrix.FAVORITES.toLowerCase()}/reviewFavorites`);
        break;
      case "edit":
        dispatch({ type: SET_SELECTED_FAVORITE_ID, payload: record.id });
        navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editFavorites`);
        break;
      default:
        return null;
    }
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
              <Tooltip title="Review on Little World">
                {/* eslint-disable-next-line */}
                <a onClick={() => handleActionBtnOnClick("review", record)}>
                  {record.attributes.name}
                </a>
              </Tooltip>
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
      defaultFilteredValue: [
        favoriteTableFilter.type ? favoriteTableFilter.type : "",
      ],
      sorter: (a, b) => a.attributes?.type?.localeCompare(b.attributes?.type),
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (_, record) => (
        <div>{record.attributes.createdAt.toString().slice(0, 10)}</div>
      ),
      sorter: (a, b) =>
        moment(a.attributes.createdAt).unix() -
        moment(b.attributes.createdAt).unix(),
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (_, record) => (
        <div>{record.attributes.updatedAt.toString().slice(0, 10)}</div>
      ),
      sorter: (a, b) =>
        moment(a.attributes.updatedAt).unix() -
        moment(b.attributes.updatedAt).unix(),
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
              icon={<LinkOutlined />}
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
          <Tooltip
            title={
              !userInfoData.jwt
                ? "Please login with admin account to edit"
                : "Edit"
            }
          >
            <Button
              type="text"
              onClick={() => handleActionBtnOnClick("edit", record)}
              icon={<EditOutlined />}
              disabled={!userInfoData.jwt}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      className={style.lw_favorites_table_wrapper}
      columns={columns}
      rowKey="id"
      dataSource={favoriteData?.data}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: favoriteTablePagenation?.size
          ? favoriteTablePagenation.size
          : 25,
        defaultCurrent: favoriteTablePagenation?.current
          ? favoriteTablePagenation.current
          : 1,
        total: favoriteData?.meta?.pagination?.total
          ? favoriteData?.meta?.pagination?.total
          : 0,
        onChange: (current, size) => handlePaginationChange(current, size),
        className: style.lw_favorites_table_pagination,
      }}
      onChange={(val, filter, sorter, extra) =>
        handleTableChange(filter, sorter)
      }
      loading={!favoriteTableFilter.name && favoriteData?.data?.length === 0}
    />
  );
};

export default FavoritesTable;
