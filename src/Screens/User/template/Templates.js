import React, { useState, useEffect } from "react";
import "./Styles/Home.css";
import { templates } from "./Data/templates";
import ScreenEffect from "./Components/ScreenEffect";
import { Button, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const Templates = () => {
  const { msgid } = useParams();
  const navigate = useNavigate();
  const navigateTotemplate = (id) => {
    navigate(`/user/template${id}/${msgid}`);
  };

  return (
    <>
      <div className="home">
        <div className="home-templates-cont">
          <h2 className="template-header-title">Templates</h2>
          <p className="template-select-text">
            Select a template to get started
          </p>

          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                sm: "1fr 1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
                xl: "1fr 1fr 1fr 1fr",
              },
              gridGap: "30px",
            }}
          >
            {templates.map((template) => {
              return (
                <div
                  key={template.id}
                  id="template"
                  className="templates-img-cont"
                >
                  <img
                    className="template-img"
                    src={template.template_img}
                    alt={template.template_name}
                  />
                  <ScreenEffect />
                  <Button
                    className="use-template-btn"
                    onClick={() => navigateTotemplate(template.id)}
                    size="medium"
                    variant="contained"
                  >
                    Use Template
                  </Button>
                </div>
              );
            })}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Templates;
