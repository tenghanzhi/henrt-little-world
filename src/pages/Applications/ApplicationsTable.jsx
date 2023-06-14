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
import moment from "moment/moment";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import {
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_PAGENATION,
} from "../../redux/constants";

const ApplicationsTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const data = props.data.data ? props.data.data : null;
  const [inputPassword, setInputPassword] = useState(null);

  console.log({ data });

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
    if (inputPassword !== null && inputPassword === password) {
      handleMessage("passwordResult", "success");
      dispatch({ type: SET_SELECTED_APPLICATION_ID, payload: id });
      navigate(
        `/${categoryMatrix.APPLICATIONS.toLowerCase()}/editApplications`
      );
    } else {
      handleMessage("passwordResult", "error");
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_APPLICATION_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (_, record) => <div>{record.attributes.name}</div>,
      sorter: (a, b) => a.attributes?.name?.localeCompare(b.attributes?.name),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      defaultSortOrder: "ascend",
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
    },
    {
      title: "Update At",
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
      render: (_, record) => (
        <Space wrap direction="horizantal">
          <Tooltip title="Review">
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
        defaultPageSize: applicationTablePagenation?.size
          ? applicationTablePagenation.size
          : 20,
        defaultCurrent: applicationTablePagenation?.current
          ? applicationTablePagenation.current
          : 1,
        total: props?.data?.meta?.pagination?.total,
        onChange: (current, size) => handlePaginationChange(current, size),
      }}
      bordered
    />
  );
};

export default ApplicationsTable;
