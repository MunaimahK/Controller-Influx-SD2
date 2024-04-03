import React from "react";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
import MarkDown from "markdown-to-jsx";
import markdownContent from "./About.md"; // Import your Markdown file
import { useState, useEffect } from "react";
const MD = ({ filename }) => {
  // const filename = "About.md";
  const [post, setPost] = useState("");

  useEffect(() => {
    import(`./${filename}`)
      .then((res) => {
        console.log(res);
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  //const [markdownContent, setMarkdownContent] = useState("");
  //setMarkdownContent(fetch("./About.md"));
  /*
  useEffect(() => {
    fetch("About.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch Markdown file: ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error("Error fetching Markdown:", error));
  }, []);*/
  return <MarkDown>{post}</MarkDown>;
};

export default MD;
