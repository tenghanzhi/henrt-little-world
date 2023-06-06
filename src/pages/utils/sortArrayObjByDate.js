import structuredClone from "@ungap/structured-clone";
const sortArrayObjByDate = (array) => {
  if (array && typeof array === "object") {
    const clonedArray = structuredClone(array);
    return clonedArray.sort((a, b) => {
      return (
        new Date(b.attributes.startDate) - new Date(a.attributes.startDate)
      );
    });
  } else return array;
};
export default sortArrayObjByDate;
