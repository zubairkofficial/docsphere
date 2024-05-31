import axios from "axios";
import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import TextInput from "../../Components/Input";
import SelectInput from "../../Components/Select";
import useTitle from "../../Hooks/useTitle";
import SearchHeader from "../../Components/SearchHeader";
import Pagination from "../../Components/Pagination";

const AdminPackages = () => {
  useTitle("Packages");
  const defaultPackage = {
    package_name: "",
    package_price: "",
    package_type: "",
    package_users: "",
    package_validity: "",
    package_description: ""
  };
  const [packages, setPackages] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [packageData, setPackageData] = useState(defaultPackage);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const savePackage = () => {
    setIsLoading(true);
    axios
      .post(`${Helpers.apiUrl}packages/save-package`, packageData, Helpers.authHeaders)
      .then((response) => {
        if (isEditing) {
          setIsEditing(false);
        }
        allPackages();
        Helpers.toast("Success", response.data.message);
        setShowAddPackage(false);
        setIsLoading(false);
        handleCancel();
      })
      .catch((error) => {
        console.log(error);
        Helpers.toast("error", error.response.data.message);
        setErrors(error.response.data.errors || {});
        setIsLoading(false);
      });
  };

  const allPackages = () => {
    axios
      .get(`${Helpers.apiUrl}packages/all-packages`, Helpers.authHeaders)
      .then((response) => {
        let paginatedData = Helpers.paginate(response.data);
        setPackages(paginatedData);
        setOrgData(response.data);
      });
  };

  const editPackage = (pkg) => {
    let editPackage = {
      package_name: pkg.package_name,
      package_price: pkg.package_price,
      package_type: pkg.package_type,
      package_users: pkg.package_users,
      package_validity: pkg.package_validity,
      package_description: pkg.package_description,
      id: pkg.id
    };
    setPackageData(editPackage);
    setShowAddPackage(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPackageData(defaultPackage);
    setShowAddPackage(false);
  };

  const initDelete = (id) => {
    setSelectedPackage(id);
  };

  const cancelDelete = () => {
    setSelectedPackage(0);
  };

  const deletePackage = (id) => {
    setIsDeleting(true);
    axios
      .get(`${Helpers.apiUrl}packages/delete/${id}`, Helpers.authHeaders)
      .then((response) => {
        allPackages();
        setSelectedPackage(0);
        Helpers.toast("success", response.data.message);
        setIsDeleting(false);
      });
  };

  useEffect(() => {
    allPackages();
  }, []);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    console.log("Type selected:", value); // Debugging line
    setPackageData((prevData) => ({
      ...prevData,
      package_type: value,
      package_users: value === "Single User" ? "1" : value === "Organization" ? "2" : prevData.package_users,
    }));
  };

  useEffect(() => {
    console.log("packageData:", packageData); // Debugging line
  }, [packageData]);

  return (
    <div className="nk-content">
      <div className="container-xl">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-page-head">
              <div className="nk-block-head-between">
                <div className="nk-block-head-content">
                  <h2 className="display-6">Packages</h2>
                  <p>Manage the packages for different categories</p>
                </div>
                {!showAddPackage && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAddPackage(true)}
                  >
                    <em className="icon ni ni-plus"></em> Add New Package
                  </button>
                )}
              </div>
            </div>
            {!showAddPackage && (
              <div className="nk-block">
                <SearchHeader
                  isPaginated={true}
                  title={"All Packages"}
                  orgData={orgData}
                  setData={setPackages}
                  columns={["package_name", "package_type"]}
                />
                <div className="card shadown-none">
                  <div className="card-body">
                    <div className="row g-3 gx-gs">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr. #</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Users</th>
                            <th>Validity</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {packages.length === 0 && (
                            <tr>
                              <td colSpan={10}>No records found...</td>
                            </tr>
                          )}
                          {packages.length > 0 &&
                            packages[currentPage].map((pkg, index) => {
                              return (
                                <tr key={pkg.id}>
                                  <td>{index + 1}</td>
                                  <td>{pkg.package_name}</td>
                                  <td>{pkg.package_price}</td>
                                  <td>{pkg.package_type}</td>
                                  <td>{pkg.package_users}</td>
                                  <td>{pkg.package_validity}</td>
                                  <td className="tb-col-end">
                                    {selectedPackage === pkg.id ? (
                                      <div>
                                        <button
                                          onClick={() => deletePackage(pkg.id)}
                                          disabled={isDeleting}
                                          className="btn btn-outline-danger btn-sm ml5"
                                        >
                                          <em className="icon ni ni-check"></em>
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
                                        <div className="d-flex flex-row">
                                          <button
                                            onClick={() => editPackage(pkg)}
                                            className="btn btn-outline-primary btn-sm flex-grow-1 ml5"
                                          >
                                            <em className="icon ni ni-edit"></em>
                                            <span className="ml5">Edit</span>
                                          </button>
                                          <button
                                            onClick={() => initDelete(pkg.id)}
                                            className="btn btn-outline-danger btn-sm flex-grow-1 ml5"
                                          >
                                            <em className="icon ni ni-trash"></em>
                                            <span className="ml5">Delete</span>
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      {packages.length > 0 && (
                        <Pagination
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          data={packages}
                          orgData={orgData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showAddPackage && (
              <div className="nk-block">
                <div className="nk-block-head nk-block-head-sm">
                  <div className="nk-block-head-content">
                    <h3 className="nk-block-title">Add New Package</h3>
                  </div>
                </div>
                <div className="card shadown-none">
                  <div className="card-body">
                    <div className="row g-3 gx-gs">
                      <TextInput
                        label={"Name"}
                        error={errors.package_name}
                        value={packageData.package_name}
                        onChange={(e) =>
                          setPackageData({ ...packageData, package_name: e.target.value })
                        }
                      />
                      <TextInput
                        label={"Price"}
                        error={errors.package_price}
                        value={packageData.package_price}
                        onChange={(e) =>
                          setPackageData({ ...packageData, package_price: e.target.value })
                        }
                      />
                      <SelectInput
                        label={"Type"}
                        error={errors.package_type}
                        value={packageData.package_type}
                        onChange={handleTypeChange}
                        options={[
                          { label: "Single User", value: "Single User" },
                          { label: "Organization", value: "Organization" }
                        ]}
                        isObject={true}
                        optionLabel={"label"}
                        optionValue={"value"}
                      />
                      {packageData.package_type !== "Single User" && (
                      <TextInput
                        label={"Users"}
                        error={errors.package_users}
                        value={packageData.package_users}
                        onChange={(e) =>
                          setPackageData({ ...packageData, package_users: e.target.value })
                        }
                        disabled={packageData.package_type === "Single User"}
                      />
                      )}
                      <TextInput
                        label={"Validity (In Days)"}
                        error={errors.package_validity}
                        value={packageData.package_validity}
                        onChange={(e) =>
                          setPackageData({ ...packageData, package_validity: e.target.value })
                        }
                      />
                      <TextInput
                        isTextArea={true}
                        label={"Description"}
                        error={errors.package_description}
                        value={packageData.package_description}
                        cols={12}
                        onChange={(e) =>
                          setPackageData({ ...packageData, package_description: e.target.value })
                        }
                      />
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary"
                          disabled={isLoading}
                          onClick={savePackage}
                        >
                          {isLoading
                            ? "Saving..."
                            : isEditing
                            ? "Save Package"
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

export default AdminPackages;
