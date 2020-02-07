import React, {Component} from "react"
import Link from 'gatsby-link'
import { globalHistory } from "@reach/router"
import TopMenu from "../menu/topMenu"
import "./header.css"
// Get the svg logo as a component
import Logo from "../../images/logo/bruinsport.png"
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { darkTheme: false };
  }
  // This functions gets the current pathname to match the current page item
  markCurrentPageItem(){
    let currentUrl = globalHistory.location.pathname

    if(currentUrl !== '/'){
      if ( [...currentUrl][currentUrl.length-1] === '/') {
        currentUrl = [...currentUrl];
        currentUrl.pop();
        currentUrl = currentUrl.toString();
        currentUrl = currentUrl.replace (/,/g, "");
      }
    }

    let currentPageItem = document.getElementById(currentUrl);

    if(currentPageItem){
      if(currentUrl === '/'){
        currentPageItem.classList.add('its__home__page');
      }else{
        currentPageItem.classList.add('current__page');
      }
    }
  }
  componentDidMount(){
    this.markCurrentPageItem()

    // Set the menu visibility to hidden
    setTimeout(function(){ 
      document.querySelectorAll('.main__menu')[0].style.visibility = "hidden";
    }, 500);
  }
  render() {
      let wpLogo = false; 
      if(this.props.siteLogo){
        wpLogo = this.props.siteLogo
      }
      return (
        <div className="header__wrapper">
          <div className="brand__wrapper" id="/">
            <Link to="/" className="brand__link">
              {
                wpLogo
                ?<img src={wpLogo} className="brand__svg__logo wp__logo" alt="Bruin Sport Capital" />
                :<img src={Logo} className="brand__svg__logo wp__logo" alt={"Bruin Sport Capital"} />
              }
            </Link>
          </div>
          <TopMenu />
        </div>
      )
  }
}
export default Header