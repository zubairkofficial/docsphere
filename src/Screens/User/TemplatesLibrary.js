import axios from "axios";
import useTitle from "../../Hooks/useTitle";
import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import PageLoader from "../../Components/Loader/PageLoader";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextInput from "../../Components/Input";
import FileInput from "../../Components/FileInput";

const TemplatesLibrary = () => {
  useTitle("Templates Library");
  const navigate = useNavigate();
  const { msgid } = useParams();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [template, setTemplates] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [file, setFile] = useState(null);
  const [templateid, setTemplateid] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showFormTemplate, setShowFormTemplate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getCategories = () => {
    axios
      .get(`${Helpers.apiUrl}category/all`, Helpers.authHeaders)
      .then((response) => {
        setCategories(response.data);
      });
  };
  const handleCancel = () => {
    setIsEditing(false);
    setTemplateid(null);
    setFile(null);
    setInstructions(null);
    setShowFormTemplate(false);
  };
  const sendTemplate = () => {
    setIsLoading(false);
  };
  const handleClick = (temp) => {
    setShowFormTemplate(true);
    setTemplateid(temp.id);
    // navigate(`/user/template/${msgid}/${Helpers.encryptString(temp.id)}`);
    navigate(`/user/test/${Helpers.encryptString(temp.id)}`);
  };
  const getTemplates = () => {
    setPageLoading(true);
    axios
      .get(`${Helpers.apiUrl}template/all-templates`, Helpers.authHeaders)
      .then((response) => {
        setTemplates(response.data);
        setFilteredTemplates(response.data);
        setPageLoading(false);
      });
  };

  const filterTemplates = (category_id) => {
    setSelectedCategory(category_id);
    if (category_id === 0) {
      setFilteredTemplates(template);
    } else {
      let filtered = template.filter(
        (template) => template.category_id === category_id
      );
      setFilteredTemplates(filtered);
    }
  };

  const searchTemplates = (e) => {
    let value = e.target.value;
    setSearchQuery(value);
    setSelectedCategory(0);
    let filtered = template.filter((template) =>
      template.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTemplates(filtered);
  };

  useEffect(() => {
    getTemplates();
    getCategories();
  }, []);

  return (
    <div class="nk-content">
      <div class="container-xl">
        <div class="nk-content-inner">
          {pageLoading ? (
            <PageLoader />
          ) : (
            <div class="nk-content-body">
              {/* {!showFormTemplate && ( */}
              <div>
                <div class="nk-block-head nk-page-head">
                  <div class="nk-block-head-between">
                    <div class="nk-block-head-content">
                      <h2 class="display-6">Template Library</h2>
                      <p>Choose the template which you want to use</p>
                    </div>
                    <div class="nk-block-head-content">
                      <div class="d-flex gap gx-4">
                        <div class="">
                          <div class="form-control-wrap">
                            <div class="form-control-icon start md text-light">
                              <em class="icon ni ni-search"></em>
                            </div>
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={searchTemplates}
                              class="form-control form-control-md"
                              placeholder="Search Template"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="nk-block">
                  <ul class="filter-button-group mb-4 pb-1">
                    <li>
                      <button
                        class={`filter-button ${
                          selectedCategory === 0 ? "active" : ""
                        }`}
                        onClick={() => filterTemplates(0)}
                        type="button"
                        data-filter="*"
                      >
                        All
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li>
                        <button
                          class={`filter-button ${
                            selectedCategory === category.id ? "active" : ""
                          }`}
                          onClick={() => filterTemplates(category.id)}
                          type="button"
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div class="row g-gs filter-container" data-animation="true">
                    {filteredTemplates.map((temp) => {
                      return (
                        <div class="col-sm-6 col-xxl-3 filter-item blog-content">
                          <a onClick={() => handleClick(temp)}>
                            <div class="card card-full shadow-none">
                              <div class="card-body">
                                {/* <div class="media media-rg media-middle media-circle text-primary bg-primary bg-opacity-20 mb-3">
                                    {temp.name.charAt(0)}
                                  </div> */}
                                <h5 class="fs-4 fw-medium line-clamp-3">
                                  <div
                                    class="fs-4 fw-medium line-clamp-3"
                                    dangerouslySetInnerHTML={{
                                      __html: temp.html,
                                    }}
                                  />
                                  {/* {temp.html} */}
                                </h5>
                                <p class="small text-light line-clamp-2">
                                  {temp.html}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* )} {showFormTemplate && (
                <div class="nk-block">
                  <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-head-content">
                      <h3 class="nk-block-title">upload File</h3>
                    </div>
                  </div>
                  <div class="card shadown-none">
                    <div class="card-body">
                      <div class="row g-3 gx-gs">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">File</label>
                            <div className="form-control-wrap">
                              <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                            </div>
                          </div>
                        </div>
                        <TextInput
                          isTextArea={true}
                          label={"Instructions"}
                          error={errors.instructions}
                          value={template.instructions}
                          cols={12}
                          onChange={(e) => setInstructions(e.target.value)}
                        />
                        <div className="col-md-12">
                          <button
                            className="btn btn-primary"
                            disabled={isLoading}
                            onClick={sendTemplate}
                          >
                            {isLoading ? "sending..." : "send"}
                          </button>
                          <button
                            className="btn btn-outline-danger ml10"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesLibrary;
