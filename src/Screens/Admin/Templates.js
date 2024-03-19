import axios from "axios";
import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import TextInput from "../../Components/Input";
import SelectInput from "../../Components/Select";
import useTitle from "../../Hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import SearchHeader from "../../Components/SearchHeader";
import Pagination from "../../Components/Pagination";

const AdminTemplates = () => {
  useTitle("Templates");
  const defaultTemplate = {
    category: "",
    html: "",
  };
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [orgData, setOrgData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [template, setTemplate] = useState(defaultTemplate);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const getCategories = () => {
    axios.get(`${Helpers.apiUrl}category/all`).then((response) => {
      setCategories(response.data);
    });
  };

  const saveTemplate = () => {
    setIsLoading(true);
    axios
      .post(
        `${Helpers.apiUrl}template/save-template`,
        template,
        Helpers.authHeaders
      )
      .then((response) => {
        if (isEditing) {
          setIsEditing(false);
        }
        allTemplates();
        setShowAddTemplate(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Helpers.toast("error", error.response.data.message);
        setErrors(error.response.data.errors || {});
        setIsLoading(false);
      });
  };

  const allTemplates = () => {
    axios
      .get(`${Helpers.apiUrl}template/all-templates`, Helpers.authHeaders)
      .then((response) => {
        let paginatedData = Helpers.paginate(response.data);
        setTemplates(paginatedData);
        setOrgData(response.data);
      });
  };

  const edittemplate = (temp) => {
    // console
    let edittemplate = {
      category: temp.category_id,
      html: temp.html,
      id: temp.id,
    };
    setTemplate(edittemplate);
    setShowAddTemplate(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTemplate(defaultTemplate);
    setShowAddTemplate(false);
  };

  const initDelete = (id) => {
    setSelectedTemplate(id);
  };

  const cancelDelete = () => {
    setSelectedTemplate(0);
  };

  const deletetemplate = (id) => {
    setIsDeleting(true);
    axios
      .get(`${Helpers.apiUrl}template/delete/${id}`, Helpers.authHeaders)
      .then((response) => {
        allTemplates();
        setSelectedTemplate(0);
        Helpers.toast("success", response.data.message);
        setIsDeleting(false);
      });
  };

  useEffect(() => {
    allTemplates();
    getCategories();
    // return () => {
    //     allTemplates();
    //     getCategories();
    // };
  }, []);

  return (
    <div class="nk-content">
      <div class="container-xl">
        <div class="nk-content-inner">
          <div class="nk-content-body">
            <div class="nk-block-head nk-page-head">
              <div class="nk-block-head-between">
                <div class="nk-block-head-content">
                  <h2 class="display-6">Templates</h2>
                  <p>Manage the templates for different categories</p>
                </div>
                {!showAddTemplate && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAddTemplate(true)}
                  >
                    <em class="icon ni ni-plus"></em> Add New Template
                  </button>
                )}
              </div>
            </div>
            {!showAddTemplate && (
              <div class="nk-block">
                <SearchHeader
                  isPaginated={true}
                  title={"All templates"}
                  orgData={orgData}
                  setData={setTemplates}
                  columns={["name", "category.name"]}
                />
                <div class="card shadown-none">
                  <div class="card-body">
                    <div class="row g-3 gx-gs">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr. #</th>
                            <th>Category</th>
                            <th>html</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {templates.length === 0 && (
                            <tr>
                              <td colSpan={10}>No records found...</td>
                            </tr>
                          )}
                          {templates.length > 0 &&
                            templates[currentPage].map((temp, index) => {
                              return (
                                <tr key={temp.id}>
                                  <td>{index + 1}</td>
                                  <td>{temp.category.name}</td>
                                  <div
                                    class="fs-4 fw-medium line-clamp-3"
                                    dangerouslySetInnerHTML={{
                                      __html: temp.html,
                                    }}
                                  />
                                  {/* <td class="fs-4 fw-medium line-clamp-2">
                                    {temp.html}
                                  </td> */}
                                  <td className="tb-col-end">
                                    {selectedTemplate === temp.id ? (
                                      <div>
                                        <button
                                          onClick={() =>
                                            deletetemplate(temp.id)
                                          }
                                          disabled={isDeleting}
                                          className="btn btn-outline-danger btn-sm ml5"
                                        >
                                          <em class="icon ni ni-check"></em>
                                          <span className="ml5">
                                            {isDeleting
                                              ? "Deleting..."
                                              : "Yes, Delete"}
                                          </span>
                                        </button>
                                        <button
                                          onClick={cancelDelete}
                                          className="btn btn-outline-primary btn-sm ml5"
                                        >
                                          <em className="icon ni ni-cross"></em>
                                          <span className="ml5">Cancel</span>
                                        </button>
                                      </div>
                                    ) : (
                                      <div>
                                        {/* <Link
                                          to={`/admin/template/questions/${Helpers.encryptString(
                                            prmpt.id
                                          )}`}
                                          className="btn btn-outline-primary btn-sm"
                                        >
                                          <em class="icon ni ni-eye"></em>
                                          <span className="ml5">View</span>
                                        </Link> */}
                                        <button
                                          onClick={() => edittemplate(temp)}
                                          className="btn btn-outline-primary btn-sm ml5"
                                        >
                                          <em class="icon ni ni-edit"></em>
                                          <span className="ml5">Edit</span>
                                        </button>
                                        <button
                                          onClick={() => initDelete(temp.id)}
                                          className="btn btn-outline-danger btn-sm ml5"
                                        >
                                          <em className="icon ni ni-trash"></em>
                                          <span className="ml5">Delete</span>
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      {templates.length > 0 && (
                        <Pagination
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          data={templates}
                          orgData={orgData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showAddTemplate && (
              <div class="nk-block">
                <div class="nk-block-head nk-block-head-sm">
                  <div class="nk-block-head-content">
                    <h3 class="nk-block-title">Add New Template</h3>
                  </div>
                </div>
                <div class="card shadown-none">
                  <div class="card-body">
                    <div class="row g-3 gx-gs">
                      {/* <TextInput
                        label={"Name"}
                        error={errors.name}
                        value={template.name}
                        onChange={(e) =>
                          setTemplate({ ...template, name: e.target.value })
                        } 
                      />*/}
                      <SelectInput
                        label={"Choose Category"}
                        value={template.category}
                        onChange={(e) =>
                          setTemplate({ ...template, category: e.target.value })
                        }
                        options={categories}
                        isObject={true}
                        optionLabel={"name"}
                        optionValue={"id"}
                        error={errors.category}
                      />
                      <TextInput
                        isTextArea={true}
                        label={"Html"}
                        error={errors.html}
                        value={template.html}
                        cols={12}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            html: e.target.value,
                          })
                        }
                      />
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary"
                          disabled={isLoading}
                          onClick={saveTemplate}
                        >
                          {isLoading
                            ? "Saving..."
                            : isEditing
                            ? "Save template"
                            : "Save & Continue"}
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
        </div>
      </div>
    </div>
  );
};

export default AdminTemplates;
