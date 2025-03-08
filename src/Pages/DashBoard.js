// import React, { useContext, useEffect, useState } from "react";
// import BookCard from "./Card";
// import AddBookForm from "./AddBookForm";
// import "./Dashboard.css";
// import useFetch from "../hooks/useFetch";
// import NewContext from "../context/NewContext";

// const DashBoard = () => {
//   const { booksData, setBooksData } = useContext(NewContext);
//   const [formData, setFormData] = useState({
//     Title: "",
//     Author: "",
//   });

//   const LIST_OF_BOOKS = process.env.REACT_APP_GET_BOOKS;
//   const POST_BOOK_URL = process.env.REACT_APP_POST_BOOKS;
//   const { data, fetchingData } = useFetch(LIST_OF_BOOKS, "GET");

//   const inputElements = [
//     { name: "Title", label: "Title", placeholder: "Enter Title" },
//     { name: "Author", label: "Author", placeholder: "Enter Author" },
//   ];

//   const fetchingBooks = async () => {
//     await fetchingData(formData, "POST", POST_BOOK_URL);
//     setBooksData([...booksData, formData]);
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     setBooksData(data.data);
//   }, [data]);

//   return (
//     <>
//       <div style={{ textAlign: "center" }}>
//         <h1>Books</h1>
//       </div>

//       <AddBookForm
//         inputElements={inputElements}
//         formData={formData}
//         handleInputChange={handleInputChange}
//         onSubmit={fetchingBooks}
//       />

//       <div className="card-container">
//         {booksData?.map((item, index) => (
//           <BookCard key={index} title={item?.Title} author={item?.Author} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default DashBoard;
import React, { useContext, useEffect, useState } from "react";
import BookCard from "../components/Card";
import AddBookForm from "../components/AddBookForm";

import useFetch from "../hooks/useFetch";
import NewContext from "../context/NewContext";

const DashBoard = () => {
  const { booksData, setBooksData } = useContext(NewContext);
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
  });

  const LIST_OF_BOOKS = process.env.REACT_APP_GET_BOOKS;
  const POST_BOOK_URL = process.env.REACT_APP_POST_BOOKS;
  const { data, fetchingData } = useFetch(LIST_OF_BOOKS, "GET");

  const inputElements = [
    { name: "Title", label: "Title", placeholder: "Enter Title" },
    { name: "Author", label: "Author", placeholder: "Enter Author" },
  ];

  const fetchingBooks = async () => {
    await fetchingData(formData, "POST", POST_BOOK_URL);
    setBooksData([...booksData, formData]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setBooksData(data.data);
  }, [data]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Books</h1>
      </div>

      <AddBookForm
        inputElements={inputElements}
        formData={formData}
        handleInputChange={handleInputChange}
        onSubmit={fetchingBooks}
      />

      <div className="container mt-4">
        <div className="row">
          {booksData?.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <BookCard title={item?.Title} author={item?.Author} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
