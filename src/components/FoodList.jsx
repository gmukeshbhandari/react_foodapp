import PropTypes from "prop-types";
import FoodItem from "./FoodItem";

export default function FoodList({ foodData, setFoodId }) {
  return (
    <div>
      {foodData.map((food) => (
        <FoodItem key={food.id} food={food} setFoodId={setFoodId} />
      ))}
    </div>
  );
}

FoodList.propTypes = {
  foodData: PropTypes.array.isRequired,
  setFoodId: PropTypes.func.isRequired,
};
