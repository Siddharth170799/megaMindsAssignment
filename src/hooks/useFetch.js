import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url, type) => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const fetchingData = async (
    body1 = null,
    methodType = type,
    customUrl = url
  ) => {
    setLoading(true)
    try {
      const object = {
        method: methodType,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (body1) {
        object.body = JSON.stringify(body1);
      }
      const response = await fetch(customUrl, object);

      if (response.status === 401 || response.status === 403) {
        navigate("/signIn");
        return;
      }
      const response2 = await response.json();
      setData(response2);

      return response2;
    } catch (err) {
      return err.message
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return { data, fetchingData,loading,setLoading };
};

export default useFetch;
