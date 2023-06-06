import React from "react";
import { Space, Table, Tag } from "antd";
import moment from "moment/moment";
import convertStringToArrayByComma from "../utils/convertStringToArrayByComma";

const LeetcodesTable = (props) => {
  const data = props.data.data ? props.data.data : null;

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
      case "trie": {
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
      default: {
        return "black";
      }
    }
  };

  const columns = [
    {
      title: "LeetCode Index",
      key: "leetcodeIndex",
      dataIndex: "leetcodeIndex",
      width: 50,
      render: (_, record) => (
        <a href={record.attributes.link}>{record.attributes.leetcodeIndex}</a>
      ),
      sorter: (a, b) =>
        a.attributes?.leetcodeIndex - b.attributes?.leetcodeIndex,
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (_, record) => (
        <a href={record.attributes.link}>{record.attributes.title}</a>
      ),
      sorter: (a, b) => a.attributes?.title?.localeCompare(b.attributes?.title),
    },
    {
      title: "Difficulty",
      key: "difficulty",
      dataIndex: "difficulty",
      width: 50,
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
    },

    {
      title: "Completed Date",
      key: "firstCompletedDate",
      dataIndex: "firstCompletedDate",
      defaultSortOrder: "ascend",
      width: 50,
      render: (_, record) => <div>{record.attributes.firstCompletedDate}</div>,
      sorter: (a, b) =>
        moment(a.attributes.firstCompletedDate).unix() -
        moment(b.attributes.firstCompletedDate).unix(),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: 20,
        total: data.length,
      }}
      bordered
    />
  );
};

export default LeetcodesTable;
