import React from 'react'

const AnalyticsTable = () => {
  return (
    <div className='Table'>
        <table>
            <thead>
                <th>Date</th>
                <th>App Name</th>
                <th>AD Request</th>
                <th>AD Response</th>
                <th>Impression</th>
                <th>Clicks</th>
                <th>Revenue</th>
                <th>Fill Rate</th>
                <th>CTR</th>
            </thead>
        </table>
    </div>
  )
}

export default AnalyticsTable