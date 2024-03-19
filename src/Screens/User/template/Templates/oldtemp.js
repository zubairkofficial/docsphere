// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Button, Container, Paper } from "@mui/material";
// import "../Styles/Template1.css";
// import "../Styles/TemplatePreview.css";
// import { data } from "../Data/data";
// import Helpers from "../../../../Config/Helpers";
// import PageLoader from "../../../../Components/Loader/PageLoader";

// const Template1 = () => {
//   const { msgid, tempid } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const getResponse = async () => {
//     try {
//       const decryptedMsgId = Helpers.decryptString(msgid);
//       const decryptedTempId = Helpers.decryptString(tempid);

//       const respdata = await axios.post(
//         `${Helpers.apiUrl}user/msresp`,
//         { msgid: decryptedMsgId, tempid: decryptedTempId },
//         Helpers.authHeaders
//       );

//       return respdata.data;
//     } catch (error) {
//       setError("Failed to load response data: " + error.message);
//       console.error("ERROR::", error);
//     }
//   };

//   const fetchOpenAIResponse = async (apiResponseData) => {
//     setIsLoading(true);
//     try {
//       const prompt = `${apiResponseData.data.message}\nYou put values to above content like {personinfo.first name to name whatever it is}
// {personal_info:{firstName:'',lastName:'',email:'',mobile:'',address:'',city:'',state:'',postal_code:'',
// objective:'',}} \n"."you have to return html code only
// on extra text or comments just return <code>html content</code> only\n${apiResponseData.temp.html}`;

//       const resp = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Helpers.chatApiKey}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-4-1106-preview",
//           messages: [
//             {
//               role: "system",
//               content: "You are a helpful assistant",
//             },
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           temperature: 1,
//           stream: true,
//         }),
//         stream: true,
//       });
//       console.log(resp);

//       const jsonResp = await resp.json(); // Renamed to jsonResp
//       setResponse(jsonResp.choices[0].text);
//       console.log(response);
//     } catch (error) {
//       setError("Failed to fetch OpenAI response: " + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const responseData = await getResponse();
//       if (responseData) {
//         await fetchOpenAIResponse(responseData);
//       }
//     };

//     fetchData();
//   }, [msgid, tempid]);

//   if (isLoading) {
//     return <PageLoader />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return <div dangerouslySetInnerHTML={{ __html: response }} />;
// };

// export default Template1;

// import { Button, Container, Paper } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import "../Styles/Template1.css";
// import "../Styles/TemplatePreview.css";
// import { data } from "../Data/data";
// import Helpers from "../../../../Config/Helpers";
// import axios from "axios";
// import PageLoader from "../../../../Components/Loader/PageLoader";
// import { useParams } from "react-router-dom";
// import JsPDF from "jspdf";
// import OpenAI from "openai";

// const Template1 = () => {
//   const { msgid } = useParams();
//   const { tempid } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [res, setResp] = useState(null);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const getResponse = async () => {
//     const respdata = await axios.post(
//       `${Helpers.apiUrl}user/msresp`,
//       {
//         msgid: Helpers.decryptString(msgid),
//         tempid: Helpers.decryptString(tempid),
//       },
//       Helpers.authHeaders
//     );
//     console.log(respdata.data);
//     return respdata.data;
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const reData = await getResponse();
//         if (reData) {
//           console.log(reData);
//           main(reData);
//         }
//       } catch (error) {
//         setError("Failed to load data");
//         console.error("ERROR::", error);
//       }
//     };

//     fetchData();
//   }, [msgid, tempid]);

//   const openai = new OpenAI({
//     apiKey: Helpers.chatApiKey,
//     dangerouslyAllowBrowser: true,
//   });

//   async function main(resp) {
//     const prompt = `${resp.data.message}\n You put values to above content like {personinfo.first name to name whatever it is}\n you have to return html code only
// no extra text or comments just return <code>html content</code> only\n${resp.temp.html}`;
//     const stream = await openai.chat.completions.create({
//       model: "gpt-4-1106-preview",
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant",
//         },
//         { role: "user", content: prompt },
//       ],
//       stream: true,
//     });
//     for await (const chunk of stream) {
//       setResponse((old) => (old += chunk.choices[0]?.delta?.content || ""));
//       // process.stdout.write(chunk.choices[0]?.delta?.content || "");
//     }
//   }
//   const fetchOpenAI = async (resp) => {
//     setIsLoading(true);
//     try {
//       const prompt = `${resp.data.message}\n You put values to above content like {personinfo.first name to name whatever it is}\n you have to return html code only
// no extra text or comments just return <code>html content</code> only\n${resp.temp.html}`;

//       // const response = await fetch(
//       //   "https://api.openai.com/v1/chat/completions",
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //       Authorization: `Bearer ${Helpers.chatApiKey}`,
//       //     },
//       //     body: JSON.stringify({
//       //       model: "gpt-4-1106-preview",
//       //       messages: [
//       //         {
//       //           role: "system",
//       //           content: "You are a helpful assistant",
//       //         },
//       //         {
//       //           role: "user",
//       //           content: prompt,
//       //         },
//       //       ],
//       //       temperature: 1,
//       //       stream: true,
//       //     }),
//       //     stream: true,
//       //   }
//       // );
//       console.log(response);
//       const responseData = await response.json();
//       setResponse(responseData.choices[0].text);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <PageLoader />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>OpenAI Response:</h1>
//       <div dangerouslySetInnerHTML={{ __html: response }} />
//       {/* <p>{response}</p> */}
//     </div>
//   );
// };
