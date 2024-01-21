import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
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

    return (
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
        />
    );
};

export default DateTimePicker;
