
import React, { Component } from "react"
import "./buttons.css"
class ExternalButton extends Component {
    render() {
        const props = this.props; 
        return (
            <button className={`btn-main ${props.buttonClass}`}>
                <a href={props.redirectionLink} rel="noopener noreferrer">{props.buttonText}</a>
            </button>
        )
    }
}
export default ExternalButton
