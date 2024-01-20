import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
    onDateChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState<Date>(new Date());

    return (
        <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
                setStartDate(date);
                onDateChange(date);
            }}
            showTimeSelect
            dateFormat="Pp"
        />
    );
};

export default DateTimePicker;
