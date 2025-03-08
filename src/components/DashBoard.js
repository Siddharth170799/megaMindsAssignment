import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./Card";
import InputElement from "./InputElement";
import ButtonElement from "./ButtonElement";
import "./Dashboard.css"; 
import useFetch from "../hooks/useFetch";

const DashBoard = () => {
  const listOfBooks = process.env.REACT_APP_GET_BOOKS;
  const addBook = process.env.REACT_APP_POST_BOOKS
  const { data, fetchingData } = useFetch(
   listOfBooks,
    "GET"
  );
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });

  const inputElements = [
    { name: "title", label: "Title", placeholder: "Enter Title" },
    { name: "author", label: "Author", placeholder: "Enter Author" },
  ];

  const fetchingBooks = async () => {
 
   const postResponse =  await fetchingData(formData,"POST",addBook);

    const getResponse = await fetchingData(null, "GET",listOfBooks);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setBooks(data.data);
  }, [data]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Books</h1>
      </div>

      <div className="input-container">
        {inputElements.map((item, index) => (
          <InputElement
            key={index}
            label={item.label}
            value={formData[item.name]}
            onChange={handleInputChange}
            name={item.name}
            placeholder={item.placeholder}
          />
        ))}
      </div>

      <div className="button-container">
        <ButtonElement onClick={fetchingBooks} label={"Submit"} />
      </div>

      <div className="card-container">
        {books?.map((item, index) => (
          <BookCard key={index} title={item?.Title} author={item?.Author} />
        ))}
      </div>
    </>
  );
};

export default DashBoard;
