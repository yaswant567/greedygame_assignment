import React, { useState } from 'react'
import './dimenAndMetric.css';

const DimenAndMetric = ({columnObj, settingsVisibility, Flag, fetchColumnOrder}) => {

  const [columnOrder, setColumnOrder] = useState(['Date', 'App', 'Clicks', 'Ad_Requests', 'Ad_Response', 'Impression', 'Revenue', 'Fill_Rate', 'CTR']);

  const [containerVisibility, setContainerVisibility] = useState(false);

  const [draggedItemId, setDraggedItemId] = useState(null);

  const[updateColumnVisibility, setUpdateColumnVisiblity] = useState({
      Date: true,
      App: true,
      Clicks: true,
      Ad_Requests: true,
      Ad_Response: true,
      Impression: true,
      Revenue: true,
      Fill_Rate: true,
      CTR: true,
    });

  const handleColumnVisibilityChange = (key) => {
    setUpdateColumnVisiblity((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const updateVisibility = () =>{
    columnObj(updateColumnVisibility);
    fetchColumnOrder(columnOrder);
  }

  const closeContainer = () =>{
    setContainerVisibility(!Flag);
    settingsVisibility(containerVisibility);
  }

  const getSubContainerClass = (item) =>{
    return updateColumnVisibility[item] ? 'sub_container' : 'sub_container clicked';
  }

  const handleDragStart = (e) => {
    const id = e.target.id;
    e.dataTransfer.setData('text/plain', id);
    setDraggedItemId(id);
  };

  const handleDragOver = (e) =>{
    e.preventDefault();
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const newOrder = [...columnOrder];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = newOrder.indexOf(targetId);
    if (draggedIndex !== -1 && targetIndex !== -1) {
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedId);
      setColumnOrder(newOrder);
    }
    setDraggedItemId(null);
  };

  return (
        <div className='dimension_Metric'>
            <>Dimensions and Metrics</>
            <div className='container'>  
            {columnOrder.map((columnId) => (<span className={getSubContainerClass(columnId)} onClick={() => handleColumnVisibilityChange(columnId)} draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, columnId)} id={columnId}>{columnId}</span> ))}
            </div>
            <div className='submitVisiblility'>
              <span className="submit" onClick={() => updateVisibility()}>Apply Changes</span>
              <span className='close' onClick={() => closeContainer()}>Close</span>
            </div>
        </div>
    )
}

export default DimenAndMetric