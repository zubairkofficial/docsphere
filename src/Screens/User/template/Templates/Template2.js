import { Button, Container, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../Styles/Template1.css";
import "../Styles/TemplatePreview.css";
import { data } from "../Data/data";
import Helpers from "../../../../Config/Helpers";
import axios from "axios";
import PageLoader from "../../../../Components/Loader/PageLoader";
import { useParams } from "react-router-dom";
import JsPDF from "jspdf";

const Template1 = () => {
  const { msgid } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [personalinfo, setPersonalinfo] = useState(null);
  const [workexperience, setWorkexperience] = useState(null);
  const [educationinfo, setEducationinfo] = useState(null);
  const [skills, setSkills] = useState(null);
  const [certifications, setCertifications] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSave = () => {
    setError("");
    setLoading(true);
    const report = new JsPDF("portrait", "pt", "a4");
    report
      .html(document.getElementById(`previewresume`))
      .then(() => {
        // Save the generated PDF with the specified name
        report.save(`download.pdf`);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };
  const getResponse = async () => {
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}user/msgresponse`,
        { msgid: Helpers.decryptString(msgid), data: data },
        Helpers.authHeaders
      );
      let dat = response.data.replace(/`/g, "");
      let d = dat.replace(/json/g, "");
      console.log(d);
      console.log(response);
      const json = JSON.parse(d);
      console.log(json);

      setPersonalinfo(json.personal_info);
      setWorkexperience(json.work_experience);
      setEducationinfo(json.education_details);
      setCertifications(json.Certifications);
      setSkills(json.key_skills);
    } catch (error) {
      console.log("ERROR::", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getResponse();
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {pageLoading ? (
        <PageLoader />
      ) : (
        <Container
          sx={{
            padding: {
              xs: "40px 20px",
              md: "60px 80px",
            },
          }}
          className="preview-container"
        >
          <h2 className="preview-header-title">Resume Preview</h2>
          <div className="resume-preview-grid-container">
            <div className="resume-preview-grid-item" id="previewresume">
              <Paper
                sx={{
                  width: {
                    xs: "350px",
                    sm: "400px",
                    md: "450px",
                    lg: "500px",
                    xl: "550px",
                  },
                  height: {
                    xs: "500px",
                    sm: "550px",
                    md: "600px",
                    lg: "650px",
                    xl: "700px",
                  },
                }}
              >
                <div style={{ backgroundColor: "white" }}>
                  <div className="header-tem">
                    <div className="header-tem-first">
                      <div className="template-user-details-cont">
                        {personalinfo ? (
                          <h2
                            style={{ color: "#C98A55" }}
                            className="template-user-name"
                          >
                            {personalinfo.firstName +
                              " " +
                              personalinfo.lastName}
                          </h2>
                        ) : (
                          ""
                        )}
                        <p
                          style={{ color: "black" }}
                          className="template-user-designation"
                        >
                          {workexperience && workexperience.length > 0
                            ? workexperience[0].jobTitle
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {personalinfo && (
                    <p
                      style={{ color: "#C98A55" }}
                      className="template-user-about"
                    >
                      <span>Email: </span>
                      {personalinfo.email ? personalinfo.email : ""}
                    </p>
                  )}

                  {personalinfo && (
                    <p
                      style={{ color: "#C98A55" }}
                      className="template-user-about"
                    >
                      <span>Mobile: </span>
                      {personalinfo.mobile ? personalinfo.mobile : ""}
                    </p>
                  )}
                  {personalinfo && (
                    <p
                      style={{ color: "#C98A55" }}
                      className="template-user-about"
                    >
                      <span>Address: </span>
                      {personalinfo.address ? personalinfo.address : ""}
                    </p>
                  )}

                  {personalinfo && (
                    <p
                      style={{ color: "black" }}
                      className="template-user-about"
                    >
                      {personalinfo.objective ? personalinfo.objective : ""}
                    </p>
                  )}
                </div>
                <Container>
                  <div>
                    <h2
                      style={{ color: "#C98A55" }}
                      className="professional-experience-heading"
                    >
                      Professional Experience
                    </h2>

                    <hr
                      style={{ backgroundColor: "black" }}
                      className="vertical-line"
                    />
                  </div>
                  <ul style={{ paddingBottom: 10 }}>
                    {workexperience.map((experience, index) => (
                      <Container key={index}>
                        <li className="experience-temp">
                          <h3 className="experience-heading">
                            {experience.jobTitle}
                            <span className="experience-org-name">
                              {experience.organizationName}
                            </span>
                            <span className="experience-start-end">
                              ({experience.startYear} - {experience.endYear})
                            </span>
                          </h3>
                        </li>
                      </Container>
                    ))}
                  </ul>
                  <div>
                    <h2
                      style={{ color: "#C98A55" }}
                      className="professional-experience-heading"
                    >
                      Education
                    </h2>
                    <hr
                      style={{ backgroundColor: "black" }}
                      className="vertical-line"
                    />
                  </div>
                  <h3 className="education-temp-details">
                    {educationinfo.degree} in {educationinfo.domain}{" "}
                    <span className="education-temp-university">
                      {educationinfo.university}
                    </span>
                    <span className="education-start-end">
                      ({educationinfo.startYear} - {educationinfo.endYear})
                    </span>
                  </h3>
                  <div>
                    <h2
                      style={{ color: "#C98A55" }}
                      className="professional-experience-heading"
                    >
                      Key Skills
                    </h2>
                    <hr
                      style={{ backgroundColor: "black" }}
                      className="vertical-line"
                    />
                  </div>
                  <ul style={{ marginBottom: 10 }}>
                    {skills.map((skill, index) => (
                      <Container key={index}>
                        <li className="skill">{skill}</li>
                      </Container>
                    ))}
                  </ul>
                  {certifications && (
                    <div>
                      <h2
                        style={{ color: "#C98A55" }}
                        className="professional-experience-heading"
                      >
                        Certifications
                      </h2>
                      <hr
                        style={{ backgroundColor: "black" }}
                        className="vertical-line"
                      />
                      <ul style={{ marginBottom: 10 }}>
                        {certifications.map((certi, index) => (
                          <Container key={index}>
                            <h3 className="education-temp-details">
                              {certi.name}{" "}
                              <span className="education-temp-university">
                                {certi.type.map((data, index) => (
                                  <span
                                    key={index}
                                    className="education-start-end"
                                  >
                                    {data}
                                  </span>
                                ))}
                              </span>
                            </h3>
                          </Container>
                        ))}
                      </ul>
                    </div>
                  )}
                </Container>
              </Paper>
            </div>
          </div>
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
        </Container>
      )}
    </>
  );
};

export default Template1;
