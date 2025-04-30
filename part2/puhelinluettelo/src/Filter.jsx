const Filter = ({ searchText, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input value={searchText} onChange={handleSearch} type="text" />
    </div>
  );
};

export default Filter;
