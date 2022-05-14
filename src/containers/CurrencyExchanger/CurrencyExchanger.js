import React, { useState, useEffect} from "react";
import Aux from '../../hoc/Auxi/Auxilliary'
import Date from '../../components/Date/Date'
import HistoryTable from '../../components/HistoricalTable/HistoricalTable'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const CurrencyExchanger = () => {
    const [exchange, setExchange] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)
    const [total, setTotal] = useState(0)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [pageNum, setPageNum] = useState(0)
    const [filter, setFilter] = useState(0)
    const [getAll, setGetAll] = useState(1)
    useEffect(() => {
      const fetchAllData = async () => {
        const response = await fetch(`http://localhost:4000/api/v1/exchange`);
        const newData = await response.json();
        console.log(newData)
        setTotal(newData.results.length)
        // console.log(newData.results.length)
        // setExchange(newData)
      };
      fetchAllData()
      const fetchData = async () => {
        const response = await fetch(`http://localhost:4000/api/v1/exchange?page=${pageNum+1}&limit=4`);
        const newData = await response.json();
        setExchange(newData.results)
      };
    
      fetchData();
   
    
    
      }, [refreshKey, pageNum])
      
      const refleshHandle = () =>{
        setRefreshKey(oldKey => oldKey +1)
      }
      const paginationHandle = () =>{
        let pageN =pageNum+1
        setPageNum(pageN)
      }
      const paginationHandleOne = () => {
        let pageN =0
        setPageNum(pageN)

      }
      const paginationHandleTwo = () => {
        let pageN =2
        setPageNum(pageN)
        
      }
      const paginationHandleThree = () => {
        let pageN =3
        setPageNum(pageN)
        
      }
      const fromDateHandle = (date) => {
        setFromDate(date)

      } 
      const toDateHandle = (date) => {
        setToDate(date)
      } 
      const filterHandle = () => {
        let fltr = filter
        setFilter(!fltr)
      }
      const getAllHandle = () => {
        let gtll = getAll
        setGetAll(!gtll)
      }
    console.log(total)
        return (
            <Aux>
                <Toolbar refreshHandle={refleshHandle} />
                <Date 
                  fromDateHandle={fromDateHandle}
                  toDateHandle={toDateHandle}
                  filterHandle={filterHandle}
                  getAllHandle={getAllHandle}
                />  
                <HistoryTable exchange={exchange}
                  clicked={paginationHandle}
                  fromDate={fromDate}
                  toDate={toDate}
                  clickedOne={paginationHandleOne}
                  clickedTwo={paginationHandleTwo}
                  clickedThree={paginationHandleThree}
                  filter={filter}
                  getAll={getAll}
                  total ={total}
                  
                  />
            </Aux>
        )
    
}
export default CurrencyExchanger