import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { Highlight, themes } from "prism-react-renderer";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "600px", margin: "20px auto" }}>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
        style={{
          width: "100%",
          height: "300px",
          fontFamily: "monospace",
          fontSize: "16px",
          padding: "10px",
          margin: 0,
          borderRadius: "4px",
          border: "1px solid #ddd",
          outline: "none",
          overflow: "auto",
          whiteSpace: "pre",
          backgroundColor: "transparent",
          color: "transparent",
          caretColor: "black",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          resize: "none",
        }}
      />
      <Highlight
        theme={themes.vsDark}
        Prism={Prism}
        code={code}
        language="javascript"
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={preRef}
            style={{
              ...style,
              margin: 0,
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
              height: "300px",
              backgroundColor: "#f5f5f5",
              zIndex: 0,
              fontFamily: "monospace",
              fontSize: "16px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeEditor;
