import { useState, forwardRef, useImperativeHandle } from "react";

function WritingText ({text}: {text: string}, ref: React.Ref<{triggerWriting: () => void}>) {
  const [output, setOutput] = useState("");

  useImperativeHandle(ref, () => {
    return {
      triggerWriting() {
        const textLength = text.length;
        console.log('Triggering Text Wrting, text length: ', textLength);
        let currentIndex = 0;
        const writingInterval = setInterval(() => {
          if(currentIndex < textLength) {
            setOutput(text.substring(0, currentIndex));
            currentIndex += 6;
          } else {
            setOutput(text);
            clearInterval(writingInterval);
          }
        }, 40);
      }
    };
  }, [text]);

  return <span style={{fontFamily:"inherit", fontWeight:"inherit", fontSize:"inherit"}}>{output}</span>
}

export default forwardRef(WritingText);