import React, { useState, useEffect } from 'react';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

const SelectDate = ({getDate}) => {

  //------------------------ useState -------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);

  const [rangeDate, setRangeDate] = useState([
    {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-01'),
      key: 'selection'
    }]
  );
   
  //------------------------ Variables -------------------------------------------------------
  const options = { month: 'long' ,day: '2-digit' };
  const start = rangeDate[0]?.startDate?.toLocaleDateString('en-US', options);
  const end = rangeDate[0]?.endDate?.toLocaleDateString('en-US', options);
  const year = rangeDate[0]?.startDate?.getFullYear();

  const handleDateSelection = (item) => {
    setRangeDate([item.selection])
    getDate(item.selection);
  };
  // useEffect(() => {
  //   getDate(rangeDate[0]);
  // }, [rangeDate]);

  return (
    <div>
        <div className='datePick' onClick={() => setIsVisible(!isVisible)}>
          <div>{start} - {end}, {year}</div>
        </div>
        {isVisible && <DateRange editableDateInputs={true} 
                    onChange={handleDateSelection} 
                   moveRangeOnFirstSelection={false} 
                   ranges={rangeDate}/>}
        
    </div>
  )
}

export default SelectDate;