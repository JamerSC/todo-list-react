const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        placeholder="Search task ..."
        value={searchTerm} // Declare a state variable...
        onChange={(e) => setSearchTerm(e.target.value)} // ... and update the state variable on any edits!
      />
      <span className="input-group-text">🔍</span>
    </div>
  );
};

export default SearchBar;
