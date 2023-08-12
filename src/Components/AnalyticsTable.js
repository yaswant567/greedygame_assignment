import React from 'react'
import './analyticsTable.css'
import { useEffect, useState } from 'react'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
// import { fetchAppName, fetchTableData } from '../api';



const AnalyticsTable = ({dateObj, updateVisibility, columnOrder}) => {

  const [data, setData] = useState([]);
  const [appName, setAppName] = useState([]);
  const [error, setError] = useState({});
  // const dateRange = useMemo(() => [dateObj.startDate, dateObj.endDate], [dateObj.startDate, dateObj.endDate]);
  // console.log("dateRange", dateRange);
//   const[ColumnVisibility, setColumnVisiblity] = useState({
  // Date: true,
  // App: true,
  // Clicks: true,
  // Ad_Requests: true,
  // Ad_Response: true,
  // Impression: true,
  // Revenue: true,
  // Fill_Rate: true,
  // CTR: true,
// });

  //------------------------ useEffect-------------------------------------------------------
  useEffect(() => {
    const fetchData = async () =>{
      
      try{
        const response = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${dateObj.startDate}&endDate=${dateObj.endDate}`);
        const appResponse = await fetch(`http://go-dev.greedygame.com/v3/dummy/apps`);
        if(!response.ok || !appResponse.ok){
          throw new Error('fasfsd');
        }
        
        const responseData = await response.json();
        const responseAppData = await appResponse.json();
        setData(responseData.data);
        setAppName(responseAppData.data);
      }
      catch(error){
        setError(error);
      }
    };
    fetchData();
  },[dateObj]);

  //---------------------- Functions ------------------------------------------------------------

  const convertDate =(item) =>{
    const date = new Date(item);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const fillRate = (adReq, adResp) =>{
    const rate = (adReq/adResp*100);
    return rate.toFixed(2);
  }

  const cTR = (click, impress) =>{
    const ctr = (click/impress*100);
    return ctr.toFixed(2);
  }

  const fetchAppName = (id) =>{
    const app = appName.find(item => item.app_id === id);
    return app ? app.app_name : 'Unknown';
  }

  const handleFilter = (item) =>{
    
    return (<input type="range" min='0' max='1000'>jhhj</input>);
    
  }

  return (
    <div className='Table'>
        <table className='displayTable'>
            <thead>
              <tr>
              {columnOrder.map((item) =>{

                if(item === 'Date' || item === 'App')
                {
                  return (<th><span className='Column'><><FilterAltRoundedIcon/></><>{item}</></span></th>);
                }

                // <th><span className='Column'><><FilterAltRoundedIcon/></><>Date</></span></th>
                // <th><span className='Column'><><FilterAltRoundedIcon/></><>App</></span></th>
                else{
                  return (updateVisibility[item] && <th><span className='Column'><><FilterAltRoundedIcon onClick={() => handleFilter(item)}/></><>{item}</></span></th>);
                }
              // {updateVisibility.requestColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>Requests</></span></th>}
              // {updateVisibility.responseColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>Responses</></span></th>}
              // {updateVisibility.impressionColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>Impressions</></span></th>}
              // {updateVisibility.clickColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>Clicks</></span></th>}
              // {updateVisibility.revenueColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>Revenue</></span></th>}
              // {updateVisibility.rateColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>Fill Rate</></span></th>}
              // {updateVisibility.ctrColumn && <th><span className='Column'><><FilterAltRoundedIcon/></><>CTR</></span></th>}
              })}
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
              <tr >
                {columnOrder.map((item) => {
                if(item === 'Date')  
                {return (<td>{convertDate(data.date)}</td>)};
                if(item === 'App')
                {return (<td>{fetchAppName(data.app_id)}</td>)};
                if(item === 'Ad_Requests')
                {return (updateVisibility[item] && <td>{data.requests.toLocaleString()}</td>)};
                if(item === 'Ad_Response')
                {return (updateVisibility[item] && <td>{data.responses.toLocaleString()}</td>)};
                if(item === 'Impression')
                {  return (updateVisibility[item] && <td>{data.impressions}</td>)};
                if(item === 'Clicks')
                { return (updateVisibility[item] && <td>{data.clicks}</td>)};
                if(item === 'Revenue')
                { return (updateVisibility[item] && <td>{data.revenue.toFixed(2)}</td>)};
                if(item === 'Fill_Rate')
                {return (updateVisibility[item] && <td>{fillRate(data.requests, data.responses)}</td>)};
                if(item === 'CTR')
                {return (updateVisibility[item] && <td>{cTR(data.clicks, data.impressions)}</td>)};
                })}
            </tr>
          ))}
            </tbody>
        </table>
    </div>
  )
}

export default React.memo(AnalyticsTable);