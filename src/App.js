import { useCallback, useState } from 'react';
import AnalyticsTable from './Components/AnalyticsTable';
import SelectDate from './Components/SelectDate';
import './app.css';

function App() {
  const [dateRange, setDateRange] = useState({
    startDate: '2021-06-04',
    endDate: '2021-06-05',
  });
  
  function formatDateToYYYYMMDD(date) {
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, '0');
    const day = String(date?.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const handleDateSelection = useCallback((date) =>{
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const start = formatDateToYYYYMMDD(date.startDate);
    const end = formatDateToYYYYMMDD(date.endDate);
    setDateRange({startDate: start, endDate: end});
  },[]);
  return (
    <div className="App">
      <div className='left'></div>
      <div className='right'>
        <div className='right_top'>
          <SelectDate getDate={handleDateSelection}/>
        </div>
        <div className='right_bottom'>
          <AnalyticsTable dateObj={dateRange}/>
        </div>
      </div>
    </div>
  );
}

export default App;
