const FactFilter = ({ categories, setCurCategory }) => {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurCategory("all")}
          >
            All
          </button>
        </li>
        {categories.map((curCategory) => (
          <li className="category" key={curCategory.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: curCategory.color }}
              onClick={() => setCurCategory(curCategory.name)}
            >
              {curCategory.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FactFilter;
