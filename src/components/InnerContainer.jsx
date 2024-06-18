import PropTypes from "prop-types";
import styles from "./innercontainer.module.css";
export default function InnerContainer({ children }) {
  return <div className={styles.innerContainer}>{children}</div>;
}

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
