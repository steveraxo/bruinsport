
import React, { Component } from "react"
import Link from 'gatsby-link'
import "./buttons.css"
class InternalButton extends Component {
    render() {
        const props = this.props; 
        return (
            <Link  to={props.redirectionLink}>
                <button tabIndex={-1}  className={props.buttonClass}>
                    {props.buttonText}
                </button>
            </Link>
        )
    }
}
export default InternalButton
