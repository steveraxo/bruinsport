
import React, { Component } from "react"
import Link from 'gatsby-link'
import "./buttons.css"
class InternalButton extends Component {
    render() {
        const props = this.props; 
        return (
            <button className={props.buttonClass}>
                <Link to={props.redirectionLink}>{props.buttonText}</Link>
            </button>
        )
    }
}
export default InternalButton
