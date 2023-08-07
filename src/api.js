
export const fetchTableData = async (startDate, endDate) => {
    const response = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`);
}

export const fetchAppName = async()=>{
    const appResponse = await fetch(`/GET http://go-dev.greedygame.com/v3/dummy/apps`);
}