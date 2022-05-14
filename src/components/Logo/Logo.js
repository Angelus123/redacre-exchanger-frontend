import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/exchange-logo.png'
import './Logo.css'

const logo = (props) => (
    <Link to="/"><div className='Logo' style={{ height: props.height }}><img src={Logo} alt="CurrencyExchanges" />
    </div></Link>
)
export default logo