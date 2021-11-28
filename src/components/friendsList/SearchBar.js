import React from "react";
import './friends.style.css' 



class SearchBar extends React.Component {
  handleChange = (event) => {
    this.props.setSearchField(event.target.value);
  };

  render() {
    
    return (
      <div className="search-bar">
        <label>
          <input
            type="text"
            name="searchInput" 
            placeholder= "Search friends..."
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default SearchBar;