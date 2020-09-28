import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WarningIcon from '../svg/warning.svg';
import WarningTriangleIcon from '../svg/warning-triangle.svg';
import ErrorIcon from '../svg/error.svg';
import CloseIcon from '../svg/times.svg';

import '../styles/components/message.scss';

const MessageLevel = {
  warning: 'warning',
  failure: 'failure',
  success: 'success',
  info: 'info',
};

const iconSize = '1.125em';

const Message = ({
  children,
  level,
  subtitle,
  onDismiss,
  noIcon,
  noShadow,
  forFullPage,
  'data-testid': dataTestId,
}) => {
  let maybeIcon = null;
  if (!noIcon && !forFullPage) {
    maybeIcon = <WarningIcon width={iconSize} height={iconSize} />;
    if (level === 'warning') {
      maybeIcon = <WarningTriangleIcon width={iconSize} height={iconSize} />;
    } else if (level === 'failure') {
      maybeIcon = <ErrorIcon width={iconSize} height={iconSize} />;
    }
  }

  return (
    <div
      className={classNames(
        'message',
        `message--${level}`,
        { 'message--no-shadow': noShadow || forFullPage },
        { 'message--for-full-page': forFullPage }
      )}
      role="status"
      data-testid={dataTestId}
    >
      <div className="message__side-border" />

      {maybeIcon}

      <section className="message__content">
        {forFullPage ? <h3>{children}</h3> : <small>{children}</small>}
      </section>

      {onDismiss && (
        <button type="button" className="message__dismiss" onClick={onDismiss}>
          <CloseIcon width="10" height="10" />
        </button>
      )}

      {subtitle && <div className="message__subtitle">{subtitle}</div>}
    </div>
  );
};

Message.propTypes = {
  /**
   * The message body
   */
  children: PropTypes.node.isRequired,
  /**
   * The message level: 'warning', 'failure', 'success', 'info' (default)
   */
  level: PropTypes.oneOf(['warning', 'failure', 'success', 'info']),
  /**
   * The content to appear underneath of the main message
   */
  subtitle: PropTypes.node,
  /**
   * Whether the message can be closed or not
   */
  onDismiss: PropTypes.func,
  /**
   * To hide the default message icon
   */
  noIcon: PropTypes.bool,
  /**
   * To hide the default box shadow
   */
  noShadow: PropTypes.bool,
  /**
   * To apply any specific styles required for messages shown in
   * full-page error pages
   */
  forFullPage: PropTypes.bool,
  /**
   * Custom Test ID
   */
  'data-testid': PropTypes.string,
};

Message.defaultProps = {
  level: MessageLevel.info,
  subtitle: null,
  onDismiss: null,
  noIcon: false,
  noShadow: false,
  forFullPage: false,
  'data-testid': null,
};

export default Message;
