import React from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Auth() {
  const [click, setClick] = React.useState(false);
  return (
    <div className="container">
      <input type="checkbox" id="check" />
      <Login click={click} />
      <Register click={click} />
      <div className="signup">
        <span className="signup">
          {!click ? "Don't have an account? " : "Already have an account? "}
          <label htmlFor="check" onClick={() => setClick(!click)}>
            {!click ? "Register" : "Login"}
          </label>
        </span>
      </div>
    </div>
  );
}

export default Auth;

function Login({ click }) {
  const [uname, setUname] = React.useState("");
  const [pass, setPass] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/auth/login", {
        username: uname,
        password: pass,
      });
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/home");
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Username or Password is incorecct!");
    }
  };

  return (
    <div className="lo">
      <div>

      </div>
      {!click && (
        <div className="login form">
          <header>Login</header>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              required={true}
              value={uname}
              onChange={(e) => setUname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required={true}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <input type="submit" className="button" value="Login" />
          </form>
        </div>
      )}
    </div>
  );
}

function Register({ click }) {
  const [uname, setUname] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [cpass, setCpass] = React.useState("");
  const [error, setError] = React.useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error === 0) {
      try {
        await axios.post("http://localhost:2000/auth/register", {
          username: uname,
          password: pass,
        });
        toast.success("Registered successfully!")
        setUname("");
        setPass("");
      } catch (error) {
        console.log(error);
        toast.error("Username already exists!");
      }
    }
  };

  React.useEffect(() => {
    if (!(pass === cpass)) {
      setError(1);
    } else if (pass === "" && cpass === "") {
      setError(0);
    } else if (pass === cpass) {
      const decimal =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/;
      if (cpass.match(decimal)) {
        setError(0);
      } else {
        setError(-1);
      }
    }
  }, [cpass, pass]);
  return (
    <div className="lo">
      {click && (
        <div className="login form">
          <header>Register</header>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              required={true}
              value={uname}
              onChange={(e) => setUname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required={true}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {error === 1 && (
              <span className="error">Passwords do not match</span>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              required={true}
              value={cpass}
              onChange={(e) => setCpass(e.target.value)}
            />
            {error === -1 && (
              <span className="li error">
                <ul>
                  <li>Length: 8-10 characters</li>
                  <li>At least 1 uppercase letter </li>
                  <li>At least 1 lowercase letter </li>
                  <li>At least 1 special character </li>
                  <li>At least 1 number</li>
                </ul>
              </span>
            )}
            <input type="submit" className="button" value="Register" />
          </form>
        </div>
      )}
    </div>
  );
}
