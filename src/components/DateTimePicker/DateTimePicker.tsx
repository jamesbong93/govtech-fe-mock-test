import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  // eslint-disable-next-line no-unused-vars
  onDateChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  /**
   * Handles the change of the date.
   * @param {Date} date - The selected date.
   * @returns {void}
   */
  const handleDateChange = (date: Date) => {
    setStartDate(date);
    onDateChange(date);
  };

  // Get current date
  const currentDate = new Date();

  return (
    <div className="datetime-picker-container">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="Pp"
        className="datetime-picker"
        maxDate={currentDate} // Set the maximum selectable date to the current date
      />
    </div>
  );
};

export default DateTimePicker;
