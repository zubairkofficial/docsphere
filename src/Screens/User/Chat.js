import "../../App.css";
import useTitle from "../../Hooks/useTitle";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { Clipboard, Send, ThumbsDown, ThumbsUp } from "react-feather";
import { usePDF } from "react-to-pdf";
import MarkdownIt from "markdown-it";
import ChatGPTFormatter from "../../Components/ChatgptFormatter";
import PageLoader from "../../Components/Loader/PageLoader";
const md = new MarkdownIt();

const Chat = () => {
  useTitle("Chat");

  const { toPDF, targetRef } = usePDF({ filename: "Download.pdf" });
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const messagesEndRef = useRef(null);
  const [file, setFile] = useState(null);
  const [msgid, setMsgid] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  // var storedData = localStorage.getItem("prompt");
  // if (storedData !== null) {
  //   var parsedData = JSON.parse(storedData);
  //   setMessage(parsedData.message + parsedData.instructions);
  //   setFile(parsedData.file);
  // }
  const handleDownload = async (msg) => {
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}user/generateDocx`,
        { msg: msg },
        Helpers.authHeaders
      );
      console.log(response);
      const downloadElement = document.createElement("a");
      downloadElement.href = `${Helpers.basePath}/${response.data.filePath}`;
      downloadElement.download = "generated_doc.docx";
      downloadElement.target = "_blank";
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (message) {
      setIsLoading(true);
      setPageLoading(true);
      if (message.trim() === "") {
        return;
      }
      console.log(file);
      try {
        setIsLoading(true);

        await axios
          .post(
            `${Helpers.apiUrl}user/chatbot`,
            { message: message, chatId: chatId, file: file },
            Helpers.authFileHeaders
          )
          .then((response) => {
            const fileInput = document.getElementById("fileInput");
            if (fileInput) {
              fileInput.value = "";
            }
            setFile(null);
            console.log(response);
            setChatId(response.data.chatId);
            setMsgid(response.data.msgid);
            const choices = response.data.data.choices || [];
            const sentMessage = { type: "right", text: message, is_bot: 0 };

            let receivedMessage;
            if (choices.length > 0) {
              receivedMessage = {
                type: "left",
                is_bot: 1,
                text: choices[0].message.content,
                id: response.data.msgid,
              };
            } else {
              receivedMessage = {
                type: "left",
                text: "No response from the server.",
              };
            }

            setMessages([...messages, sentMessage, receivedMessage]);
            Helpers.toast("success", response.data.message);
            setTimeout(() => {
              scrollToBottom();
            }, 500);
            setIsLoading(false);
            setPageLoading(false);
            setMessage("");
          })
          .catch((error) => {
            Helpers.toast("error", error.response.data.message);
            setErrors(error.response.data.errors || {});
            setPageLoading(false);
            setIsLoading(false);
          });
      } catch (error) {
        setErrors(error.response?.data?.errors || {});
        setIsLoading(false);
        console.error("Error submitting message:", error);
      }
    } else {
      Helpers.toast("error", "Can't send without input");
    }
  };

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
                          msg.is_bot === 0 ? "bg-white" : "bot-bubble"
                        }`}
                      >
                        <div className="row">
                          <div className="col-12">
                            <div className="row align-center">
                              <div className="col-6">
                                <div className="chat-header">
                                  {msg.is_bot === 0 && (
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
                                  {msg.is_bot === 1 && (
                                    <div class="media media-middle media-circle text-bg-primary">
                                      <img src="/app/favicon.png" alt="" />
                                    </div>
                                  )}
                                  <span className="chat-user">
                                    <strong>
                                      {msg.is_bot === 1
                                        ? "DocSphere.AI"
                                        : "You"}
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
                            <div className="message" ref={targetRef}>
                              <ChatGPTFormatter
                                response={msg.text}
                                writing={
                                  messages.length - 1 === index && isLoading
                                }
                              />
                            </div>
                            {msg.type === "left" && (
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn mx-1"
                                  style={{
                                    color: "#d308bd",
                                    border: "1px solid #d308bd",
                                    borderRadius: "20px",
                                  }}
                                  onClick={() => toPDF()}
                                >
                                  Download PDF
                                </button>
                                <button
                                  className="btn"
                                  style={{
                                    color: "#d308bd",
                                    border: "1px solid #d308bd",
                                    borderRadius: "20px",
                                  }}
                                  onClick={() =>
                                    handleDownload(md.render(msg.text))
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
                    // }
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
                <form onSubmit={(event) => handleSubmit(event)}>
                  <textarea
                    className="chatbot-input"
                    placeholder="Enter a Prompt here"
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
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
                          backgroundColor: "#671AB3",
                          color: "#ffffff",
                          borderRadius: "20px",
                        }}
                        disabled={isLoading}
                      >
                        <span className="mx-2">Send</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
