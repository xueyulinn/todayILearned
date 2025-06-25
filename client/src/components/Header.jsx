const Header = ({ handleClick, displayForm }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="a logo image" />
        <h1>Today I Learned</h1>
      </div>

      <button className="btn btn-large btn-open" onClick={handleClick}>
        {displayForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
};

export default Header;
