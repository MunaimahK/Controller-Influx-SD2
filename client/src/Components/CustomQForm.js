import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./CustomQForm.css";
import AdminNavbar from "./AdminNavbar";

// thsi fiel essentially should be on Main Server as Pop Up
const CustomQForm = () => {
  /*
  const [questions, setQuestions] = useState([{ question: "q1", answer: "" }]);
  const [data, setData] = useState({
    submit: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/custom-questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const submitQ = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    console.log("SUBMITQ");
    const submit = data;
    console.log("VAL OF SUBMIT:", submit);
    try {
      const data = await axios
        .get(
          "/update-answers",
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: submit,
          },
          true
        )
        .then((res) => {
          setQuestions(res);
          // const sendResponse = await axios.post("")
        });
    } catch (err) {
      console.log(err);
    }
  }; /*
  const qComponent = questions.map((question) => (
    <div className="e1">
      <label id="l">{question.question}</label>
      <input
        onChange={(e) => {
          setData({ ...data, submit: e.target.value });
        }}
      ></input>
      <br />
    </div>
  ));
  return (
    <div>
      <Navbar />
      <form onSubmit={submitQ}>
        {qComponent} <button type="submit">Submit</button>
      </form>
    </div>
  );

  return (
    <div>
      <Navbar />
      <form onSubmit={submitQ}>
        {questions.map((question) => (
          <div className="e1">
            <label id="l">{question.question}</label>
            <input
              onChange={(e) => {
                setData({ ...data, submit: e.target.value });
              }}
            ></input>
            <br />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );*/
  const [currentQ, setCurrentQ] = useState([]);
  const [data, setData] = useState({
    q: "",
  });

  const event = useEffect(() => {
    axios
      .get("http://localhost:8000/display-custom-questions")
      .then((res) => {
        console.log("CQ RETURNED", res.data.customquestion);
        setCurrentQ(res.data.customquestion);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCQList = async (req, res) => {
    console.log("HERE");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const { q } = data;
    console.log("Q", q);
    try {
      const ep = await axios
        .get("/update-custom-questions", {
          params: { q },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const removeQ = async (name, req, res) => {
    console.log("REMOVED");
    //  const qName = name;
    const qID = name;
    console.log(qID);
    try {
      const ep = await axios
        .get("/remove-question", {
          params: { qID },
        })
        .then((res) => {
          console.log("IN DELETE", res.data.customquestion);

          setCurrentQ(res.data.customquestion);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  /*   <div className="dynamic-output-q">
        {currentQ.map((output) => (
          <li id="h1-d">{output.question}</li>
        ))}
      </div> */
  return (
    <div>
      <AdminNavbar />

      <h1>Add a Question to the Current Custom Question Form</h1>
      <div className="dynamic-output-q">
        {currentQ.map((output) => (
          <div>
            <li id="h1-d">
              {output.question}
              <button onClick={() => removeQ(output._id)} className="remove">
                X
              </button>
            </li>
          </div>
        ))}
      </div>
      <br></br>
      <form onSubmit={addToCQList}>
        <div id="add-q-wrapper">
          <label id="l">Question to Add</label>
          <br></br>
          <input
            id="i"
            placeholder="Enter the Question You'd like to add"
            value={data.q || ""}
            onChange={(e) => setData({ ...data, q: e.target.value })}
          ></input>
          <br></br>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CustomQForm;
