import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Helpers from "../../Config/Helpers";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import PageLoader from '../../Components/Loader/PageLoader';
const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId, setUserId] = useState(1); // Example user ID, replace with actual user ID logic
  const [loader, setLoader] = useState(false);
  const [plans, setPlans] = useState(null);
  const [planData, setPlanData] = useState(null);
  const  [shouldBuyPlan,setShouldBuyPlan] = useState(true)
  const [organizationName, setOrganizationName] = useState('');
  const [isOrganization, setIsOrganization] = useState(false);
  const navigate = useNavigate()
  const handlePlanSelect = (plan) => {
    console.log("selected pkg",plan)
    setSelectedPlan(plan);
    if(plan.package_type == 'Organization'){
      
      setIsOrganization(true)

    }
    else{

      setIsOrganization(false)

    }
  
  }
  const handleBuyPlan = async () => {

    let data;
    const currentDate = new dayjs()
    if (selectedPlan.package_type === 'Organization') {
      // setIsOrganization(true);
      // setPlanData();
     
      data = {
        user_id: Helpers.authUser.id,
        package_id: selectedPlan.id,
        purchase_date: currentDate.format("YYYY-MM-DD"),
        org_name:organizationName,
      }
    } else {
      // setPlanData();

      data = {
        user_id: Helpers.authUser.id,
        package_id: selectedPlan.id,
        purchase_date: currentDate.format("YYYY-MM-DD") ,
      }
  };
  console.log("transaction data",data)
    // const data = {
    //   pkgId: selectedPlan,
    //   userId: userId,
    //   org_name: organizationName,
    //   purchase_date: new dayjs(),
    // };

    setLoader(true);
    try {
      const response = await axios.post(`${Helpers.apiUrl}transactions/save-transaction`, data, Helpers.authHeaders);

      console.log('Plan purchased successfully:', response.data);
      // setPlans(response.data);
      Helpers.toast("success", "Plan selected Succeddfully");
      navigate('/user/dashboard')

    } catch (error) {
      console.error('Error purchasing plan:', error.message);
    }
    setLoader(false);
  };



 
  const fetchPlans = async () => {
    setLoader(true);
    try {
      console.log("auth profile",Helpers.authUser)
      const response = await axios.get(`${Helpers.apiUrl}packages/all-packages`, Helpers.authHeaders);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoader(false);
  };


  const isPlanBought = async () => {
    setLoader(true);
    try {
      console.log("auth profile",Helpers.authUser)
      const response = await axios.get(`${Helpers.apiUrl}transactions/single_id/${Helpers.authUser.id}`, Helpers.authHeaders);
      if(response == 'transaction not found'){
        setShouldBuyPlan(true)
      }
      else{
        setShouldBuyPlan(false)

      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoader(false);
  };


  useEffect(() => {

   
    fetchPlans();
  }, []);

  return (
    <div className="nk-content">
      <div className="container-xl">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-page-head">
              <div className="nk-block-head-between">
                <div className="nk-block-head-content">
                  <h2 className="display-6">Pricing Plans</h2>
                  <p>
                    Generate unlimited copy 10X faster with our cost-effective plan to write blog posts, social media ads and many more.
                  </p>
                </div>
              </div>
            </div>
           {
            loader ? <><PageLoader/></> :  <>
            
            <div className="nk-block">
              <div className="card mt-xl-5">
                <div className="row g-0">
                  {plans?.map((plan) => (
                    <div className="col-xl-6 mb-4" key={plan?.id} onClick={() => handlePlanSelect(plan)}>
                      <div className={`pricing card ${selectedPlan?.id === plan.id ? 'selected' : ''} bg-white rounded h-100`}>
                        <div className="pricing-content card-body d-flex flex-column justify-content-between">
                          <div>
                            <h5 className="fw-normal text-dark">{plan?.package_name}</h5>
                            <h2 className="mb-3">Customized Plan</h2>
                            <div className="pricing-price-wrap">
                              <div className="pricing-price">
                                <h3 className="display-4 mb-3 fw-semibold">{plan?.package_price}</h3>
                              </div>
                            </div>
                            <ul className="pricing-features list-unstyled">
                              {plan?.features?.map((feature, index) => (
                                <li key={index}>
                                  <em className="icon text-primary ni ni-check-circle"></em>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {isOrganization && (
                <div className="mt-4">
                  <label htmlFor="organizationName">Organization Name</label>
                  <input
                    type="text"
                    id="organizationName"
                    className="form-control"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
              )}
              <div className="mt-5 d-flex justify-content-center">
               { shouldBuyPlan && <button
                  className="btn btn-primary"
                  onClick={handleBuyPlan}
                  disabled={isOrganization && !organizationName}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  Buy Plan
                </button>}
              </div> 
              <div className="mt-5">
                <h5>Want to learn more about our pricing &amp; plans?</h5>
                <p>
                  Read our <a href="pricing-plans.html">Plans</a>, <a href="#">Billing &amp; Payment</a>, <a href="#">FAQs</a> to learn more about our service.
                </p>
              </div>
            </div>
            </>
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export  default PricingPlans;