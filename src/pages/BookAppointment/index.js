import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetDoctorById } from "../../apicalls/doctors";
import { ShowLoader } from "../../redux/loaderSlice";
import moment from "moment";
import {
  BookDoctorAppointment,
  GetDoctorAppointmentsOnDate,
} from "../../apicalls/appointments";

function BookAppointment() {
  const [problem = "", setProblem] = React.useState("");
  const [date = "", setDate] = React.useState("");
  const [doctor, setDoctor] = React.useState(null);
  const [selectedSlot = "", setSelectedSlot] = React.useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bookedSlots = [], setBookedSlots] = React.useState([]);

  const getData = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorById(id);
      if (response.success) {
        setDoctor(response.data);
      } else {
        message.error(response.message);
      }

      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  const getSlotsData = () => {
    const day = moment(date).format("dddd");
    if (!doctor.days.includes(day)) {
      return (
        <h3>Doctor is not available on {moment(date).format("DD-MM-YYYY")}</h3>
      );
    }

    let startTime = moment(doctor.startTime, "HH:mm");
    let endTime = moment(doctor.endTime, "HH:mm");
    let slotDuration = 60; // in minutes
    const slots = [];
    while (startTime < endTime) {
      // if(!bookedSlots?.find((slot) => slot.slot === startTime.format("HH:mm")))

      slots.push(startTime.format("HH:mm"));
      startTime.add(slotDuration, "minutes");
    }
    return slots.map((slot) => {
      const isBooked = bookedSlots?.find(
        (bookedSlot) =>
          bookedSlot.slot === slot && bookedSlot.status !== "cancelled"
      );
      return (
        <div
          className="bg-white p-1 cursor-pointer"
          onClick={() => setSelectedSlot(slot)}
          style={{
            border:
              selectedSlot === slot ? "3px solid green" : "1px solid gray",
            backgroundColor: isBooked ? "gray" : "white",
            pointerEvents: isBooked ? "none" : "auto",
            cursor: isBooked ? "not-allowed" : "pointer",
          }}
        >
          <span>
            {moment(slot, "HH:mm").format("hh:mm A")} -{" "}
            {moment(slot, "HH:mm").add(slotDuration, "minutes").format("hh:mm A")}
          </span>
        </div>
      );
    });
  };

  const onBookAppointment = async () => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        doctorId: doctor.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        date,
        slot: selectedSlot,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: JSON.parse(localStorage.getItem("user")).name,
        bookedOn: moment().format("DD-MM-YYYY hh:mm A"),
        problem,
        status: "pending",
      };
      const response = await BookDoctorAppointment(payload);
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  const getBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorAppointmentsOnDate(id, date);
      dispatch(ShowLoader(false));
      if (response.success) {
        console.log(response.data);
        setBookedSlots(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    if (date) {
      getBookedSlots();
    }
  }, [date]);
  return (
    doctor && (
      <div className="bg-white p-2">
        <h1 className="uppercase  my-1">
          <b>
            {doctor?.firstName} {doctor?.lastName}
          </b>
        </h1>

        <hr />

        <div className="flex flex-col gap-1 my-1 w-half">
          <div className="flex justify-between w-full">
            <h4>
              <b>Speciality : </b>
            </h4>
            <h4>{doctor.speciality}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Experience : </b>
            </h4>
            <h4>
              {doctor.experience}
              Years
            </h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Email : </b>
            </h4>
            <h4>{doctor.email}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Phone : </b>
            </h4>
            <h4>{doctor.phone}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Address : </b>
            </h4>
            <h4>{doctor.address}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Fee : </b>
            </h4>
            <h4>{doctor.fee}/- Per Session</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Days Available : </b>
            </h4>
            <h4>{doctor.days.join(",")}</h4>
          </div>
        </div>

        <hr />

        {/* slots here */}
        <div className="flex flex-col gap-1 my-2">
          <div className="flex gap-2 w-400 items-end">
            <div>
              <span>Select Date :</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
          </div>

          <div className="flex gap-2">{date && getSlotsData()}</div>

          {selectedSlot && (
            <div>
              <textarea
                placeholder="Enter your problem here"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows="10"
              ></textarea>
              <div className="flex gap-2 justify-center my-3">
                <button
                  className="outlined-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
                <button className="contained-btn" onClick={onBookAppointment}>
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default BookAppointment;
