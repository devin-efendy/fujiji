import PropTypes from 'prop-types';
import styles from './Message.module.css';

export default function Message({ message, own }) {
  const messageBody = own
    ? `${styles.message} ${styles.own}`
    : styles.message;

  return (
    <div className={messageBody}>
      <div className={styles.messageTop}>
        <p className={styles.messageText}>{message.message}</p>
      </div>
    </div>
  );
}

Message.propTypes = {
  own: PropTypes.bool,
  message: PropTypes.string,
};
