import React from 'react'
import './analyticsTable.css'
import { useEffect, useState, useMemo } from 'react'
// import { fetchAppName, fetchTableData } from '../api';



const AnalyticsTable = ({dateObj}) => {

  const [data, setData] = useState([]);
  const [appName, setAppName] = useState([]);
  const [error, setError] = useState({});
  // const dateRange = useMemo(() => [dateObj.startDate, dateObj.endDate], [dateObj.startDate, dateObj.endDate]);
  // console.log("dateRange", dateRange);

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

  console.log("setData ",data);
  console.log("appName ",appName);
  return (
    <div className='Table'>
        <table className='displayTable'>
            <thead>
              <tr>
                <th>Date</th>
                <th>App</th>
                <th>Requests</th>
                <th>Responses</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Revenue</th>
                <th>Fill Rate</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
              <tr >
                <td>{convertDate(item.date)}</td>
                <td>{item.app_id}</td>
                <td>{item.requests.toLocaleString()}</td>
                <td>{item.responses.toLocaleString()}</td>
                <td>{item.impressions}</td>
                <td>{item.clicks}</td>
                <td>{item.revenue.toFixed(2)}</td>
                <td>{fillRate(item.requests, item.responses)}</td>
                <td>{cTR(item.clicks, item.impressions)}</td>
            </tr>
          ))}
            </tbody>
        </table>
    </div>
  )
}

export default React.memo(AnalyticsTable);