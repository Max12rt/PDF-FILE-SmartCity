import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const logoutNavbar = async () => {
    try {
      // Assuming you have a logout function in your AuthContext that handles the client-side logout
      await logout();

      // After the client-side logout, make a POST request to the server logout endpoint
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include credentials for cookie to be sent
      });

      if (response.ok) {
        console.log(response.text());
        navigate("/login");
      } else {
        // Handle server error or failed logout
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="links">
            <Link className="link" to="/">
              <h6>Home</h6>
            </Link>
            <Link className="link" to="/acountManegment">
              <button>AcountManagment</button>
            </Link>
            {currentUser ? (
                <>
                  <span>{currentUser.username}</span>
                  <span onClick={logoutNavbar}>Logout</span>
                </>
            ) : (
                <>
                  <Link className="link" to="/login">
                    <h6>Login</h6>
                  </Link>
                  <Link className="link" to="/register">
                    <h6>Register</h6>
                  </Link>
                </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Navbar;
