import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import useTitle from "../../Hooks/useTitle";
import Pagination from "../../Components/Pagination";

const AdminTransactions = () => {
  useTitle("Admin Transactions");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!Helpers.authUser.id || Helpers.authUser.user_type !== 1) {
      navigate("/"); // Redirect if the user is not logged in or not an admin
    } else {
      fetchTransactions();
    }
  }, []);

  const fetchTransactions = () => {
    axios
      .get(`${Helpers.apiUrl}transactions/admin/get-transactions`, Helpers.authHeaders)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          let paginatedData = Helpers.paginate(response.data);
          setTransactions(paginatedData);
          setTransactionData(response.data);
        } else {
          setTransactions([]);
          setTransactionData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        Helpers.toast("error", "Failed to fetch transactions");
        setTransactions([]);
        setTransactionData([]);
      });
  };

  const unsubscribe = async (transactionId) => {
    setIsUnsubscribing(true);
    await axios
      .post(`${Helpers.apiUrl}transactions/unsubscribe/${transactionId}`, {}, Helpers.authHeaders)
      .then((response) => {
        console.log(response);
        fetchTransactions();
        Helpers.toast("success", "Unsubscribed successfully");
        setIsUnsubscribing(false);
      })
      .catch((error) => {
        console.log(error);
        Helpers.toast("error", "Failed to unsubscribe");
        setIsUnsubscribing(false);
      });
  };

  const isExpired = (expiryDate) => {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    return currentDate > expiry;
  };

  return (
    <div className="nk-content">
      <div className="container-xl">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-page-head">
              <div className="nk-block-head-between">
                <div className="nk-block-head-content">
                  <h2 className="display-6">Transactions</h2>
                  <p>View all transactions</p>
                </div>
              </div>
            </div>
            <div className="nk-block">
              <div className="card shadown-none">
                <div className="card-body">
                  <div className="row g-3 gx-gs">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Sr. #</th>
                          <th>Name</th>
                          <th className="package-type-column">Package Type</th>
                          <th>Purchase</th>
                          <th>Expiry</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions[currentPage]?.map((transaction, index) => (
                          <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{transaction.org_name}</td>
                            <td className="package-type-column">{transaction.package_type}</td>
                            <td>{transaction.purchase_date}</td>
                            <td>{transaction.expiry_date}</td>
                            <td className="tb-col-end">
                              {isExpired(transaction.expiry_date) ? (
                                <button
                                  className="btn btn-outline-secondary btn-sm ml5"
                                  disabled
                                >
                                  <em className="icon ni ni-cross"></em>
                                  <span className="ml5">Expired</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => unsubscribe(transaction.id)}
                                  disabled={isUnsubscribing}
                                  className="btn btn-outline-danger btn-sm ml5"
                                >
                                  <em className="icon ni ni-cross"></em>
                                  <span className="ml5">
                                    {isUnsubscribing ? "Revoking..." : "Revoke"}
                                  </span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {transactions.length > 0 && (
                      <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        data={transactions}
                        orgData={transactionData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactions;
