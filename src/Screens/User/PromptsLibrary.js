import axios from "axios";
import useTitle from "../../Hooks/useTitle";
import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import PageLoader from "../../Components/Loader/PageLoader";
import { useNavigate } from "react-router-dom";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

const sbUrl = 'https://viekdgdthevphwbclorz.supabase.co';
const sbApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZWtkZ2R0aGV2cGh3YmNsb3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNzE3ODYsImV4cCI6MjAzMTk0Nzc4Nn0.2_1-9-bvTjTs16WkV_xSe6PQfKDnmNUCttdcs90RoVQ';
const openAiApiKey = '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';

const PromptsLibrary = () => {
  useTitle("Prompts Library");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [prompts, setPrompts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [files, setFiles] = useState([]);
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
    setFiles([]);
    setInstructions(null);
    setShowFormPrompt(false);
  };

  const sendPrompt = async () => {
    if (files.length > 0) {
      setIsLoading(true);
      console.log(files);
      try {
        const formData = new FormData();
        files.forEach((file) => formData.append("files[]", file));
        formData.append("prompt_id", promptid);

        const response = await axios.post(
          `${Helpers.apiUrl}user/save`,
          formData,
          Helpers.authFileHeaders
        );

        const chatId = response.data.chat_id;
        const textResponse = await axios.get(
          `${Helpers.apiUrl}chat/get/${chatId}`,
          Helpers.authFileHeaders
        );
        const chatData = textResponse.data.file_content;
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 500,
          chunkOverlap: 50,
          separators: ['\n\n', '\n', ' ', '']
        });

        const output = await splitter.createDocuments([chatData]);
        const client = createClient(sbUrl, sbApiKey);
        await SupabaseVectorStore.fromDocuments(
          output,
          new OpenAIEmbeddings({ openAIApiKey: openAiApiKey }),
          {
            client,
            tableName: 'documents',
          }
        );

        // Navigate to the chat page using the combined chat_id
        navigate(`/user/chat/${chatId}`, { state: { fileName: files.map(file => file.name).join(", ") } });

      } catch (error) {
        if (error.response) {
          Helpers.toast("error", error.response.data.message);
        } else {
          Helpers.toast("error", "Unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
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
                      <h3 class="nk-block-title">Upload Files</h3>
                    </div>
                  </div>
                  <div class="card shadown-none">
                    <div class="card-body">
                      <div class="row g-3 gx-gs">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Files</label>
                            <div className="form-control-wrap">
                              <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setFiles(Array.from(e.target.files))}
                                multiple
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button
                            className="btn btn-primary"
                            disabled={isLoading}
                            onClick={sendPrompt}
                          >
                            {isLoading ? "Sending..." : "Send"}
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
