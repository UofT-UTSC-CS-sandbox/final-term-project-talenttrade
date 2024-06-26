import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import "./topbar.css";

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('need'); // Default value in lower case

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value.toLowerCase());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const navigateCreate = () => {
    navigate("/CreatePost", { state: { create: true } });
  };

  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/view-posts-by-category?${selectedValue.toLowerCase()}=${searchInput}`,  { state: { create: true } });
  };

  return (
    <div className="container">
      <div className="logo">
        <Link to="/" className="link">
          TalentTrade
        </Link>
      </div>
      <div className="searchContainer">
        <select className="filterDropdown" onChange={handleOptionChange}>
          <option value="Need">Need</option>
          <option value="Offer">Offer</option>
        </select>
        <form
          role="search"
          id="form"
          className="search"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search"
            className="searchBar"
            value={searchInput}
            onChange={handleChange}
          />
          <button type="submit" className="submit-button">
            Go
          </button>
        </form>
      </div>
      <button className="makePostButton" onClick={navigateCreate}>
        Make a post
      </button>
      {/* <Link className="makePostButton" to="/CreatePost">Make a post</Link> */}

      <div className="profileContainer">
        <img
          src="/Default_pfp.png"
          alt="Profile"
          className="profileIcon"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="dropdown">
            <Link
              to="/MyProfile"
              className="dropdownItem"
              onClick={closeDropdown}
            >
              My Profile
            </Link>
            <Link
              to="/MyListings"
              className="dropdownItem"
              onClick={closeDropdown}
            >
              My Listings
            </Link>
            <Link to="/Logout" className="dropdownItem" onClick={closeDropdown}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
