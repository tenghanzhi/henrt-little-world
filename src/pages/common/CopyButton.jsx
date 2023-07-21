import React from "react";
import { Button, message, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import messageMatrix from "../common/messageMatrix";

const CopyButton = (props) => {
  const { data } = props;

  const handleMessage = (type) => {
    const messageDuration = 1;
    const messageKey = "copyMessage";

    switch (type) {
      case "success": {
        message.success({
          key: messageKey,
          content: `${messageMatrix.COPIED_DATA_MESSAGE_SUCCESS}`,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: messageKey,
          content: `${messageMatrix.COPIED_DATA_MESSAGE_ERROR}`,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleCopyToClipboard = () => {
    if (data) {
      navigator.clipboard.writeText(data);
      handleMessage("success");
    } else handleMessage("error");
  };

  return (
    <Tooltip title="Copy to Clipbord">
      <Button
        onClick={handleCopyToClipboard}
        icon={<CopyOutlined />}
        size="small"
        type="text"
        style={{ margin: 5 }}
      />
    </Tooltip>
  );
};

export default CopyButton;
