
import React, { Component } from "react"
import "./buttons.css"
class ExternalButton extends Component {
    render() {
        const props = this.props; 
        return (
            <a  href={props.redirectionLink} target={'_BLANK'} rel="noopener noreferrer">
                <button tabIndex={-1}  className={`btn-main ${props.buttonClass}`}>{props.buttonText}</button>
            </a>
        )
    }
}
export default ExternalButton
