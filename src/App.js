import { useCallback, useState } from 'react';
import AnalyticsTable from './Components/AnalyticsTable';
import SelectDate from './Components/SelectDate';
import DimenAndMetric from './Components/DimenAndMetric';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import './app.css';

function App() {
  const [dateRange, setDateRange] = useState({
    startDate: '2021-06-04',
    endDate: '2021-06-05',
  });
  
  const[ColumnVisibility, setColumnVisiblity] = useState({
    Date: true,
    App: true,
    Clicks: true,
    Ad_Requests: true,
    Ad_Response: true,
    Impression: true,
    Revenue: true,
    Fill_Rate: true,
    CTR: true
});

  const [columnOrder, setColumnOrder] = useState(['Date', 'App', 'Clicks', 'Ad_Requests', 'Ad_Response', 'Impression', 'Revenue', 'Fill_Rate', 'CTR']);

  const [flag, setFlag] = useState(true);

  function formatDateToYYYYMMDD(date) {
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, '0');
    const day = String(date?.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const handleDateSelection = useCallback((date) =>{
    const start = formatDateToYYYYMMDD(date.startDate);
    const end = formatDateToYYYYMMDD(date.endDate);
    setDateRange({startDate: start, endDate: end});
  },[]);

  const updatedVisibility = (item) =>{
    setColumnVisiblity(item);
  }

  const containerVisibility = (item) =>{
    setFlag(item);
  }

  const fetchColumnOrder = (columnOrder) =>{
    setColumnOrder(columnOrder);
  }

  return (
    <div className="App">
      <div className='left'></div>
      <div className='right'>
        <div className='right_top'>
          <SelectDate getDate={handleDateSelection}/>
          <div className='setting' onClick={() => setFlag(!flag)}>
            <span style={{fontSize: '13px', fontWeight: 'bolder', color: '#1D1A1A'}}>Settings</span>
            <TuneRoundedIcon style={{ color: '#116FED' }}/>
          </div>
        </div>
        {flag &&<div className='right_middle'>
         <DimenAndMetric columnObj={updatedVisibility} settingsVisibility={containerVisibility} Flag={flag} fetchColumnOrder={fetchColumnOrder}/>
        </div>}
        <div className='right_bottom'>
          <AnalyticsTable dateObj={dateRange} updateVisibility={ColumnVisibility} columnOrder={columnOrder}/>
        </div>
      </div>
    </div>
  );
}

export default App;
