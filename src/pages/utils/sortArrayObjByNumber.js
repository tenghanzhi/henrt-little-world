import structuredClone from "@ungap/structured-clone";
const sortArrayObjByNumber = (array) => {
  if (array && typeof array === "object") {
    const clonedArray = structuredClone(array);
    return clonedArray.sort((a, b) => {
      return a.attributes?.leetcodeIndex - b.attributes?.leetcodeIndex;
    });
  } else return array;
};
export default sortArrayObjByNumber;
