import React, { useState } from 'react'
import axios from 'axios';
import './Toolbar.css'

const Toolbar = (props) => {
  const [currency_element, setCurrency_element] = useState(['currency'])
  const [currency_element_to, setCurrency_element_to] = useState(['currency__to'])
  const [cryptoType, setCryptoType] = useState("Bitcoin")
  const [currencyType, setCurrencyType] = useState("USD")
  const [cryptoAmount, setCryptoAmount] = useState("1")
  const [currencyAmount, setCurrencyAmount] = useState("30937.480969")
  const currency = ['USD']
  const crypto = ['Bitcoin', 'Eutherium', 'Litcoin']

  const postExchange = async (exchangeInfo, url) => {
    axios({
      method: "POST",
      url,
      data: exchangeInfo,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    })
      .then(function (response) {
        props.refreshHandle();
      })
      .catch(function (err) {
      })

  }
  const exchangeRateHandle = async () => {
    let url = "http://localhost:4000/api/v1/exchange"
    let exchangeUrl = `http://api.coinlayer.com/api/live?access_key=be115f363a0e70ac1615ed3cae167473&target=&${currencyType}&symbols=&${cryptoType}`;
    const res = await axios.get(exchangeUrl);
    let rates = res.data.rates
    let exchangeInfo = { type: 'exchange' }
    switch (cryptoType) {
      case "Bitcoin":
        exchangeInfo.from = "BTC"
        exchangeInfo.to = "USD"
        exchangeInfo.amount1 = cryptoAmount
        exchangeInfo.amount2 = cryptoAmount * rates.BTC
        setCurrencyAmount(exchangeInfo.amount2)
        postExchange(exchangeInfo, url)
        break;

      case "Eutherium":
        exchangeInfo.from = "ETH"
        exchangeInfo.to = "USD"
        exchangeInfo.amount1 = cryptoAmount
        exchangeInfo.amount2 = cryptoAmount * rates.ETH
        setCurrencyAmount(exchangeInfo.amount2)
        postExchange(exchangeInfo, url)

        break;

      case "Litcoin":
        exchangeInfo.from = "LTC"
        exchangeInfo.to = "USD"
        exchangeInfo.amount1 = cryptoAmount
        exchangeInfo.amount2 = cryptoAmount * rates.LTC
        setCurrencyAmount(exchangeInfo.amount2)
        postExchange(exchangeInfo, url)
        break;

      default:
        break;
    }
  }
  function toggleDatePicker() {
    let currencyElement = currency_element
    if (currencyElement[1] !== "active") {
      setCurrency_element_to(["currency__to"]);
      setCurrency_element(["currency", 'active']);
    }
    else {
      setCurrency_element(["currency"]);
    }
  }
  const selectCurrencyHandle = (item) => {
    setCryptoType(item)
    setCurrency_element(["currency"]);
  }

  const selectCurrencyHandleTo = (item) => {
    setCurrencyType(item)
    setCurrency_element_to(["currency"]);
  }


  function toggleDatePickerTo() {
    let currencyElementTo = currency_element_to

    if (currencyElementTo[1] !== "active") {
      setCurrency_element(["currency"]);
      setCurrency_element_to(["currency__to", 'active']);
    }

    else {
      setCurrency_element_to(["currency__to"]);
    }
  }

  return (
    <div className='toolbar-cover'>
      <div className="toolbar-container">
        <div className='toolbar-title'><h2>Exchange</h2></div>
        <div className="toolbar-row">

          <div className="toolbar-column">

            <p>Currency from</p>
            <div className='currency-from' onClick={toggleDatePicker}>{cryptoType} <div className='btn-dropdown'></div></div>
            <div className="currency-model-cover">
              <div className={currency_element.join(' ')}>
                {crypto.map((item, index) => {
                  return <div className="currency-type" key={index} onClick={() => selectCurrencyHandle(item)}>{item}</div>
                })}
              </div>
            </div>
          </div>
          <div className="toolbar-column">
            <p>Amount</p>
            <input className='currency-amount' value={cryptoAmount} onChange={(e) => setCryptoAmount(e.target.value)} />
          </div>
          <div className='toolbar-equal'> =</div>
          <div className="toolbar-column">
            <p>Currency To</p>
            <div className='currency-to' onClick={toggleDatePickerTo}>{currencyType}<div className='btn-dropdown'></div></div>
            <div className="currency-model-cover-to">
              <div className={currency_element_to.join(' ')}>
                {currency.map((item, index) => {
                  return <div className="currency-type" key={index} onClick={() => selectCurrencyHandleTo(item)}>{item}</div>
                })}
              </div>
            </div>
          </div>
          <div className="toolbar-column">
            <p>Amount</p>
            <input className='currency-amount' onChange={(e) => setCurrencyAmount(e.target.value)} value={currencyAmount} />
          </div>
          <div className="toolbar-column">
            <div className="toolbar-save" onClick={exchangeRateHandle}>SAVE</div>
            <div className="toolbar-exchange">EXCHANGE</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Toolbar