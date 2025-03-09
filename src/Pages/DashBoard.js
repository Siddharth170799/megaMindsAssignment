import React, { useContext, useEffect, useRef, useState } from "react";
import BookCard from "../components/Card";
import AddBookForm from "../components/AddBookForm";
import useFetch from "../hooks/useFetch";
import NewContext from "../context/NewContext";
import CircularIndeterminate from "../components/Loader";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { inputElements } from "../data/Data";
import InputElement from "../components/InputElement";
const DashBoard = () => {
  const LIST_OF_BOOKS = process.env.REACT_APP_GET_BOOKS;
  const POST_BOOK_URL = process.env.REACT_APP_POST_BOOKS;
  const { booksData, setBooksData } = useContext(NewContext);
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
  });
  const { data, fetchingData, loading } = useFetch(LIST_OF_BOOKS, "GET");
  const [searchBook, setSearchBook] = useState("");
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const [filteredBooksData, setFilteredBooksData] = useState([]);

  const fetchingBooks = async () => {
    try {
      await fetchingData(formData, "POST", POST_BOOK_URL);
      setBooksData([...booksData, formData]);
    } catch (err) {
      return err.message;
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  const debouncingFunction = () => {
    return function filterBySearch() {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const data = booksData.filter((item) => {
          return item.Title.toLowerCase().includes(searchBook.toLowerCase());
        });

        setFilteredBooksData(data);
      }, 500);
    };
  };

  useEffect(() => {
    if (data.data) {
      setBooksData(data.data);
    }
  }, [data]);

  useEffect(() => {
    const filterFunction = debouncingFunction();
    filterFunction();
  }, [searchBook]);

  return (
    <>
      <Header SubMenu3={"Logout"} handleLogout={handleLogout} />
      <div style={{ textAlign: "center" }}>
        <h3>Books</h3>
      </div>

      <AddBookForm
        inputElements={inputElements}
        formData={formData}
        handleInputChange={handleInputChange}
        onSubmit={fetchingBooks}
      />
      <div style={{ textAlign: "center" }}>
        {" "}
        <InputElement
          onChange={setSearchBook}
          placeholder={"Search By Title"}
        />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <CircularIndeterminate />
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row">
            {filteredBooksData.length > 0
              ? filteredBooksData.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <BookCard title={item?.Title} author={item?.Author} />
                  </div>
                ))
              : booksData?.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <BookCard title={item?.Title} author={item?.Author} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
