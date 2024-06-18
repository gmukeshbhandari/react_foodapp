import { useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";

function App() {
  const [foodData, setFoodData] = useState([]); //foodData is array as useState([]) has [] But if const [foodData, setFoodData] = useState({}) then foodData will be object as there is {} in useState({})
  const [foodId, setFoodId] = useState("658615");
  return (
    <div>
      <Nav />
      <Search
        setFoodData={setFoodData}
        foodId={foodId.toString()}
        setFoodId={setFoodId}
      />
      <Container>
        <InnerContainer>
          <FoodList setFoodId={setFoodId} foodData={foodData} />
        </InnerContainer>
        <InnerContainer>
          <FoodDetails foodId={foodId} />
        </InnerContainer>
      </Container>
    </div>
  );
}

export default App;
