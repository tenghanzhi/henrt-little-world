const handleClickLinkFromHome = (id) => {
  if (id) {
    const element = document.querySelector("#" + id);
    const yOffset = -74;
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else window.scrollTo(0, 0);
};

export default handleClickLinkFromHome;
