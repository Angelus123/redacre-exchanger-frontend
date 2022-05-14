import React, {Component} from 'react'
import Aux from '../../../hoc/Auxi/Auxilliary'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
            return nextProps.show !== this.props.show|| nextProps.children !== this.props.children;
            //nextProps.show !== this.props.show;
        
    }
    render (){
        return (
            <Aux>
                <Backdrop show ={this.props.show} clicked= {this.props.showModalHandle} />
                <div 
                    className ="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.show ? '1':'0'}}>
                      <div className="modal-nav"><div className='modal-title'>Exchange</div>  <div style={{ float:'right'}} onClick={this.props.showModalHandle}>x</div> </div>
                    
                    <div className="modal-row"> <div className='modal-column-right'>Date & Time</div>  <div className='modal-column'>08/11/2019 @14:21</div></div>
                    <div className="modal-row"><div className='modal-column-right'>status</div>  <div className='modal-column'> <div style={{color:'green', display:'flex'}}><div className='exchange__on'>
                    </div> <div>Approved</div> </div></div></div>
                    <div className="modal-row"><div className='modal-column-right'>From</div>  <div className='modal-column'>Bitcoin</div></div>
                    <div className="modal-row"><div className='modal-column-right'>To</div>  <div className='modal-column'>USD</div></div>
                    <div className="modal-row"><div className='modal-column-right'>Amount</div>  <div className='modal-column'>$35.50 BTC 0.000419169</div></div>
                    <div className="modal-row"><div className='modal-column-right'>Total Amount</div>  <div className='modal-column'>$37.50 BTC 0.000419169</div></div>
                    <div className="modal-btm-close" onClick={this.props.showModalHandle}>CLOSE</div>
                </div>
            </Aux>
        )
    }
} 
export default Modal