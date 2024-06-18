import PropTypes from "prop-types";
import styles from "./item.module.css";

export default function Item({ item }) {
  return (
    <div>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
            alt=""
          />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{item.name} </div>
          <div className={styles.amount}>
            {item.amount} {item.unit}
          </div>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
};
