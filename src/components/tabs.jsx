import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import { v1 } from 'uuid';

import '../styles/components/tabs.scss';

// const Title = ({ children, active, onClick }) => {
//   const handleKeyPress = (key) => {
//     if (key.key === 'Enter') {
//       onClick();
//     }
//   };
//   return (
//     <div
//       data-testid="tab-title"
//       role="button"
//       tabIndex={0}
//       onClick={onClick}
//       onKeyPress={key => handleKeyPress(key)}
//       className={`tabs__header__item ${active ? 'tabs__header__item--active' : ''}`}
//     >
//       {children}
//     </div>
//   );
// };

// const Content = ({ children, active }) => (
//   <div
//     data-testid="tab-content"
//     className={`tabs__content ${active ? 'tabs__content--active' : ''}`}
//   >
//     {children}
//   </div>
// );

// const Tabs = ({ tabData }) => {
//   const [visibleTab, setVisibleTab] = useState(tabData[0].id);
//   return (
//     <Fragment>
//       <div className="tabs">
//         <div className="tabs__header">
//           {tabData.map(({ title, id }) => (
//             <Title key={id} active={visibleTab === id} onClick={() => setVisibleTab(id)}>
//               {title}
//             </Title>
//           ))}
//         </div>
//       </div>
//       <div>
//         {tabData.map(({ content, id }) => (
//           <Content key={id} active={visibleTab === id}>
//             {content}
//           </Content>
//         ))}
//       </div>
//     </Fragment>
//   );
// };

// Title.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
//   active: PropTypes.bool.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

// Content.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
//   active: PropTypes.bool.isRequired,
// };

// Tabs.propTypes = {
//   /**
//    * An array of objects each containing 'title', 'content' and 'id' (which must be unique)
//    */
//   tabData: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
//       content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
//       id: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

// export default Tabs;

// This is just a configuration component, it doesn't need to render anything as
// it will be used by a <Tabs> component
export const Tab = () => null;
Tab.propTypes = {
  /**
   * Title of that tab
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  /**
   * Optional ID for that tab, one of the expected options for the parent <Tabs> component
   */
  id: PropTypes.string,
  /**
   * Content of that tab
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /**
   * Choose that tab as the default to be displayed
   */
  defaultSelected: PropTypes.bool,
};

const tabType = PropTypes.shape({
  type: PropTypes.oneOf([Tab]),
});

export const Tabs = ({ children, active }) => {
  const idRef = useRef(v1());

  const isManaged = typeof active !== 'undefined';
  const tabs = Children.toArray(children).map((child, index) => ({
    title: child.props.title,
    id: typeof child.props.id === 'undefined' ? `${index}` : child.props.id,
    children: child.props.children,
    defaultSelected: child.props.defaultSelected,
  }));

  const [selectedState, setSelectedState] = useState(() => {
    if (isManaged) {
      return active;
    }
    const defaultSelected = tabs.find(tab => tab.defaultSelected);
    if (defaultSelected) {
      return defaultSelected.id;
    }
    return '0';
  });

  useEffect(() => {
    if (isManaged) {
      setSelectedState(active);
    }
  }, [active, isManaged]);

  const handleClick = useCallback(
    event => {
      if (isManaged) {
        return;
      }

      const { target } = event.currentTarget.dataset;
      // mouse click event, or if keyboard event, restrict to 'Enter' and spacebar keys
      if (
        event &&
        (!('key' in event) || event.key === 'Enter' || event.key === ' ')
      ) {
        setSelectedState(target);
      }
    },
    [isManaged]
  );

  const selectedTab = tabs.find(tab => tab.id === selectedState);
  const content = selectedTab.children;

  let unmanagedProps = {};
  // add event listeners in case this is not an externally managed component
  if (!isManaged) {
    unmanagedProps = {
      onClick: handleClick,
      onKeyPress: handleClick,
      tabIndex: 0,
    };
  }

  return (
    <>
      <div className="tabs">
        <div className="tabs__header" role="tablist">
          {tabs.map(({ title, id }) => (
            <div
              key={id}
              data-testid="tab-title"
              data-target={id}
              role="tab"
              aria-controls={idRef.current}
              className={`tabs__header__item${
                id === selectedState ? ' tabs__header__item--active' : ''
              }`}
              {...unmanagedProps}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
      <div role="tabpanel" id={idRef.current} data-testid="tab-content">
        {content}
      </div>
    </>
  );
};
Tabs.propTypes = {
  /**
   * <Tab> elements defining the content and title of each tab
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(tabType), tabType])
    .isRequired,
  /**
   * Optional way of controling the tabs from the outside of this component by
   * assigning here a value corresponding to an 'id' prop of one of the child
   * <Tab>
   */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Tabs.defaultProps = {
  active: undefined,
};
