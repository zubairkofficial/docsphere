import { Button, Container, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../Styles/Template1.css";
import "../Styles/TemplatePreview.css";
import { customData } from "../Data/data";
import Helpers from "../../../../Config/Helpers";
import axios from "axios";
import PageLoader from "../../../../Components/Loader/PageLoader";
import { useParams } from "react-router-dom";
import JsPDF from "jspdf";
import OpenAI from "openai";

const Template1 = () => {
  const { msgid, tempid } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [downloadPdf, setDownloadPdf] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [res, setRes] = useState(null);
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  const handleSave = () => {
    setError("");
    setLoading(true);
    const report = new JsPDF("portrait", "pt", "a4");
    report
      // .html(document.getElementById(`previewresume`))
      .html(document.getElementById(`downloadtemplate`))
      .then(() => {
        // Save the generated PDF with the specified name
        report.save(`download.pdf`);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };
  const getResponse = async () => {
    const respdata = await axios.post(
      `${Helpers.apiUrl}user/msresp`,
      {
        msgid: Helpers.decryptString(msgid),
        tempid: Helpers.decryptString(tempid),
      },
      Helpers.authHeaders
    );
    return respdata.data;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reData = await getResponse();
        if (reData) {
          main(reData);
        }
      } catch (error) {
        setError("Failed to load data");
        console.error("ERROR::", error);
      }
    };

    fetchData();
  }, [msgid, tempid]);

  const openai = new OpenAI({
    apiKey: Helpers.chatApiKey,
    dangerouslyAllowBrowser: true,
  });

  async function main(resp) {
    const prompt = `${resp.data.message}\nYou put values to above content like  {personinfo.first name to name whatever it si} and no need to change the html div and style \n"."you have to return html code only
                     on extra text or comments just return <code>html content</code> only\n${resp.temp.html}`;
    const stream = await openai.chat.completions.create(
      {
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant",
          },
          { role: "user", content: prompt },
        ],
        stream: true,
        temperature: 1.0,
        presence_penalty: 0.6,
        frequency_penalty: 0,
      },
      {
        timeout: 10 * 1000,
      }
    );
    console.log(stream);
    for await (const chunk of stream) {
      let data = chunk.choices[0]?.delta?.content
        ? chunk.choices[0]?.delta?.content
            .replace(/`/g, "")
            .replace(/html/g, "")
        : "";
      setResponse((old) => (old += data || ""));
      setTimeout(() => {
        scrollToBottom();
      }, 500);
      // process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    setDownloadPdf(true);
  }
  // const getResponse = async () => {
  //   // const temp = await axios.get(
  //   //   `${Helpers.apiUrl}template/single/${Helpers.decryptString(tempid)}`,
  //   //   Helpers.authHeaders
  //   // );

  //   // console.log(temp);
  //   // setRes(temp.data);
  //   try {
  //     const response = await axios.post(
  //       `${Helpers.apiUrl}user/msgresponse`,
  //       {
  //         msgid: Helpers.decryptString(msgid),
  //         tempid: Helpers.decryptString(tempid),
  //         data: customData,
  //       },
  //       Helpers.authHeaders
  //     );
  //     console.log(response);
  //     let dat = response.data.replace(/`/g, "");
  //     let d = dat.replace(/html/g, "");
  //     console.log(d);
  //     console.log(response);

  //     // const json = JSON.parse(d);
  //     setRes(d);
  //     // console.log(json);
  //   } catch (error) {
  //     console.log("ERROR::", error);
  //   }
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await getResponse();
  //     } catch (error) {
  //       setError("Failed to load data");
  //       console.error("ERROR::", error);
  //     } finally {
  //       setPageLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [msgid, tempid]);
  return (
    <>
      {error && <div className="error-message">{error}</div>}
      {/* {!error &&
        (pageLoading ? (
          <PageLoader />
        ) : ( */}
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: response }}
          id="downloadtemplate"
        />
        {downloadPdf && (
          <div className="resume-preview-grid-item mt-2">
            <div className="resume-save-container">
              <div className="resume-back-next-container">
                <Button
                  onClick={handleSave}
                  className="contained-btn"
                  variant="contained"
                  disabled={loading}
                >
                  Download Pdf
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ))} */}
    </>
  );
};
export default Template1;
