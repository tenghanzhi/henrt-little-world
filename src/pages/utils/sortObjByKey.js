const sortObjByKey = (unorderedObj) => {
  if (unorderedObj && typeof unorderedObj === "object") {
    const orderedObj = Object.keys(unorderedObj)
      .sort()
      .reduce((obj, key) => {
        obj[key] = unorderedObj[key];
        return obj;
      }, {});
    return orderedObj;
  } else return unorderedObj;
};
export default sortObjByKey;
