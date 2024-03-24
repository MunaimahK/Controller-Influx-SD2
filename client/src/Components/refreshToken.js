import React from "react";
import { useEffect } from "react";
import axios from "axios";

function useRefreshToken() {
  useEffect(() => {
    const checkToken = async (req, res) => {
      console.log("TEST");
      try {
        const data = await axios.get("http://localhost:8000/").then((res) => {
          console.log(res.data.error);
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, []);
}

export default useRefreshToken;
