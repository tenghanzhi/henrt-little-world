import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Tooltip } from "antd";
import { EditOutlined, EyeOutlined, LinkOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_PAGENATION,
  SET_APPLICATION_TABLE_SORTER,
  SET_APPLICATION_TABLE_FILTER,
} from "../../redux/constants";
import style from "./style/ApplicationsTable.module.css";

const ApplicationsTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const applicationTableFilter = useSelector(
    (state) => state.applicationTableFilter
  );
  const data = props.data.data ? props.data.data : null;
  const total = props?.data?.meta?.pagination?.total
    ? props?.data?.meta?.pagination?.total
    : 0;

  const handleTypeTagColor = (type) => {
    switch (type.toLowerCase()) {
      case "array": {
        return "magenta";
      }
      case "h5c3": {
        return "red";
      }
      case "utils": {
        return "volcano";
      }
      case "test": {
        return "orange";
      }
      case "object": {
        return "gold";
      }
      case "bom": {
        return "green";
      }
      case "string": {
        return "cyan";
      }
      case "git": {
        return "blue";
      }
      case "dev": {
        return "geekblue";
      }
      case "dom": {
        return "purple";
      }
      default: {
        return "black";
      }
    }
  };

  const handleActionBtnOnClick = (type, record) => {
    switch (type.toLowerCase()) {
      case "review":
        dispatch({ type: SET_SELECTED_APPLICATION_ID, payload: record.id });
        navigate(
          `/${categoryMatrix.APPLICATIONS.toLowerCase()}/reviewApplications`
        );
        break;
      case "edit":
        dispatch({ type: SET_SELECTED_APPLICATION_ID, payload: record.id });
        navigate(
          `/${categoryMatrix.APPLICATIONS.toLowerCase()}/editApplications`
        );
        break;
      default:
        return null;
    }
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_APPLICATION_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  const handleTableChange = (filter, sorter) => {
    let order;
    if (sorter?.order === "ascend") order = ":asc";
    else if (sorter?.order === "descend") order = ":desc";
    else order = null;
    dispatch({
      type: SET_APPLICATION_TABLE_SORTER,
      payload: { sort: sorter.field, order: order },
    });

    dispatch({
      type: SET_APPLICATION_TABLE_FILTER,
      payload: {
        name: applicationTableFilter.name,
        type: filter?.type?.length > 0 ? filter?.type[0] : null,
        description: applicationTableFilter.description,
      },
    });
  };

  const typeFilterOptions = [
    {
      text: "Array",
      value: "array",
    },
    {
      text: "H5C3",
      value: "h5c3",
    },
    {
      text: "Utils",
      value: "utils",
    },
    {
      text: "Test",
      value: "test",
    },
    {
      text: "Object",
      value: "object",
    },
    {
      text: "BOM",
      value: "bom",
    },
    {
      text: "String",
      value: "string",
    },
    {
      text: "Git",
      value: "git",
    },
    {
      text: "DEV",
      value: "dev",
    },
    {
      text: "DOM",
      value: "dom",
    },
  ];

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: 220,
      render: (_, record) => {
        return (
          // eslint-disable-next-line
          <a onClick={() => handleActionBtnOnClick("review", record)}>
            {record.attributes.name}
          </a>
        );
      },
      sorter: (a, b) => a.attributes?.name?.localeCompare(b.attributes?.name),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      defaultSortOrder: "ascend",
      width: 80,
      render: (_, record) => (
        <>
          {convertStringToArrayByComma(record.attributes.type).map((item) => (
            <Tag color={handleTypeTagColor(item.trim())} key={item.trim()}>
              {item.trim().toUpperCase()}
            </Tag>
          ))}
        </>
      ),
      sorter: (a, b) => a.attributes?.type?.localeCompare(b.attributes?.type),
      filters: typeFilterOptions.sort((a, b) =>
        a.value > b.value ? 1 : b.value > a.value ? -1 : 0
      ),
      filterMultiple: false,
      onFilter: (value, record) =>
        record?.attributes?.type?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      width: 110,
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
      width: 110,
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
      width: 300,
      ellipsis: {
        showTitle: (_, record) =>
          record.attributes.description ? true : false,
      },
      render: (_, record) => (
        <div>
          {record.attributes.description
            ? record.attributes.description.toString()
            : "None"}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 110,
      render: (_, record) => (
        <Space wrap direction="horizantal">
          <Tooltip title="Source">
            <Button
              type="text"
              icon={<LinkOutlined />}
              onClick={() => {
                window.open(record?.attributes?.source?.toString());
              }}
              disabled={record?.attributes?.source ? false : true}
            />
          </Tooltip>
          <Tooltip title="Review">
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
      columns={columns}
      dataSource={data}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: applicationTablePagenation?.size
          ? applicationTablePagenation.size
          : 20,
        defaultCurrent: applicationTablePagenation?.current
          ? applicationTablePagenation.current
          : 1,
        total: total,
        onChange: (current, size) => handlePaginationChange(current, size),
        className: style.lw_applications_table_pagination,
      }}
      bordered
      onChange={(val, filter, sorter, extra) =>
        handleTableChange(filter, sorter)
      }
    />
  );
};

export default ApplicationsTable;
