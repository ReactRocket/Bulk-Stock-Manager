import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginInitialise,
  loginSuccess,
  loginError,
} from "../../redux/slices/authentication.slice";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { authenticateUser } from "../../apis/authService";

const Login = () => {
  const navigate = useNavigate();
  const form = useRef();
  const data = useSelector((state) => state.authenticateUser.data);
  const loading = useSelector((state) => state.authenticateUser.loading);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginInitialise());
    try {
      const result = await authenticateUser(
        form.current.username.value,
        form.current.password.value
      );

      if (result) {
        dispatch(loginSuccess(result));
        navigate("/dashboard");
      } else {
        dispatch(loginError());
        form.current.reset()
      form.current.username.focus()
        
      }
    } catch (error) {
      dispatch(loginError());
      form.current.reset()
      form.current.username.focus()

    }
  };

  useEffect(() => {
    if (data || sessionStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [dispatch, navigate, data]);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center ">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm ref={form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {loading ? (
                          <CButton color="primary" disabled>
                            <CSpinner as="span" size="sm" aria-hidden="true" />{" "}
                            Login
                          </CButton>
                        ) : (
                          <CButton
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        )}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
