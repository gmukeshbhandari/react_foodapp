import PropTypes from "prop-types";
import Item from "./Item";
import styles from "./itemlist.module.css";

export default function ItemList({ food, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        food.extendedIngredients &&
        food.extendedIngredients.map((item) => (
          <Item key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

ItemList.propTypes = {
  food: PropTypes.shape({
    extendedIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
