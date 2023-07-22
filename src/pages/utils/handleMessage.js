import { message } from "antd";

const handleMessage = (key, type, content, action) => {
  const messageDuration = 2;

  switch (type) {
    case "loading": {
      message.loading({
        key: key ? key : "Default",
        content: content ? content : "Loacing...",
        onClose: action ? action : null,
      });
      break;
    }
    case "success": {
      message.success({
        key: key ? key : "Default",
        content: content ? content : "Success",
        duration: messageDuration,
        onClose: action ? action : null,
      });
      break;
    }

    case "error": {
      message.error({
        key: key ? key : "Default",
        content: content ? content : "Error",
        duration: messageDuration,
        onClose: action ? action : null,
      });
      break;
    }
    default:
      return null;
  }
};

export default handleMessage;
