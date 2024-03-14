import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CCol, CContainer, CRow } from "@coreui/react";

const Page404 = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (counter < 1) {
      navigate("/");
    }
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter, navigate]);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Page Not Found!</h4>
              <p className="text-body-secondary float-start">
                Redirecting to the login page in <b>{counter}</b> seconds.
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page404;
