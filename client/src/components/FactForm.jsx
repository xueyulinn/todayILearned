import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../apiPath";
const FactForm = ({ categories, setDisplayForm, getAllFacts }) => {
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
    if (!fact || fact.length > 150) {
      setError("The length of the fact is between 0 and 150 characters.");
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
      // reset state
      setIsPosting(false);
      setfact("");
      setSource("");
      setCategory("");
      toast.success("Added successfully.");
      // close the form
      setDisplayForm(false);
      getAllFacts();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        maxLength={150}
        placeholder="Share a fact with the world..."
        value={fact}
        onChange={(e) => setfact(e.target.value)}
      />
      <input
        type="url"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <span>{fact.length <= 150 ? 150 - fact.length : 0}</span>
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
