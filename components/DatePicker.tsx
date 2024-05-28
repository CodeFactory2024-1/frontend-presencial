import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';

const STATE = { input: null, value: "" };
const DATE_FORMAT = 'YYYY-MM-DD';


export default function ResponsiveDatePickers({handleDateChange}:any) {

 
  const [date, setDate] = React.useState(STATE)

  const formatDate = (valueWithOutFormat:any) => {
    const result = dayjs(valueWithOutFormat.$d).format(DATE_FORMAT)
    setDate({ input: valueWithOutFormat, value: result })
  }
  
  React.useEffect(() => {
    handleDateChange(date.value)
  }, [date.value])

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
                label="Date"
                value={date.input}
                onChange={(newValue) => formatDate(newValue)}
              />
    </LocalizationProvider>
  );
}

