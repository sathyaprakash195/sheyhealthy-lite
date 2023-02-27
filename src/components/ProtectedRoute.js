import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="layout p-1">
      <div className="header bg-white p-2 flex justify-between items-center">
        <h2 className="cursor-pointer" onClick={() => navigate("/")}>
          <strong className="text-primary">SHEY</strong>
          <strong className="text-secondary"> HEALTHY</strong>
        </h2>

        {user && (
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 items-center">
              <i className="ri-shield-user-line"></i>
              <h4
                className="uppercase cursor-pointer underline"
                onClick={() => {
                  if (user.role === "admin") navigate("/admin");
                  else navigate("/profile");
                }}
              >
                {user.name}
              </h4>
            </div>

            <i
              className="ri-logout-box-r-line"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            ></i>
          </div>
        )}
      </div>
      <div className="content my-1">{children}</div>
    </div>
  );
}

export default ProtectedRoute;
