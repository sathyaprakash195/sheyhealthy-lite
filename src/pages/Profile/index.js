import React from "react";
import { Tabs } from "antd";
import Appointments from "./Appointments";
import DoctorForm from "../DoctorForm";
import moment from "moment";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Appointments" key="1">
          <Appointments />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Profile" key="2">
          {user.role === "doctor" && <DoctorForm />}

          {user.role !== "doctor" && (
            <div className="my-1 bg-white p-1 flex flex-col gap-1">
              <div className="flex gap-2">
                <h4>
                  <b>Name : {user.name}</b>
                </h4>
              </div>
              <div className="flex gap-2">
                <h4>
                  <b>Email : {user.email}</b>
                </h4>
              </div>
              <div className="flex gap-2">
                <h4>
                  <b>
                    Created On : {moment(user?.createdAt).format("DD-MM-YYYY hh:mm A")}
                  </b>
                </h4>
              </div>
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
