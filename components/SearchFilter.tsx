import React, { useEffect, useState } from "react";
import styles from "./searchFilter.module.css";

interface Props {
  intialList: any[];
  dataList: any[];
  setList: any;
  product?: boolean;
  productVersion?: boolean;
  ticket?: boolean;
}

const SearchFilter = ({
  dataList,
  setList,
  intialList,
  product,
  productVersion,
  ticket,
}: Props) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e: any) => {
    setFilterText(e.target.value);
  };

  const filterProducts = () => {
    if (product || productVersion) {
      return dataList.filter((data) =>
        data.name.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (ticket) {
      return dataList.filter((data) =>
        data.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  };
  const getSearchPlaceholder = () => {
    if (product) {
      return "Buscar por nombre";
    } else if (productVersion) {
      return "Buscar por nombre";
    } else if (ticket) {
      return "Buscar por título";
    }
  };

  useEffect(() => {
    const filteredProducts = filterProducts();
    if (filterText == "") {
      setList(intialList);
    } else {
      setList(filteredProducts);
    }
  }, [filterText]);

  return (
    <input
      className={styles.inputContainer}
      type="text"
      placeholder={getSearchPlaceholder()}
      value={filterText}
      onChange={handleFilterChange}
    />
  );
};

export default SearchFilter;
