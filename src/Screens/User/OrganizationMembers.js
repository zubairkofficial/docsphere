import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import useTitle from "../../Hooks/useTitle";
import SearchHeader from "../../Components/SearchHeader";
import Pagination from "../../Components/Pagination";

const OrganizationMembers = () => {
  useTitle("Organization Members");
  const navigate = useNavigate();
  const defaultMember = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    is_org_owner: false,
    is_active: true, // Default is_active to true
    org_id: Helpers.authUser.org_id, // Ensure org_id is correctly set
    permissions: 1 // Default permissions to read
  };
  const [members, setMembers] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [memberData, setMemberData] = useState(defaultMember);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMemberLimitReached, setIsMemberLimitReached] = useState(false); // State for member limit

  useEffect(() => {
    if (!Helpers.authUser.org_id || !Helpers.authUser.is_org_owner) {
      navigate("/"); // Redirect if the user is not part of an organization or is not an org owner
    } else {
      checkPackageUsers();
      allMembers();
    }
  }, []);

  const checkPackageUsers = () => {
    axios
      .get(`${Helpers.apiUrl}organization/check-package-users`, Helpers.authHeaders)
      .then((response) => {
        if (response.data.user_count >= response.data.package_users) {
          setIsMemberLimitReached(true);
        } else {
          setIsMemberLimitReached(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsMemberLimitReached(true); // Default to true if there's an error
      });
  };

  const saveMember = () => {
    if (memberData.password && memberData.password !== memberData.password_confirmation) {
      setErrors({ password_confirmation: "Passwords do not match" });
      return;
    }
    setIsLoading(true);
    axios
      .post(`${Helpers.apiUrl}members/save-member`, { ...memberData, org_id: Helpers.authUser.org_id }, Helpers.authHeaders)
      .then((response) => {
        if (isEditing) {
          setIsEditing(false);
        }
        allMembers();
        checkPackageUsers();
        Helpers.toast("success", response.data.message);
        setShowAddMember(false);
        setIsLoading(false);
        handleCancel();
      })
      .catch((error) => {
        console.log(error);
        // Helpers.toast("error", error.response.data.message);
        setErrors(error.response.data.errors || {});
        setIsLoading(false);
      });
  };

  const allMembers = () => {
    axios
      .get(`${Helpers.apiUrl}members/all-members`, Helpers.authHeaders)
      .then((response) => {
        let paginatedData = Helpers.paginate(response.data);
        setMembers(paginatedData);
        setOrgData(response.data);
      });
  };

  const editMember = (member) => {
    let editMember = {
      name: member.name,
      email: member.email,
      is_org_owner: member.is_org_owner,
      is_active: member.is_active,
      id: member.id,
      password: "",
      password_confirmation: "",
      permissions: member.permissions // Add permissions field
    };
    setMemberData(editMember);
    setShowAddMember(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMemberData(defaultMember);
    setShowAddMember(false);
  };

  const initDelete = (id) => {
    setSelectedMember(id);
  };

  const cancelDelete = () => {
    setSelectedMember(0);
  };

  const deleteMember = async (id) => {
    setIsDeleting(true);
    await axios
      .delete(`${Helpers.apiUrl}members/delete/${id}`, Helpers.authHeaders)
      .then((response) => {
        console.log(response);
        allMembers();
        checkPackageUsers();
        setSelectedMember(0);
        Helpers.toast("success", response.data.message);
        setIsDeleting(false);
      })
      .catch((error) => {
        console.log(error);
        Helpers.toast("error", "Failed to delete member");
        setIsDeleting(false);
      });
  };

  return (
    <div className="nk-content">
      <div className="container-xl">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-page-head">
              <div className="nk-block-head-between">
                <div className="nk-block-head-content">
                  <h2 className="display-6">Organization Members</h2>
                  <p>Manage the members of your organization</p>
                </div>
                {!showAddMember && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAddMember(true)}
                    disabled={isMemberLimitReached} // Disable button if member limit is reached
                  >
                    <em className="icon ni ni-plus"></em> Add New Member
                  </button>
                )}
              </div>
            </div>
            {!showAddMember && (
              <div className="nk-block">
                <SearchHeader
                  isPaginated={true}
                  title={"All Members"}
                  orgData={orgData}
                  setData={setMembers}
                  columns={["name", "email"]}
                />
                <div className="card shadown-none">
                  <div className="card-body">
                    <div className="row g-3 gx-gs">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr. #</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th> {/* Add Status Column */}
                            <th>Permissions</th> {/* Add Permissions Column */}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.length === 0 && (
                            <tr>
                              <td colSpan={7}>No records found...</td>
                            </tr>
                          )}
                          {members.length > 0 &&
                            members[currentPage].map((member, index) => {
                              return (
                                <tr key={member.id}>
                                  <td>{index + 1}</td>
                                  <td>{member.name}</td>
                                  <td>{member.email}</td>
                                  <td>{member.is_org_owner ? "Owner" : "Member"}</td>
                                  <td>{member.is_active ? "Active" : "Disabled"}</td> {/* Display Status */}
                                  <td>{member.permissions === 1 ? "Read" : member.permissions === 0 ? "N/A" : member.permissions === 2 ? "Read / Write" : "N/A"}</td> {/* Display Permissions */}
                                  <td className="tb-col-end">
                                    {selectedMember === member.id ? (
                                      <div>
                                        <button
                                          onClick={() => deleteMember(member.id)}
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
                                            onClick={() => editMember(member)}
                                            className="btn btn-outline-primary btn-sm flex-grow-1 ml5"
                                          >
                                            <em className="icon ni ni-edit"></em>
                                            <span className="ml5">Edit</span>
                                          </button>
                                          <button
                                            onClick={() => initDelete(member.id)}
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
                      {members.length > 0 && (
                        <Pagination
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          data={members}
                          orgData={orgData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showAddMember && (
              <div className="nk-block">
                <div className="nk-block-head nk-block-head-sm">
                  <div className="nk-block-head-content">
                    <h3 className="nk-block-title">Add New Member</h3>
                  </div>
                </div>
                <div className="card shadown-none">
                  <div className="card-body">
                    <div className="row g-3 gx-gs">
                      <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          value={memberData.name}
                          onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          value={memberData.email}
                          onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          value={memberData.password}
                          onChange={(e) => setMemberData({ ...memberData, password: e.target.value })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                          value={memberData.password_confirmation}
                          onChange={(e) => setMemberData({ ...memberData, password_confirmation: e.target.value })}
                        />
                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <select
                          className={`form-control ${errors.is_org_owner ? 'is-invalid' : ''}`}
                          value={memberData.is_org_owner}
                          onChange={(e) => setMemberData({ ...memberData, is_org_owner: e.target.value })}
                        >
                          <option value="0">Member</option>
                          <option value="1">Owner</option>
                        </select>
                        {errors.is_org_owner && <div className="invalid-feedback">{errors.is_org_owner}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Permissions</label>
                        <select
                          className={`form-control ${errors.permissions ? 'is-invalid' : ''}`}
                          value={memberData.permissions}
                          onChange={(e) => setMemberData({ ...memberData, permissions: parseInt(e.target.value) })}
                        >
                          <option value="1">Read</option>
                          <option value="2">Read/Write</option>
                        </select>
                        {errors.permissions && <div className="invalid-feedback">{errors.permissions}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Status</label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={memberData.is_active}
                            onChange={(e) => setMemberData({ ...memberData, is_active: e.target.checked })}
                          />
                          <label className="form-check-label">
                            Active
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary"
                          disabled={isLoading}
                          onClick={saveMember}
                        >
                          {isLoading
                            ? "Saving..."
                            : isEditing
                              ? "Save Member"
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

export default OrganizationMembers;
