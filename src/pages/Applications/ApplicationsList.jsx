import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, List } from "antd";
import { EditOutlined, EyeOutlined, LinkOutlined } from "@ant-design/icons";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_PAGENATION,
} from "../../redux/constants";
import style from "./style/ApplicationsList.module.css";

const ApplicationsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const applicationData = useSelector((state) => state.applicationData);
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const applicationTableFilterType = useSelector(
    (state) => state.applicationTableFilterType
  );

  const handleActionBtnOnClick = (type, item) => {
    switch (type.toLowerCase()) {
      case "source":
        window.open(item?.attributes?.source?.toString());
        break;
      case "review":
        dispatch({ type: SET_SELECTED_APPLICATION_ID, payload: item.id });
        navigate(
          `/${categoryMatrix.APPLICATIONS.toLowerCase()}/reviewApplications`
        );
        break;
      case "edit":
        dispatch({ type: SET_SELECTED_APPLICATION_ID, payload: item.id });
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

  return (
    <List
      className={style.lw_application_list_wrapper}
      itemLayout="vertical"
      size="medium"
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: applicationTablePagenation?.size
          ? applicationTablePagenation.size
          : 20,
        defaultCurrent: applicationTablePagenation?.current
          ? applicationTablePagenation.current
          : 1,
        total: applicationData?.meta?.pagination?.total,
        onChange: (current, size) => handlePaginationChange(current, size),
      }}
      dataSource={applicationData?.data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Button
              type="text"
              size="small"
              icon={<LinkOutlined />}
              onClick={() => handleActionBtnOnClick("source", item)}
              disabled={!item.attributes.source}
            >
              Source
            </Button>,
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleActionBtnOnClick("review", item)}
            >
              Review
            </Button>,
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleActionBtnOnClick("edit", item)}
              disabled={!userInfoData.jwt}
            >
              Edit
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={
              // eslint-disable-next-line
              <a onClick={() => handleActionBtnOnClick("review", item)}>
                {item.attributes.name}
              </a>
            }
            description={`${item.attributes.type} | ${
              item.attributes.description
                ? `${item.attributes.description.slice(0, 100)}...`
                : "No Description"
            }`}
          />
        </List.Item>
      )}
      loading={
        !applicationTableFilterType && applicationData?.data?.length === 0
      }
    />
  );
};

export default ApplicationsList;
