import React, {Component} from "react"
import Link from 'gatsby-link'
import MainMenu from "../menu/mainMenu"
import { globalHistory } from "@reach/router"
import "./header.css"
// Get the svg logo as a component
import Logo from "../../images/logo/bruinsport.png"

console.log(Logo);

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
  }
  render() {
      let wpLogo = false; 
      if(this.props.siteLogo){
        wpLogo = this.props.siteLogo
      }
      const title = this.props.siteTitle;
      return (
        <div className="header__wrapper">
          <div className="brand__wrapper" id="/">
            <Link to="/" className="brand__link">
              {
                // We check if wpLogo exist and if we dont, we load the logo
                // from the gatsby images component using the react-svg plugin.

                // If you want to set an different type image (png, jpg) you can 
                // remove the code  and add your own
                wpLogo
                ?<img src={wpLogo} className="brand__svg__logo wp__logo" alt="Raxo" />
                :<Logo/>
              }
            </Link>
          </div>
          <MainMenu theme={this.state.darkTheme ? '--dark' : '--light' }></MainMenu>
        </div>
      )
  }
}
export default Header