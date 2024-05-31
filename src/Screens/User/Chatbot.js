import { useEffect, useRef, useState } from "react";
import PageLoader from "../../Components/Loader/PageLoader";
import { Clipboard, Send, ThumbsDown, ThumbsUp } from "react-feather";
import { PromptTemplate } from "@langchain/core/prompts"
import Helpers from "../../Config/Helpers";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatGPTFormatter from "../../Components/ChatgptFormatter";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "../../Components/retriever.js";
import { combineDocs } from "../../Components/combineDocs.js";
import { ChatOpenAI } from "@langchain/openai";
import { useLocation } from 'react-router-dom';

// import { usePDF } from "react-to-pdf";
import MarkdownIt from "markdown-it";
import { jsPDF } from "jspdf";
import Template1 from "./template/Templates/Template1";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { BaseLangChain } from "@langchain/core/language_models/base";

const openAIApiKey = "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";

const md = new MarkdownIt();

const Chatbot = () => {
  const { chatid } = useParams();
  const navigate = useNavigate();
  // const { toPDF, targetRef } = usePDF({ filename: "Download.pdf" });
  const location = useLocation();

  const [pageLoading, setPageLoading] = useState(false);
  const [chat, setChat] = useState({});
  const [isDone, setIsDone] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [file, setFile] = useState(null);
  const [isFirstResponse,setIsFirstResponse] = useState(true)

  const isHistory = location.state ? location.state.isHistory : null;
  console.log("Is History value ",isHistory)
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  const downloadSingleMessagePDF = (message) => {
    const pdf = new jsPDF();
    const margins = { top: 10, bottom: 10, left: 10, right: 10 };
    const pageHeight = pdf.internal.pageSize.height;
    const lineHeight = 10; // Line height for text
    let cursorY = margins.top;

    const splitText = pdf.splitTextToSize(
      message,
      pdf.internal.pageSize.width - margins.left - margins.right
    );

    splitText.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - margins.bottom) {
        pdf.addPage();
        cursorY = margins.top; // Reset the cursor to the top for new page
      }
      pdf.text(margins.left, cursorY, line);
      cursorY += lineHeight;
    });

    pdf.save("download.pdf");
  };
  const template = (id) => {
    navigate(`/user/templates-library/${Helpers.encryptString(id)}`);
  };
  const handleDownload = async (msg) => {
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}user/generateDocx`,
        { msg: msg },
        Helpers.authHeaders
      );
      const downloadElement = document.createElement("a");
      downloadElement.href = `${Helpers.basePath}/${response.data.filePath}`;
      downloadElement.download = "generated_doc.docx";
      downloadElement.target = "_blank";
      document.body.appendChild(downloadElement);
      downloadElement.click();
      delfile(response.data.filePath);
      document.body.removeChild(downloadElement);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  const delfile = async (file) => {
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}user/deletefile`,
        { file: file },
        Helpers.authHeaders
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const getChat = () => {
    if (isDone) {
      setIsDone(false);
      setPageLoading(true);
      axios
        .get(`${Helpers.apiUrl}chat/get/${chatid}`, Helpers.authHeaders)
        .then((response) => {
          setChat(response.data);
          setPageLoading(false);
          if (
            response.data.messages.length === 0 ||
            response.data.chat_message === ""
          ) {
            // getFirstResponse();
            Helpers.toast("success", "File Uploaded Successfully, Now Write something to query");
            


          } else {
            setMessages(response.data.messages);
            setTimeout(() => {
              scrollToBottom();
            }, 500);
          }
        });
    }
  };

  const getFirstResponse = () => {
    setIsLoading(true);
     let msg = {
        message: "Now Your file has been uploaded please Write some query to get Answers",
        user_id: Helpers.authUser.id,
        chat_id: chat.id,
        is_bot: 1,
      };
    setMessages(msg)
    setIsLoading(true);

    // let msg = {
    //   message: "",
    //   user_id: Helpers.authUser.id,
    //   chat_id: chat.id,
    //   is_bot: 1,
    // };
    // let msgs = messages;
    // msgs.push(msg);
    // setMessages(msgs);
    // setTimeout(() => {
    //   scrollToBottom();
    // }, 500);
    // const data = {
    //   chatid: chatid,
    // };
    // const controller = new AbortController();
    // const signal = controller.signal;
    // fetch(`${Helpers.apiUrl}bot/init-response`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify(data),
    //   signal,
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       response.json().then((error) => {
    //         Helpers.toast("error", error.message);
    //         setIsLoading(false);
    //       });
    //     } else {
    //       const reader = response.body.getReader();
    //       const decoder = new TextDecoder();

    //       function processText({ done, value }) {
    //         if (done) {
    //           setIsLoading(false);
    //           return;
    //         }
    //         let text = decoder.decode(value);
    //         if (text.endsWith("[DONE]")) {
    //           text = text.slice(0, -6);
    //         }
    //         let withLines = text.replace(/\\n/g, "\n");
    //         setMessages((prevMessages) => {
    //           const updatedMessages = [...prevMessages];
    //           updatedMessages[0].message += withLines;
    //           return updatedMessages;
    //         });
    //         setTimeout(() => {
    //           scrollToBottom();
    //         }, 500);
    //         reader.read().then(processText);
    //       }
    //       reader.read().then(processText);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("ERROR::", error);
    //     setIsLoading(false);
    //   });
  };

  
const getResponse = async (btnPrompt = "") => {
    if (btnPrompt || userInput) {
      setIsLoading(true);
      let msg = {
        message: btnPrompt ? btnPrompt : userInput,
        user_id: Helpers.authUser.id,
        chat_id: chat.id,
        is_bot: 0,
      };
      let finalPrompt = '';

      // Create a custom logging function
      const logPrompt = (prompt) => {
          finalPrompt = prompt;
          // console.log('Current Prompt:', finalPrompt);
          return prompt; // Return the prompt unchanged
      };
      
      const llm = new ChatOpenAI({ openAIApiKey });
      const standAloneTemplate = `Given a question, convert the question to a standalone question. 
      Question: {question}
      standalone question:`;
      const standAlonePrompt = PromptTemplate.fromTemplate(standAloneTemplate);
      
      const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@docsphere.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
      context: {context}
      question: {question}
      answer:`;
      
      const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
      
      const standAloneQuestionChain = standAlonePrompt.pipe(logPrompt).pipe(llm).pipe(new StringOutputParser());
      
      const retrieverChain = RunnableSequence.from([
        prevResult => prevResult.standalone_question,
        retriever,
        combineDocs,
      ]);
      
      const answerChain = answerPrompt.pipe(logPrompt).pipe(llm).pipe(new StringOutputParser()); // Log the answer prompt
      const chain = RunnableSequence.from([
        {
          standalone_question: standAloneQuestionChain,
          original_input: new RunnablePassthrough(),
        },
        {
          context: retrieverChain,
          question: ({ original_input }) => original_input.question,
        },
        answerChain,
      ]);
      
      const botresponse = await chain.invoke({ 
        question: userInput,
      });
      
      const lastprompt = finalPrompt.value;

      // console.log("Final Prompt:", finalPrompt.value); // Log the final prompt
      // console.log("Response:", botresponse);
      
      let msgs = messages;
      msgs.push(msg);
      setMessages(msgs);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
      const data = new FormData();
      data.append("chatid", chatid);
      data.append("file", file);
      data.append("input", btnPrompt ? btnPrompt : userInput);
      data.append("lastprompt", lastprompt);
      addMessage();
      setUserInput("");
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(`${Helpers.apiUrl}bot/response`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
        // body: JSON.stringify(data),
        signal,
      })
        .then((response) => {
          setFile("");
          if (!response.ok) {
            response.json().then((error) => {
              Helpers.toast("error", error.message);
              setIsLoading(false);
            });
          } else {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            function processText({ done, value }) {
              if (done) {
                setIsLoading(false);
                return;
              }
              let text = decoder.decode(value);
              // let text = botresponse;
              if (text.endsWith("[DONE]")) {
                text = text.slice(0, -6);
              }
              let withLines = text.replace(/\\n/g, "\n");
              // let withLines = text;
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[messages.length - 1].message += withLines;
                return updatedMessages;
              });
              setTimeout(() => {
                scrollToBottom();
              }, 500);
              reader.read().then(processText);
            }
            reader.read().then(processText);

          }
          setIsFirstResponse(false)
        })
        .catch((error) => {
          console.log("ERROR::", error);
          setIsLoading(false);
        });
    } else {
      Helpers.toast("error", "Can't send without input");
    }
};

  const addMessage = () => {
    let msg = {
      message: "",
      user_id: Helpers.authUser.id,
      chat_id: chat.id,
      is_bot: 1,
    };
    let msgs = messages;
    msgs.push(msg);
    setMessages(msgs);
  };

  useEffect(() => {
    getChat();
  }, []);

  return (
    <>
      <div class="nk-content chatbot-mb">
        <div class="container-xl">
          <div class="nk-content-inner">
            {pageLoading ? (
              <PageLoader />
            ) : (
              <div class="nk-content-body">
                <div class="nk-block">
                  {isFirstResponse && !isHistory ? <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#333',
    // padding: '20px',
    // border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
}}>
    Your file has been uploaded successfully. You can now enter your prompt.
</div>
 :messages.map((msg, index) => {
                    return (
                      <div
                        key={index}
                        className={`container chat-box ${
                          msg.is_bot == 0 ? "bg-white" : "bot-bubble"
                        }`}
                      >
                        <div className="row">
                          <div className="col-12">
                            <div className="row align-center">
                              <div className="col-6">
                                <div className="chat-header">
                                  {msg.is_bot == 0 && (
                                    <div>
                                      <img
                                        className="chat-avatar"
                                        src={Helpers.serverImage(
                                          Helpers.authUser.profile_pic
                                        )}
                                        alt=""
                                      />
                                    </div>
                                  )}
                                  {msg.is_bot == 1 && (
                                    <div class="media media-middle media-circle text-bg-primary">
                                      <img src="/app/favicon.png" alt="" />
                                    </div>
                                  )}
                                  <span className="chat-user">
                                    <strong>
                                      {msg.is_bot == 1 ? "DocSphere.AI" : "You"}
                                    </strong>
                                  </span>
                                </div>
                              </div>
                              <div className="col-6 text-right">
                                <div className="chat-actions">
                                  <Clipboard className="pointer" size={20} />
                                  <ThumbsUp
                                    className="pointer ml20"
                                    size={20}
                                  />
                                  <ThumbsDown
                                    className="pointer ml20"
                                    size={20}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="chat-divider"></div>
                          </div>
                          <div className="col-12">
                            {/* <div className="message" ref={targetRef}> */}
                            <div className="message">
                              <ChatGPTFormatter
                                response={msg.message}
                                writing={
                                  messages.length - 1 === index && isLoading
                                }
                              />
                            </div>
                            {msg.is_bot == 1 && (
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn mx-1"
                                  style={{
                                    color: "#d308bd",
                                    border: "1px solid #d308bd",
                                    borderRadius: "20px",
                                  }}
                                  // onClick={() => toPDF()}
                                  onClick={() =>
                                    downloadSingleMessagePDF(msg.message)
                                  }
                                >
                                  Download PDF
                                </button>
                                {msg.id && (
                                  <button
                                    className="btn mx-1"
                                    style={{
                                      color: "#d308bd",
                                      border: "1px solid #d308bd",
                                      borderRadius: "20px",
                                    }}
                                    onClick={() => template(msg.id)}
                                  >
                                    Browse template
                                  </button>
                                )}
                                <button
                                  className="btn"
                                  style={{
                                    color: "#d308bd",
                                    border: "1px solid #d308bd",
                                    borderRadius: "20px",
                                  }}
                                  onClick={() =>
                                    handleDownload(md.render(msg.message))
                                  }
                                >
                                  Download DOCX
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="nk-footer chat-bottom">
        <div className="container-xl">
          <div className="row">
            <div className="col-12 p0">
              <div className="form-group">
                <div className="form-control-wrap">
                  <textarea
                    className="chatbot-input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Write your message..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-control-wrap">
              <div className="d-flex justify-content-end text-right">
                {file ? (
                  <a
                    className="btn pt-1 mx-1"
                    style={{
                      backgroundColor: "#d308bd",
                      color: "#ffffff",
                      borderRadius: "20px",
                    }}
                  >
                    <span className="nk-menu-text">File Selected</span>
                  </a>
                ) : (
                  <a
                    className="btn btn-md pt-1 mx-1"
                    style={{
                      backgroundColor: "#d308bd",
                      color: "#ffffff",
                      borderRadius: "20px",
                    }}
                    onClick={handleIconClick}
                  >
                    <span className="d-none d-md-block nk-menu-icon ">
                      <em
                        className="icon ni ni-upload"
                        style={{ color: "#fff" }}
                      >
                        {" "}
                        <input
                          type="file"
                          className="form-control d-none"
                          id="fileInput"
                          onChange={(e) => setFile(e.target.files[0])}
                          disabled={isLoading}
                        />
                      </em>
                    </span>
                    <span className="nk-menu-text">Upload file</span>
                  </a>
                )}
                <button
                  type="submit"
                  className="btn btn-md btn-primary"
                  style={{
                    backgroundColor: "#671BB3",
                    color: "#ffffff",
                    borderRadius: "20px",
                  }}
                  disabled={isLoading}
                  onClick={() => getResponse("")}
                >
                  <span className="mx-2">Send</span>
                </button>
              </div>
            </div>
            {/* <div className="col-12 p0">
              <div className="row">
                <div className="col-6">
                  {buttons.map((btn, index) => (
                    <button
                      onClick={() => getResponse(btn.prompt)}
                      disabled={isLoading}
                      className={`btn btn-primary btn-sm ${
                        index > 0 && "ml10"
                      }`}
                    >
                      {btn.name}
                    </button>
                  ))}
                </div>
                <div className="col-6 text-right">
                  <small>{userInput.length} / 2000</small>
                  <button
                    className="btn btn-primary btn-sm ml20"
                    disabled={isLoading}
                    onClick={() => getResponse("")}
                  >
                    <Send size={14} /> <span className="ml10">Send</span>
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
