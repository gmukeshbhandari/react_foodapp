import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = import.meta.env.VITE_FOOD_API_KEY;
  // const res = `${URL}?apiKey=${API_KEY}`;
  // console.log(res);
  //The below 3 useState is to handle if API limit is reached and a 402 (Payment Required) is responded or any other error in return.
  const [errorFoodDetail, setErrorFoodDetail] = useState(null);
  const [loadingFoodDetail, setLoadingFoodDetail] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      setLoadingFoodDetail(true);
      setErrorFoodDetail(null); //Resetting error before making a request
      setError(false);
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        if (res.status === 402) {
          throw new Error(
            "API limit reached in this free version. Payment is required. Please make a payment to access this food data for unlimited request."
          );
        }
        // if (!res.ok) {
        //   throw new Error("Something went wrong. Please try again later.");
        // }

        if (!res.ok) {
          switch (res.status) {
            case 400:
              throw new Error("Bad Request. Please check your input.");
            case 401:
              throw new Error("Unauthorized. Please check your API key.");
            case 403:
              throw new Error(
                "Forbidden. You don't have permission to access this resource."
              );
            case 404:
              throw new Error(
                "Not Found. The requested resource could not be found."
              );
            case 500:
              throw new Error("Internal Server Error. Please try again later.");
            case 503:
              throw new Error("Service Unavailable. Please try again later.");
            default:
              throw new Error("Something went wrong. Please try again later.");
          }
        }

        const data = await res.json();
        // console.log(data);
        setFood(data);
        setIsLoading(false);
      } catch (err) {
        //setErrorFoodDetail(err.message);
        setErrorFoodDetail("");
        //Do not display any message like 'API limit reached in this free version. Payment is required. Please make a payment to access this food data for unlimited request.' message as it is already displayed in Search.jsx component below search box.
        //To display message comment on Line setErrorFoodDetail(""); and uncomment line //setErrorFoodDetail(err.message);
        setError(true);
      } finally {
        setLoadingFoodDetail(false);
      }
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      {loadingFoodDetail && <p className={styles.loading}> Loading... </p>}
      {/* Above Line Displays Loading... until errors is shown or food data is displayed. After food data is displayed or error is shown, Loading... will not be displayed*/}
      {error && <p className={styles.error}>{errorFoodDetail}</p>}
      {/* Above Line Shows error (For Example: Bad Request. Please check your input.) if there is error during API call But only displays error <p className={styles.error}> {errorFoodDetail} if error = true */}
      {!loadingFoodDetail && !error && (
        <div className={styles.recipeCard}>
          <h1 className={styles.recipeName}> {food.title}</h1>
          <img className={styles.recipeImage} src={food.image} alt="" />
          <div className={styles.recipeDetails}>
            <span>
              <strong>⏰{food.readyInMinutes} Minutes</strong>
            </span>
            <span>
              👨‍👩‍👧‍👦<strong>Serves {food.servings}</strong>
            </span>
            <span>
              <strong>
                {food.vegetarian ? "🥕 Vegetarian" : "🥩 Non-Vegetarian"}
              </strong>
            </span>
            <span>
              <strong>{food.vegan ? "🐮 Vegan" : ""}</strong>
            </span>
          </div>
          <div>
            💲
            <span>
              {/* <strong>{food.pricePerServing / 130} Per Serving</strong> */}
              <strong>
                {(food.pricePerServing / 130).toFixed(3)} Per Serving
              </strong>
            </span>
          </div>
          <h2>Ingredients</h2>
          <ItemList food={food} isLoading={isLoading} />
          <h2>Instructions</h2>
          <div className={styles.recipeInstructions}>
            {/* console.log(step.ingredients.id); */}
            <ol>
              {isLoading ? (
                <p className={styles.loading}>Loading...</p>
              ) : (
                food.analyzedInstructions &&
                food.analyzedInstructions[0] &&
                food.analyzedInstructions[0].steps.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

FoodDetails.propTypes = {
  foodId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
