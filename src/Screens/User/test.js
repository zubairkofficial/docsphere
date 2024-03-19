import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Paper } from "@mui/material";
import Helpers from "../../Config/Helpers";
import JsPDF from "jspdf";
import { useParams } from "react-router-dom";

const TestScreen = () => {
  const { temp_id } = useParams();
  const [content, setContent] = useState("<div></div>");
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report
      // .html(document.getElementById(`previewresume`))
      .html(document.getElementById(`downloadtemplate`))
      .then(() => {
        // Save the generated PDF with the specified name
        report.save(`download.pdf`);
      })
      .catch((error) => console.log(error.message));
  };
  const getResponse = async () => {
    try {
      setIsLoading(false);
      const response = await axios.post(
        `${Helpers.apiUrl}user/msresp`,
        {
          temp_id: Helpers.decryptString(temp_id),
        },
        Helpers.authHeaders
      );
      console.log(response.data);
      parseContent(response.data.data, response.data.temp.html); // Call parseContent with the fetched data
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const isObject = (value) => {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  };

  const contentReplace = (keys, object) => {
    let orgData = object.htmlContent;
    keys.forEach((key) => {
      let updated = orgData.replace(`{${key}}`, object[key]);
      orgData = updated;
    });

    return orgData;
  };

  const parseContent = (data, template) => {
    if (!data || !template) return; // Check if data and template are defined

    let orgContent = template;
    Object.entries(data).forEach(([key, value]) => {
      if (isObject(value)) {
        if (Array.isArray(value.data)) {
          let arrayHtml = "";
          value.data.forEach((singleValue) => {
            arrayHtml += `<${value.htmlTag}>${singleValue}</${value.htmlTag}>`;
          });
          let updatedString = orgContent.replace(`{${key}}`, arrayHtml);
          orgContent = updatedString;
        }
      } else if (Array.isArray(value)) {
        let totalContent = "";
        value.forEach((singleValue) => {
          totalContent += contentReplace(Object.keys(singleValue), singleValue);
        });
        let updatedString = orgContent.replace(`{${key}}`, totalContent);
        orgContent = updatedString;
      } else {
        let updatedString = orgContent.replace(`{${key}}`, value);
        orgContent = updatedString;
      }
    });

    setContent(orgContent);
    setIsLoading(true);
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <div className="container">
      <div className="col-4 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
      {isLoading && (
        <div className="col-4 mx-auto my-2">
          <div className="resume-preview-grid-item mt-2">
            <div className="resume-save-container">
              <div className="resume-back-next-container">
                <Button
                  onClick={handleSave}
                  className="contained-btn"
                  variant="contained"
                >
                  Download Pdf
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestScreen;
