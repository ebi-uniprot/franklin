import React, { useEffect, useCallback } from "react";

function visibleY(el, customCheckCallback) {
  if (!el) {
    return false;
  }

  const rect = el.getBoundingClientRect();
  const { top, bottom } = rect;

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

  return true;
};

const withVisualSensor = Comp => props => {
  const { id, onScrollStart, onVisible, visibilityCheck } = props;

  const onElementScroll = useCallback((event, elementId) => {
    const domEl = document.getElementById(elementId);

    if (onScrollStart) {
      onScrollStart(elementId);
    }

    const isVisible = visibleY(domEl, visibilityCheck);

    if (onVisible) {
      onVisible(elementId, isVisible);
    }
  }, [onScrollStart, onVisible, visibilityCheck]);

  useEffect(() => {
    const container = document.getElementsByClassName('sidebar-layout__content')[0];
    container.addEventListener("scroll", e => onElementScroll(e, id));
  }, [id, onElementScroll]);

  useEffect(
    () => () => {
      if (onVisible) {
        onVisible(id, false);
      }

      if (visibilityCheck) {
        visibilityCheck(id, null);
      }

      window.removeEventListener("scroll", e => onElementScroll(e, id));
    },
    [id, onElementScroll, onVisible, visibilityCheck]
  );

  return <Comp {...props} />;
};

export default withVisualSensor;
