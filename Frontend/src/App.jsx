// import { useState, useEffect } from 'react'
// import "prismjs/themes/prism-tomorrow.css"
// import Editor from "react-simple-code-editor"
// import prism from "prismjs"
// import Markdown from "react-markdown"
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios'
// import './App.css'

// function App() {
//   const [ count, setCount ] = useState(0)
//   const [ code, setCode ] = useState(` function sum() {
//   return 1 + 1
// }`)

//   const [ review, setReview ] = useState(``)

//   useEffect(() => {
//     prism.highlightAll()
//   }, [])

//   async function reviewCode() {
//     const response = await axios.post('http://localhost:3000/ai/get-review', { code })
//     setReview(response.data)
//   }

//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={code => setCode(code)}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%"
//               }}
//             />
//           </div>
//           <div
//             onClick={reviewCode}
//             className="review">Review</div>
//         </div>
//         <div className="right">
//           <Markdown

//             rehypePlugins={[ rehypeHighlight ]}

//           >{review}</Markdown>
//         </div>
//       </main>
//     </>
//   )
// }



// export default App

import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("⚠️ Failed to fetch review. Please try again.");
    }
  }

  return (
    <>
      {/* Navbar */}
      <div className="navbar">Code Reviewer</div>

      {/* Main Container */}
      <main>
        {/* Code Editor Section */}
        <div className="left">
          <div className="code-container">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                minHeight: "200px", // Minimum height
                maxHeight: "500px", // Prevent excessive height
                width: "100%",
                overflowY: "auto", // Enable vertical scrolling
                whiteSpace: "pre-wrap", // Prevent horizontal scrolling
                backgroundColor: "#0c0c0c",
                color: "#ffffff",
              }}
            />
          </div>
          <button onClick={reviewCode} className="review">
            Review Code
          </button>
        </div>

        {/* Code Review Section */}
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
