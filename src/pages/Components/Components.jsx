import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import ComponentsCard from "./ComponentsCard";
import ComponentTopBtns from "./ComponentTopBtns";
import ComponentsFilter from "./ComponentsFilter";
import ComponentsSorter from "./ComponentsSorter";
import ComponentsPagination from "./ComponentsPagination";
import LwLayout from "../common/LwLayout";
import { SET_COMPONENT_DATA } from "../../redux/constants";
import handleMessage from "../utils/handleMessage";
import style from "./style/Components.module.css";

const Components = () => {
  const dispatch = useDispatch();
  const componentData = useSelector((state) => state.componentData);
  const componentTablePagenation = useSelector(
    (state) => state.componentTablePagenation
  );
  const componentTableSorter = useSelector(
    (state) => state.componentTableSorter
  );
  const componentTableFilter = useSelector(
    (state) => state.componentTableFilter
  );

  useEffect(() => {
    handleGetComponentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentTablePagenation, componentTableSorter, componentTableFilter]);

  const handleGetComponentData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.COMPONENTS_GET_ALL}?pagination[page]=${
          componentTablePagenation.current
        }&pagination[pageSize]=${componentTablePagenation.size}&sort=${
          componentTableSorter.sort
        }${componentTableSorter.order}${
          componentTableFilter.name
            ? `&filters[name][$containsi][0]=${componentTableFilter.name}`
            : ""
        }${
          componentTableFilter.componentType
            ? `&filters[componentType][$containsi][1]=${componentTableFilter.componentType}`
            : ""
        }${
          componentTableFilter.codeType
            ? `&filters[codeType][$containsi][2]=${componentTableFilter.codeType}`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_COMPONENT_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      });
  };

  const pageContent = (
    <Space direction="vertical" wrap>
      <Space wrap className={style.lw_components_top_items_wrapper}>
        <ComponentTopBtns />
        <ComponentsFilter />
        <ComponentsSorter />
      </Space>
      <Space wrap align="center">
        {componentData?.data?.map((data) => (
          <ComponentsCard data={data} key={data.id} />
        ))}
      </Space>
      <ComponentsPagination />
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.COMPONENTS} />;
};

export default Components;
