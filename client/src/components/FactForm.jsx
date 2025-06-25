import { useState } from "react";
import { BASE_URL } from "../apiPath";
import axios from "axios";
const FactForm = ({ categories, setFacts, setDisplayForm }) => {
  const [fact, setfact] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fact) {
      setError("No fact entered.");
      return;
    } else if (!source || !isValidUrl(source)) {
      setError("Invalid source url");
      return;
    } else if (!category) {
      setError("Invalid category");
      return;
    }
    setError("");

    try {
      setIsPosting(true);
      await axios.post(BASE_URL + "/facts", {
        fact,
        source,
        category,
      });
      const res = await axios.get(BASE_URL + "/facts", {
        params: {
          curCategory: "all",
        },
      });
      setFacts(res.data);
      // reset state
      setIsPosting(false);
      setfact("");
      setSource("");
      setCategory("");
      // close the form
      setDisplayForm(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="fact"
        placeholder="Share a fact with the world..."
        value={fact}
        onChange={(e) => setfact(e.target.value)}
      />
      <input
        type="fact"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <span>{200 - fact.length}</span>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">CATEGORY</option>
        {categories.map((curCategory) => (
          <option key={curCategory.name} value={curCategory.name.toLowerCase()}>
            {curCategory.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isPosting}>
        Post
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default FactForm;
