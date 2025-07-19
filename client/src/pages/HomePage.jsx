import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../apiPath";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Header from "../components/Header";
import FactList from "../components/FactList";
import FactFilter from "../components/FactFilter";
import FactForm from "../components/FactForm";
import ReactPaginate from "react-paginate";
const HomePage = () => {
  console.log("ss");
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [isLoading, setIsLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [curCategory, setCurCategory] = useState("all");

  const getAllFacts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/facts", {
        params: { curCategory, page: currentPage, limit },
      });
      setFacts(res.data.facts);
      setTotalPages(res.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    getAllFacts();
  }, [curCategory, currentPage]);

  const handleClick = () => {
    setDisplayForm(!displayForm);
  };

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
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
        ) : Array.isArray(facts) && facts.length == 0 ? (
          <p className="loading">
            There are currently no facts in this category...
          </p>
        ) : (
          <div className=" w-full overflow-hidden">
            <FactList facts={facts} categories={CATEGORIES} />
            <ReactPaginate
              forcePage={currentPage}
              pageCount={totalPages}
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              containerClassName="pagination"
              activeClassName="active"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              breakLabel="..."
              breakClassName="page-item"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
