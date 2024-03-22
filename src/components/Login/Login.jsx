import React, { useState } from "react";
import "./Login.css";
import axios from "../../axios";
import { BASE_URL } from "../../Constant/constant";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    let redirectUri = process.env.REACT_APP_SERVER_URL + "/auth/callback";
    let clientId = process.env.REACT_APP_CLIENT_ID;
    // "1038681536837-5apaj089qgtgfftk7apk44bpoa3ll15u.apps.googleusercontent.com";
    try {
      window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile`,
        "_self"
      );
      console.log(redirectUri);
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      axios.post(BASE_URL + "/login", { email, password }).then((response) => {
        console.log(response.data);
        if (!response.data.err) {
          dispatch({ type: "refresh" });
          console.log('login');
          return navigate("/");
        } else {
          setErr(response.data.message);
        }
      });
    } else {
      setErr("All fields are required");
    }
  };
  return (
    <div>
      <div className="signup">
        <div className="signup-connect"></div>
        <div className="signup-classic">
          <h5 className="errorMessage">{err}</h5>
          <form onSubmit={handleSubmit} className="form">
            <fieldset className="email">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="password">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>
            <button
              type="submit"
              className="btn"
              style={{ background: "#00a9f0" }}
            >
              Login
            </button>
          </form>
          <div>
            <button
              className="mb-3 w-100 d-flex justify-content-center mt-2 btn btn-light p-2"
              onClick={handleGoogleLogin}
              size="lg"
              style={{ backgroundColor: "white", color: "black",fontSize: "17px"  }}
            >

              {/* <MDBIcon fab icon="google-g" className="mx-2" /> */}
              <FcGoogle className="m-1 me-2" />
              Continue with Google
            </button>
          </div>
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
            to={"/signup"}
          >
            Don't have account? Create Account.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
