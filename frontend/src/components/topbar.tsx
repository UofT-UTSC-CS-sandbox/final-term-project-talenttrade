import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import "./topbar.css";
import { useAuth } from "../utils/AuthService";

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("Need");

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  const { logOut } = useAuth();

  const logoutFunction = async () => {
    closeDropdown();
    const sucess = await logOut();
    console.log(sucess);
    if (sucess! === true) {
      navigate("/login");
    } else {
      alert(sucess);
    }
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
    if (selectedValue == "Need") {
      navigate(`/view-posts-by-category?need=${searchInput}`);
    } else if (selectedValue == "User") {
      navigate(`/search-users?username=${searchInput}`);
    }
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
          <option value="User">User</option>
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
              to="/profile"
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
            <Link to="/login" className="dropdownItem" onClick={logoutFunction}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
}
export default TopBar;
