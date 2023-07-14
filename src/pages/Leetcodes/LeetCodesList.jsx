import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, List } from "antd";
import { EditOutlined, CodeOutlined, EyeOutlined } from "@ant-design/icons";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_LEETCODE_ID,
  SET_LEETCOD_TABLE_PAGENATION,
} from "../../redux/constants";
import style from "./style/LeetCodesList.module.css";

const LeetCodesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const leetcodeTablePagenation = useSelector(
    (state) => state.leetcodeTablePagenation
  );
  const leetcodeTableFilterType = useSelector(
    (state) => state.leetcodeTableFilterType
  );

  const handleActionBtnOnClick = (type, item) => {
    switch (type.toLowerCase()) {
      case "check":
        window.open(item.attributes.link, "_blank", "noopener, noreferrer");
        break;
      case "review":
        dispatch({ type: SET_SELECTED_LEETCODE_ID, payload: item.id });
        navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/reviewLeetCodes`);
        break;
      case "edit":
        dispatch({ type: SET_SELECTED_LEETCODE_ID, payload: item.id });
        navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/editLeetCodes`);
        break;
      default:
        return null;
    }
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_LEETCOD_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  return (
    <List
      className={style.lw_leetcode_list_wrapper}
      itemLayout="vertical"
      size="medium"
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: leetcodeTablePagenation?.size
          ? leetcodeTablePagenation.size
          : 25,
        defaultCurrent: leetcodeTablePagenation?.current
          ? leetcodeTablePagenation.current
          : 1,
        total: leetcodeData?.meta?.pagination?.total
          ? leetcodeData?.meta?.pagination?.total
          : 0,
        onChange: (current, size) => handlePaginationChange(current, size),
      }}
      dataSource={leetcodeData?.data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Button
              type="text"
              size="small"
              icon={<CodeOutlined />}
              onClick={() => handleActionBtnOnClick("check", item)}
            >
              LeetCode
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
            title={<a href={item.attributes.link}>{item.attributes.title}</a>}
            description={` ${
              item.attributes.difficulty
            } | ${convertStringToArrayByComma(item.attributes.type)
              .sort((a, b) => a.trim().localeCompare(b.trim()))
              .toString()}`}
          />
        </List.Item>
      )}
      loading={!leetcodeTableFilterType && leetcodeData?.data?.length === 0}
    />
  );
};

export default LeetCodesList;
