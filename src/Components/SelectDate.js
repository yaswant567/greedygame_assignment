import React, { useState, useEffect } from 'react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import './selectDate.css';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

const SelectDate = ({getDate}) => {

  //------------------------ useState -------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);

  const [rangeDate, setRangeDate] = useState([
    {
      startDate: new Date('2023-06-04'),
      endDate: new Date('2023-06-05'),
      key: 'selection'
    }]
  );

   
  //------------------------ Variables -------------------------------------------------------
  const options = { month: 'long' ,day: '2-digit' };
  const start = rangeDate[0]?.startDate?.toLocaleDateString('en-US', options);
  const end = rangeDate[0]?.endDate?.toLocaleDateString('en-US', options);
  const year = rangeDate[0]?.startDate?.getFullYear();


  //--------------------------- Functions -------------------------------------------------------
  const handleDateSelection = (item) => {
    setRangeDate([item.selection])
    getDate(item.selection);
  };
  // useEffect(() => {
  //   getDate(rangeDate[0]);
  // }, [rangeDate]);


  return (
    <div className='date'>
        <CalendarMonthRoundedIcon style={{ color: '#116FED' }}/>
        <div className='datePick' onClick={() => setIsVisible(!isVisible)} style={{color: '#212121'}}>
          {start} - {end}, {year}
        </div>
        {isVisible && <DateRange className="custom-date-range"
                    editableDateInputs={true} 
                    onChange={handleDateSelection} 
                   moveRangeOnFirstSelection={false} 
                   ranges={rangeDate}/>}
    </div>
  )
}

export default SelectDate;