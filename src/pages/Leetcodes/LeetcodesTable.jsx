import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { SiLeetcode } from "react-icons/si";
import moment from "moment/moment";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_LEETCODE_ID,
  SET_LEETCODE_TABLE_PAGENATION,
  SET_LEETCODE_TABLE_SORTER,
  SET_LEETCODE_TABLE_FILTER,
} from "../../redux/constants";
import style from "./style/LeetCodesTable.module.css";

const LeetCodesTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const leetcodeTableColumns = useSelector(
    (state) => state.leetcodeTableColumns
  );
  const leetcodeTablePagenation = useSelector(
    (state) => state.leetcodeTablePagenation
  );
  const leetcodeTableFilter = useSelector((state) => state.leetcodeTableFilter);
  const leetcodeTableFilterType = useSelector(
    (state) => state.leetcodeTableFilterType
  );

  const handleDifficultyTagColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy": {
        return "green";
      }
      case "medium": {
        return "geekblue";
      }
      case "hard": {
        return "volcano";
      }
      default: {
        return "black";
      }
    }
  };

  const handleTypeTagColor = (type) => {
    switch (type.toLowerCase()) {
      case "array": {
        return "magenta";
      }
      case "hash table": {
        return "red";
      }
      case "linked list": {
        return "volcano";
      }
      case "math": {
        return "orange";
      }
      case "recursion": {
        return "gold";
      }
      case "stack": {
        return "lime";
      }
      case "sorting": {
        return "green";
      }
      case "string": {
        return "cyan";
      }
      case "tree": {
        return "blue";
      }
      case "sliding window": {
        return "geekblue";
      }
      case "divide and conquer": {
        return "purple";
      }
      case "heap": {
        return "#2db7f5";
      }
      case "bucket sort": {
        return "#87d068";
      }
      case "counting": {
        return "#108ee9";
      }
      case "quickselect": {
        return "#BD2FCB";
      }
      case "two pointers": {
        return "#FF66FF";
      }
      case "binary search": {
        return "#003366";
      }
      case "dynamic programming": {
        return "#006666";
      }
      case "depth-first search": {
        return "#000066";
      }
      case "breadth-first search": {
        return "#330066";
      }
      case "backtracking": {
        return "#663300";
      }
      default: {
        return "black";
      }
    }
  };

  const handleActionBtnOnClick = (type, record) => {
    switch (type.toLowerCase()) {
      case "check":
        window.open(record.attributes.link, "_blank", "noopener, noreferrer");
        break;
      case "review":
        dispatch({ type: SET_SELECTED_LEETCODE_ID, payload: record.id });
        navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/reviewLeetCodes`);
        break;
      case "edit":
        dispatch({ type: SET_SELECTED_LEETCODE_ID, payload: record.id });
        navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/editLeetCodes`);
        break;
      default:
        return null;
    }
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_LEETCODE_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  const handleTableChange = (filter, sorter) => {
    let order;
    if (sorter?.order === "ascend") order = ":asc";
    else if (sorter?.order === "descend") order = ":desc";
    else order = null;
    dispatch({
      type: SET_LEETCODE_TABLE_SORTER,
      payload: { sort: sorter.field, order: order },
    });

    dispatch({
      type: SET_LEETCODE_TABLE_FILTER,
      payload: {
        difficulty:
          filter?.difficulty?.length > 0 ? filter?.difficulty[0] : null,
        type: filter?.type?.length > 0 ? filter?.type[0] : null,
        leetcodeIndex: leetcodeTableFilter.leetcodeIndex,
        title: leetcodeTableFilter.title,
      },
    });
  };

  const difficultyFilterOptions = [
    {
      text: "Easy",
      value: "easy",
    },
    {
      text: "Medium",
      value: "medium",
    },
    {
      text: "Hard",
      value: "hard",
    },
  ];

  const typeFilterOptions = [
    {
      text: "Array",
      value: "array",
    },
    {
      text: "Hash Table",
      value: "hash table",
    },
    {
      text: "Linked List",
      value: "linked list",
    },
    {
      text: "Math",
      value: "math",
    },
    {
      text: "Recursion",
      value: "recursion",
    },
    {
      text: "Stack",
      value: "stack",
    },
    {
      text: "Sorting",
      value: "sorting",
    },
    {
      text: "String",
      value: "string",
    },
    {
      text: "Tree",
      value: "tree",
    },
    {
      text: "Sliding Window",
      value: "sliding window",
    },
    {
      text: "Divide and Conquer",
      value: "divide and conquer",
    },
    {
      text: "Heap",
      value: "heap",
    },
    {
      text: "Bucket Sort",
      value: "bucket sort",
    },
    {
      text: "Counting",
      value: "counting",
    },
    {
      text: "Quickselect",
      value: "quickselect",
    },
    {
      text: "Two Pointers",
      value: "two pointers",
    },
    {
      text: "Binary Search",
      value: "Binary Search",
    },
    {
      text: "Dynamic Programming",
      value: "Dynamic Programming",
    },
    {
      text: "Depth-First Search",
      value: "Depth-First Search",
    },
    {
      text: "Breadth-First Search",
      value: "Breadth-First Search",
    },
    {
      text: "Backtracking",
      value: "Backtracking",
    },
  ];

  const columns = [
    {
      title: "Index",
      key: "leetcodeIndex",
      dataIndex: "leetcodeIndex",
      defaultSortOrder: "ascend",
      render: (_, record) => {
        return (
          <Tooltip title="Check on LeetCode">
            <Button
              type="link"
              onClick={() => handleActionBtnOnClick("check", record)}
            >
              {record.attributes.leetcodeIndex}
            </Button>
          </Tooltip>
        );
      },
      sorter: (a, b) =>
        a.attributes?.leetcodeIndex - b.attributes?.leetcodeIndex,
      show: leetcodeTableColumns.index,
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (_, record) => {
        return (
          <Tooltip title="Review on Little World">
            {/* eslint-disable-next-line */}
            <a onClick={() => handleActionBtnOnClick("review", record)}>
              {record.attributes.title}
            </a>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.attributes?.title?.localeCompare(b.attributes?.title),
      show: leetcodeTableColumns.title,
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
      show: leetcodeTableColumns.createdAt,
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
      show: leetcodeTableColumns.updatedAt,
    },
    {
      title: "Completed Date",
      key: "firstCompletedDate",
      dataIndex: "firstCompletedDate",
      render: (_, record) => <div>{record.attributes.firstCompletedDate}</div>,
      sorter: (a, b) =>
        moment(a.attributes.firstCompletedDate).unix() -
        moment(b.attributes.firstCompletedDate).unix(),
      show: leetcodeTableColumns.firstCompletedDate,
    },
    {
      title: "Difficulty",
      key: "difficulty",
      dataIndex: "difficulty",
      render: (_, record) => (
        <Tag
          color={handleDifficultyTagColor(record.attributes?.difficulty)}
          key={record.id}
        >
          {record.attributes?.difficulty?.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) =>
        a.attributes?.difficulty?.localeCompare(b.attributes?.difficulty),
      filters: difficultyFilterOptions,
      filterMultiple: false,
      defaultFilteredValue: [
        leetcodeTableFilter.difficulty ? leetcodeTableFilter.difficulty : "",
      ],
      onFilter: (value, record) =>
        record?.attributes?.difficulty?.toLowerCase().indexOf(value) === 0,
      show: leetcodeTableColumns.difficulty,
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
        leetcodeTableFilter.type ? leetcodeTableFilter.type : "",
      ],
      onFilter: (value, record) => {
        return record?.attributes?.type
          ?.replace(/\s/g, "")
          .toLowerCase()
          .includes(value.replace(/\s/g, ""));
      },
      show: leetcodeTableColumns.type,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 150,
      render: (_, record) => (
        <Space wrap direction="horizantal">
          <Tooltip title="Check on LeetCode">
            <Button
              type="text"
              icon={<SiLeetcode />}
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
      show: leetcodeTableColumns.action,
    },
  ].filter((item) => item.show);

  return (
    <Table
      className={style.lw_leetcodes_table_wrapper}
      columns={columns}
      rowKey="id"
      dataSource={leetcodeData?.data}
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
      onChange={(val, filter, sorter, extra) =>
        handleTableChange(filter, sorter)
      }
      loading={!leetcodeTableFilterType && leetcodeData?.data?.length === 0}
    />
  );
};

export default LeetCodesTable;
