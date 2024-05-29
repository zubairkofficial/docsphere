import { useEffect, useRef, useState } from "react";
import PageLoader from "../../Components/Loader/PageLoader";
import { Clipboard, Send, ThumbsDown, ThumbsUp } from "react-feather";
import Helpers from "../../Config/Helpers";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatGPTFormatter from "../../Components/ChatgptFormatter";
// import { usePDF } from "react-to-pdf";
import MarkdownIt from "markdown-it";
import { jsPDF } from "jspdf";
import Template1 from "./template/Templates/Template1";
const md = new MarkdownIt();

const Chatbot = () => {
  const { chatid } = useParams();
  const navigate = useNavigate();
  // const { toPDF, targetRef } = usePDF({ filename: "Download.pdf" });
  const [pageLoading, setPageLoading] = useState(false);
  const [chat, setChat] = useState({});
  const [isDone, setIsDone] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [file, setFile] = useState(null);

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

  const getResponse = (btnPrompt = "") => {
    if (btnPrompt || userInput) {
      setIsLoading(true);
      let msg = {
        message: btnPrompt ? btnPrompt : userInput,
        user_id: Helpers.authUser.id,
        chat_id: chat.id,
        is_bot: 0,
      };
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
              if (text.endsWith("[DONE]")) {
                text = text.slice(0, -6);
              }
              let withLines = text.replace(/\\n/g, "\n");
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
                  {messages.map((msg, index) => {
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
