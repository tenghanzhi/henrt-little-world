import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import { SET_COMPONENT_TABLE_PAGENATION } from "../../redux/constants";
import style from "./style/ComponentsPagination.module.css";

const ComponentsPagination = () => {
  const dispatch = useDispatch();
  const componentData = useSelector((state) => state.componentData);
  const componentTablePagenation = useSelector(
    (state) => state.componentTablePagenation
  );

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_COMPONENT_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  return (
    <Pagination
      showSizeChanger={true}
      showQuickJumper={true}
      defaultPageSize={
        componentTablePagenation?.size ? componentTablePagenation.size : 25
      }
      defaultCurrent={
        componentTablePagenation?.current ? componentTablePagenation.current : 1
      }
      total={
        componentData.meta?.pagination?.total
          ? componentData.meta?.pagination?.total
          : 0
      }
      onChange={(current, size) => handlePaginationChange(current, size)}
      className={style.lw_components_table_pagination}
    />
  );
};

export default ComponentsPagination;
