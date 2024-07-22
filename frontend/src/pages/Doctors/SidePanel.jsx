import React, { useState } from "react";
import { BASE_URL, token } from "../../config";
import convertTime from "../../utils/convertTime";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(selectedDate);

  const handleDateChangeAndSave = async (newDate) => {
    setSelectedDate(newDate);

    const selectedDateISO = selectedDate.toISOString();
    await fetch(`${BASE_URL}/doctors/{id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Bearer} token`,
      },
      body: JSON.stringify({ date: selectedDateISO }),
    });
  };

  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(res);

      if (!res.ok) {
        throw new Error(data.message + "Please try again");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }

      console.log(timeSlots);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice}₹
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="mt-0 text__para font-semibold text-headingColor">
          Available time slots:
        </p>

        <ul className="mt-3 mb-3">
          {timeSlots?.map((item, index) => (
            <li key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {convertTime(item.startingTime)} -
                  {convertTime(item.endingTime)}
                </p>
              </div>

              <div className="mt-6">
                <form action="">
                  <label className="mb-3 text-headingColor">
                    Select Preffered Date And Time
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <DateTimePicker
                        value={selectedDate}
                        onChange={handleDateChangeAndSave}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  );
};
export default SidePanel;
