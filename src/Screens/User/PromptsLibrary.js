import axios from "axios";
import useTitle from "../../Hooks/useTitle";
import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import PageLoader from "../../Components/Loader/PageLoader";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../Components/Input";
import FileInput from "../../Components/FileInput";

const PromptsLibrary = () => {
  useTitle("Prompts Library");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [prompts, setPrompts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [file, setFile] = useState(null);
  const [promptid, setPromptid] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
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
    setPromptid(null);
    setFile(null);
    setInstructions(null);
    setShowFormPrompt(false);
  };
  const sendPrompt = () => {
    if (file) {
      setIsLoading(true);
      console.log(file);
      axios
        .post(
          `${Helpers.apiUrl}user/save`,
          { file: file, prompt_id: promptid, instructions: instructions },
          Helpers.authFileHeaders
        )
        .then((response) => {
          navigate(`/user/chat/${response.data.chat_id}`);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            Helpers.toast("error", error.response.data.message);
          } else {
            Helpers.toast("error", "Unexpected error occured");
          }
          setIsLoading(false);
        });
    } else {
      Helpers.toast("error", "Can't send without file");
    }
  };
  const handleClick = (prompt) => {
    setShowFormPrompt(true);
    setPromptid(prompt.id);
  };
  const getPrompts = () => {
    setPageLoading(true);
    axios
      .get(`${Helpers.apiUrl}prompt/all-prompts`, Helpers.authHeaders)
      .then((response) => {
        setPrompts(response.data);
        setFilteredPrompts(response.data);
        setPageLoading(false);
      });
  };

  const filterPrompts = (category_id) => {
    setSelectedCategory(category_id);
    if (category_id === 0) {
      setFilteredPrompts(prompts);
    } else {
      let filtered = prompts.filter(
        (prompt) => prompt.category_id === category_id
      );
      setFilteredPrompts(filtered);
    }
  };

  const searchTemplates = (e) => {
    let value = e.target.value;
    setSearchQuery(value);
    setSelectedCategory(0);
    let filtered = prompts.filter((prompt) =>
      prompt.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPrompts(filtered);
  };

  useEffect(() => {
    getPrompts();
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
              {!showFormPrompt && (
                <div>
                  <div class="nk-block-head nk-page-head">
                    <div class="nk-block-head-between">
                      <div class="nk-block-head-content">
                        <h2 class="display-6">Prompts Library</h2>
                        <p>Choose the prompt which you want to use</p>
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
                          onClick={() => filterPrompts(0)}
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
                            onClick={() => filterPrompts(category.id)}
                            type="button"
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div
                      class="row g-gs filter-container"
                      data-animation="true"
                    >
                      {filteredPrompts.map((prompt) => {
                        return (
                          <div class="col-sm-6 col-xxl-3 filter-item blog-content">
                            <a onClick={() => handleClick(prompt)}>
                              <div class="card card-full shadow-none">
                                <div class="card-body">
                                  <div class="media media-rg media-middle media-circle text-primary bg-primary bg-opacity-20 mb-3">
                                    {prompt.name.charAt(0)}
                                  </div>
                                  <h5 class="fs-4 fw-medium">{prompt.name}</h5>
                                  <p class="small text-light line-clamp-2">
                                    {prompt.description}
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
              )}
              {showFormPrompt && (
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
                          value={prompt.instructions}
                          cols={12}
                          onChange={(e) => setInstructions(e.target.value)}
                        />
                        <div className="col-md-12">
                          <button
                            className="btn btn-primary"
                            disabled={isLoading}
                            onClick={sendPrompt}
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptsLibrary;
