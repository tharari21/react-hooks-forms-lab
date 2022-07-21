import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (event) => {
    // setSearchValue(event.target.value);
    setSearchValue((prevState) => event.target.value);
  };
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") {
      if (searchValue === "") {
        return true;
      } else {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      }
    }

    return (
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchInputChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
