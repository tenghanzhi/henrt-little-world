import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button, Tooltip } from "antd";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import { SET_SELECTED_COMPONENT_ID } from "../../redux/constants";
import style from "./style/ComponentsCard.module.css";

const ComponentsCard = (props) => {
  const data = props?.data ? props.data : null;
  const cssCode = data?.attributes?.cssCode
    ? data?.attributes?.cssCode
    : "<style></style>";
  const jsCode = data?.attributes?.jsCode
    ? data?.attributes?.jsCode
    : "<script></script>";
  const htmlCode = data?.attributes?.htmlCode
    ? data?.attributes?.htmlCode
    : "<head></head><body></body>";

  const indexHead = htmlCode?.indexOf("</head>");
  const combinedCssCode = `${htmlCode?.slice(0, indexHead)}
  <style>${cssCode}</style>
  ${htmlCode?.slice(indexHead)}`;

  const indexBody = combinedCssCode?.indexOf("</body>");
  const combinedJsCode = `${combinedCssCode?.slice(0, indexBody)}
  <script>${jsCode}</script>
  ${combinedCssCode?.slice(indexBody)}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);

  const handleBtnOnClick = (type) => {
    switch (type.toLowerCase()) {
      case "edit":
        dispatch({ type: SET_SELECTED_COMPONENT_ID, payload: data.id });
        navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editComponents`);
        break;
      case "detail":
        dispatch({ type: SET_SELECTED_COMPONENT_ID, payload: data.id });
        navigate(
          `/${categoryMatrix.COMPONENTS.toLowerCase()}/reviewComponents/${
            data.id
          }`
        );
        break;
      default:
        break;
    }
  };

  const cardExtra = (
    <>
      <Tooltip
        title={
          !userInfoData.jwt ? "Please login with admin account to edit" : ""
        }
      >
        <Button
          type="default"
          onClick={() => handleBtnOnClick("edit")}
          disabled={!userInfoData.jwt}
        >
          Edit
        </Button>
      </Tooltip>
      <Button
        className={style.lw_components_card_extra_btn}
        type="default"
        onClick={() => handleBtnOnClick("detail")}
      >
        Detail
      </Button>
    </>
  );

  return (
    <Card
      className={style.lw_components_homecard}
      title={data?.attributes?.name}
      extra={cardExtra}
      bordered={false}
      loading={!data}
      headStyle={{
        color: globalStyleMatrix.COLORS.mainFontColor,
        fontSize: globalStyleMatrix.FONT_SIZE.titleFontSize,
        fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeightLighter,
      }}
      bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
    >
      <iframe
        className={style.lw_components_homecard_iframe}
        title={data?.attributes?.name}
        srcDoc={combinedJsCode}
      >
        <p>Your broser does not support iframe tag</p>
      </iframe>
    </Card>
  );
};

export default ComponentsCard;
