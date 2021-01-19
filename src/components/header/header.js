import React, { Component } from "react"
import Link from "gatsby-link"
import { globalHistory } from "@reach/router"
import TopMenu from "../menu/topMenu"
import "./header.css"
import Img from "gatsby-image"
import Logo from "../../images/logo/logo.svg"
// updating steveraxo repo
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { darkTheme: false }
  }
  // This functions gets the current pathname to match the current page item
  markCurrentPageItem() {
    let currentUrl = globalHistory.location.pathname

    if (currentUrl !== "/") {
      if ([...currentUrl][currentUrl.length - 1] === "/") {
        currentUrl = [...currentUrl]
        currentUrl.pop()
        currentUrl = currentUrl.toString()
        currentUrl = currentUrl.replace(/,/g, "")
      }
    }

    let currentPageItem = document.getElementById(currentUrl)

    if (currentPageItem) {
      if (currentUrl === "/") {
        currentPageItem.classList.add("its__home__page")
      } else {
        currentPageItem.classList.add("current__page")
      }
    }
  }
  componentDidMount() {
    this.markCurrentPageItem()

    // Set the menu visibility to hidden
    setTimeout(function() {
      document.querySelectorAll(".main__menu")[0].style.visibility = "hidden"
    }, 500)

    window.onscroll = function() {
      var header = document.getElementById("header__navbar")

      if (window.pageYOffset > 1) {
        header.classList.add("fixed-top")
      } else {
        header.classList.remove("fixed-top")
      }
    }
  }

  render() {
    let wpLogo = false
    if (this.props.siteLogo) {
      wpLogo = this.props.siteLogo
      console.log(wpLogo)
    }
    return (
      <div className="navbar  header__wrapper" id="header__navbar">
        <div className="brand__wrapper" id="brand__logo">
          <Link to="/" className="brand__link">
            {wpLogo ? (
              <img
                src={wpLogo.source_url}
                backgroundColor={"#000000"}
                className={"brand__svg__logo wp__logo"}
                alt={"Bruin Capital"}
                tabIndex={-1}
              />
            ) : (
              <img
                src={Logo}
                className="brand__svg__logo "
                alt={"Bruin Capital"}
              />
            )}
          </Link>
        </div>
        <TopMenu />
      </div>
    )
  }
}
export default Header
