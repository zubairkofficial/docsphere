import { Button, Container, Paper } from "@mui/material";

export function CV({
  personalinfo,
  educationinfo,
  skills,
  certifications,
  workexperience,
}) {
  return (
    <>
      <Container
        sx={{
          padding: {
            xs: "40px 20px",
            md: "60px 80px",
          },
        }}
        className="preview-container"
      >
        <h2
          style={{
            fontSize: "25px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            marginBottom: "20px",
          }}
        >
          Resume Preview
        </h2>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              fontSize: "25px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              color: "rgb(99, 93, 93)",
              marginBottom: "15px",
            }}
            id="previewresume"
          >
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
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "20px 20px 0px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="header-tem-first">
                    <div className="template-user-details-cont">
                      <h2
                        style={{ color: "blue" }}
                        className="template-user-name"
                      >
                        {personalinfo.firstName + " " + personalinfo.lastName}
                      </h2>
                      <p
                        style={{ color: "black" }}
                        className="template-user-designation"
                      >
                        workexperience[0].jobTitle
                      </p>
                    </div>
                  </div>
                </div>

                <p style={{ color: "blue" }} className="template-user-about">
                  <span>Email: </span>
                  {personalinfo.email}
                </p>

                <p style={{ color: "blue" }} className="template-user-about">
                  <span>Mobile: </span>
                  {personalinfo.mobile}
                </p>

                <p style={{ color: "blue" }} className="template-user-about">
                  <span>Address: </span>
                  {personalinfo.address}
                </p>

                <p style={{ color: "black" }} className="template-user-about">
                  {personalinfo.objective}
                </p>
              </div>
              <Container>
                <div>
                  <h2
                    style={{ color: "blue" }}
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
                    style={{ color: "blue" }}
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
                    style={{ color: "blue" }}
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
                      style={{ color: "blue" }}
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
                // onClick={handleSave}
                className="contained-btn"
                variant="contained"
                // disabled={loading}
              >
                Download Pdf
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
