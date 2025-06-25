import FactFilter from "./components/FactFilter";
import FactForm from "./components/FactForm";
import FactList from "./components/FactList";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import axios from "axios";
import { BASE_URL } from "./apiPath";
const App = () => {
  const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [curCategory, setCurCategory] = useState("all");
  useEffect(() => {
    setIsLoading(true);
    const populateFacts = async () => {
      try {
        const res = await axios.get(BASE_URL + "/facts", {
          params: {
            curCategory,
          },
        });
        setFacts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    populateFacts();
  }, [curCategory]);

  const handleClick = () => {
    setDisplayForm(!displayForm);
  };
  return (
    <div>
      <Header handleClick={handleClick} displayForm={displayForm} />
      {displayForm && <FactForm categories={CATEGORIES} setFacts={setFacts} />}
      <div className="main">
        <FactFilter
          categories={CATEGORIES}
          setCurCategory={setCurCategory}
          setDisplayForm={setDisplayForm}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <FactList facts={facts} categories={CATEGORIES} />
        )}
      </div>
    </div>
  );
};

export default App;
