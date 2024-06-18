import styles from "./container.module.css";
import PropTypes from "prop-types";

export default function Container({ children }) {
  return <div className={styles.parentContainer}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
