import React, { useRef, useEffect } from "react";

const visibleY = function(el, customCheckCallback) {
// console.log("visible y called");
  if (!el) {
    // console.log("EXIT. no element:", el);
    return false;
  }

  const rect = el.getBoundingClientRect(),
    top = rect.top,
    bottom = rect.bottom;
  // height = rect.height,
  // el = el.parentNode;

  const clientHeight = document.documentElement.clientHeight;

  // console.log("rect:", el.id, top, bottom, top - clientHeight);
  // console.log("client height:", document.documentElement.clientHeight);

  if (customCheckCallback) {
    customCheckCallback(el.id, rect);
  }

  // Check if bottom of the element is off the page
  if (bottom < 150) {
    return false;
  }

  // Check its within the document viewport
  if (top > 150) {
    return false;
  }

  // do {
  //   rect = el.getBoundingClientRect();
  //   if (!top <= rect.bottom) return false;
  //   // Check if the element is out of view due to a container scrolling
  //   if (top + height <= rect.top) return false;
  //   el = el.parentNode;
  // } while (el !== document.body);

  return true;
};

const withVisualSensor = Comp => props => {
  const { id, onScrollStart, onVisible, visibilityCheck } = props;
// console.log("with visual sensor props:", props);
  useEffect(() => {
    // console.log("on mount", id);

    // window.addEventListener("scroll", e => onElementScroll(e, id));
    // window.addEventListener("scroll", e => console.log('scrolling:', id));


    const container = document.getElementsByClassName('sidebar-layout__content')[0];



    container.addEventListener("scroll", e => onElementScroll(e, id));
  }, [id]);

  useEffect(
    () => () => {
      // console.log("on unmount");
      const domEl = document.getElementById(id);

      if (onVisible) {
        onVisible(id, false);
      }

      if (visibilityCheck) {
        visibilityCheck(id, null);
      }

      window.removeEventListener("scroll", e => onElementScroll(e, id));
    },
    []
  );

  function onElementScroll(e, id) {
    const domEl = document.getElementById(id);
// console.log("on element scroll:", id, domEl);
    if (onScrollStart) {
// console.log("got 'onScroll':", onScroll);
      onScrollStart(id);
    }

    if (onVisible) {
      onVisible(id, visibleY(domEl, visibilityCheck));
// console.log("visible el:", id);
    } else if (visibilityCheck) {
      visibleY(domEl, visibilityCheck);
    }
  }

  return <Comp {...props} />;
};

export default withVisualSensor;
