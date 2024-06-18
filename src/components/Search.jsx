import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_FOOD_API_KEY;

export default function Search({ setFoodData, foodId, setFoodId }) {
  const [query, setQuery] = useState("pizza");
  //The below 2 useState is to handle if API limit is reached and a 402 (Payment Required) is responded in return.
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Syntax of the useEffect hook is useEffect(() => {}, []);
  // =>{...} gets executed always for first time automatically if dependencies i.e [] is empty. But since query is on dependencies i.e on [] only when query state is changed i.e user changes input by typing then code after => i.e => {...} gets executed
  useEffect(() => {
    async function fetchFood() {
      setLoading(true);
      setError(null); //Resetting error before making a request
      try {
        const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
        //res is result or respond give by https://api.spoonacular.com/recipes/complexSearch?query=pizza&apiKey=API_KEY in JSON Format. we need to decode this JSON format data by doing res.json() to display food items
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
        //console.log(data);
        //console.log(data.results);
        //async and await is used since fetch(`${URL}?query=${query}&apiKey=${API_KEY}`); takes some time give output so res.json(); will give error since it is executed immediately and const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`); haven't given any output. so async and await is used which is javascript function.
        setFoodData(data.results);
        const final = data.results;
        if (data.results.length > 0) {
          setFoodId(final[0].id);
        } else {
          setFoodId(foodId); // Set default value if no valid id found
        }
      } catch (err) {
        setError(err.message);
        setFoodData([]); //Clear the food data on error
        // setFoodId("658615"); //default value of foodId
        setFoodId(foodId); //current value of foodId
      } finally {
        setLoading(false);
      }
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
      />
      {loading && <p className={styles.loading}> Loading... </p>}
      {/* Above Line Displays Loading... until errors is shown or food data is displayed. After food data is displayed or error is shown, Loading... will not be displayed*/}
      {error && <p className={styles.error}> {error} </p>}
      {/* Above Line Shows error (For Example: Bad Request. Please check your input.) if there is error during API call But only displays error <p className={styles.error}> {error} if error = true */}
    </div>
  );
}

Search.propTypes = {
  foodId: PropTypes.string.isRequired,
  setFoodData: PropTypes.func.isRequired,
  setFoodId: PropTypes.func.isRequired,
};
