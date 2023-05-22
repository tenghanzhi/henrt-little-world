import { Space, Table, Tag } from "antd";
import LwLayout from "../common/LwLayout";
import leetCodeData from "../../data/leetCodeData";

const Leetcodes = () => {
  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      defaultSortOrder: "ascend",
      render: (_, record) => <a href={record.link}>{record.title}</a>,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Difficulty",
      key: "difficulty",
      dataIndex: "difficulty",
      
      render: (_, { difficulty }) => (
        <>
          {difficulty.map((item) => {
            let color;
            switch (item.toLowerCase()) {
              case "easy": {
                color = "green";
                break;
              }
              case "medium": {
                color = "geekblue";
                break;
              }
              case "hard": {
                color = "volcano";
                break;
              }
              default: {
                color = "black";
                break;
              }
            }
            return (
              <Tag color={color} key={item}>
                {item.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      sorter: (a, b) => a.difficulty[0].localeCompare(b.difficulty[0]),
    },
    {
      title: "Solution",
      key: "solution",
      render: (_, record) => (
        <Space size="middle">
          <a>Check solution of {record.title}</a>
        </Space>
      ),
    },
  ];

  const pageContent = (
    <Table
      columns={columns}
      dataSource={leetCodeData}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: 20,
        total: leetCodeData.length,
      }}
    />
  );

  return <LwLayout content={pageContent} />;
};

export default Leetcodes;
