import React, { useState} from 'react'
import Aux from '../../hoc/Auxi/Auxilliary'
import Modal from '../UI/Modal/Modal'
import './HistoricalTable.css'
const HistoryTable = (props) => {
const [show, setShow] = useState(false)
const showModalHandle =() =>{
  const showHandle =show
  setShow(!showHandle)
}

function getYear_1(num) {
  return num.substring(0, 4)
}
function getMonth_1(num) {
  return num.substring(5, 7);
}
function getDay_1(num) {
  return num.substring(8, 10);
}
function getTime_1(num) {
  return num.substring(11, 16);
}

function formatDate(date) {
 
  return [
    getDay_1(date),
    getMonth_1(date),
    getYear_1(date)
    
 
  ].join('/');
}
const findTimeStamp = (myDate) => {
  
  myDate = myDate.split("/");
  var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
  return newDate.getTime();
}
const renderList = props.exchange.map((element, index) => {
 const goodDate= `${formatDate(element.createdAt)} ${getTime_1(element.createdAt)}`
 var cmDate = formatDate(element.createdAt);
 const commingDateT = findTimeStamp(cmDate)

 const fromDateT = findTimeStamp(props.fromDate)
 const toDateT = findTimeStamp(props.toDate)
if(props.getAll){
  return <tr key={index}>
  <td>{goodDate}</td>
  <td>{element.from}</td>
  <td>{element.amount1}</td>
  <td>{element.to}</td>
  <td>{element.amount2}</td>
  <td style={{color:'green'}}>{element.type}</td>
</tr>
}
else if (props.filter&&(commingDateT>=fromDateT&&commingDateT<=toDateT)){
  return <tr key={index}>
  <td>{goodDate}</td>
  <td>{element.from}</td>
  <td>{element.amount1}</td>
  <td>{element.to}</td>
  <td>{element.amount2}</td>
  <td style={{color:'green'}}>{element.type}</td>
</tr>}
else return <tr key={index}><td></td></tr>


}
);

  return (
    <Aux>
           <Modal show={show} showModalHandle={showModalHandle}/>
      <table id="customers-desktop">
        <thead>
          <tr>
            <th>Date&Time</th>
            <th>Currency From</th>
            <th>Ammount1</th>
            <th>Currency To</th>
            <th>Ammount2</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {renderList}
        </tbody>
        <tfoot>

        </tfoot>
      </table>
      <div id="customers-mobile">
        <div>
          <div className='historical-row' onClick={showModalHandle}>
            <div className='ex-cover'>
              <div className='exchange'>
                Bitcoin -> USD
              </div>
              <div className='exchange-on'>
              </div>
            </div>
            <div className='amount'>Amount BTC 2.5656565656</div>
          </div>
          <div className='historical-row'>
            <div className='ex-cover'>
              <div className='exchange'>
                Bitcoin -> USD
              </div>
              <div className='exchange-on'>
              </div>
            </div>
            <div className='amount'>Amount BTC 2.5656565656</div>
          </div>
          <div className='historical-row'>
            <div className='ex-cover'>
              <div className='exchange'>
                Bitcoin -> USD
              </div>
              <div className='exchange-on'>
              </div>
            </div>
            <div className='amount'>Amount BTC 2.5656565656</div>
          </div>
          <div className='historical-row'><div className='ex-cover'>
            <div className='exchange'>
                Bitcoin -> USD
            </div>
            <div className='exchange-on'>
            </div>
          </div>
            <div className='amount'>Amount BTC 2.5656565656</div>
          </div>
        </div>
      </div>
 
      <div className='pagination-index'>
        <div className='pagination-active' onClick={props.clickedOne}>1</div>
        <div className='pagination-number' onClick={props.clickedTwo}>2</div>
        <div className='pagination-number' onClick={props.clickedThree}>3</div>
        <div className='pagination-number' >...</div>
        <div className='pagination-number'>{props.total}</div>
        <div className='pagination-next'onClick={props.clicked}>Next </div>
      </div>
    </Aux>
  )

}
export default HistoryTable