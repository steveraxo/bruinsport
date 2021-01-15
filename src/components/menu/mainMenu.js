import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "gatsby-link"
import "./menus.css"
import TwitterLogo from "../../images/logo/social/twitter.png"
import FacebookLogo from "../../images/logo/social/facebook.png"
import LinkedinLogo from "../../images/logo/social/linkedin.png"

// updating steveraxo repo

const MainMenu = props => {
  const data = useStaticQuery(graphql`
    query mainMenuQuery {
      allWordpressMenusMenusItems(filter: { slug: { eq: "side-menu" } }) {
        edges {
          node {
            id
            items {
              target
              title
              url
              classes
              attr_title
              wordpress_id
            }
          }
        }
      }
      wordpressAcfOptions {
        options {
          social_networks {
            profile_link
            social_network
          }
        }
      }
    }
  `)

  var menuItems = false
  var socialItems = false
  var menuId = false

  if (data.allWordpressMenusMenusItems) {
    menuItems = data.allWordpressMenusMenusItems.edges[0].node.items
    menuId = data.allWordpressMenusMenusItems.edges[0].node.id
  }
  if (data.wordpressAcfOptions) {
    socialItems = data.wordpressAcfOptions.options.social_networks
  }
  // The next function handles the open and close of the menu and also includes the logic for a11y trap inside the menu
  const handleMenu = e => {
    e.preventDefault()
    if (e.type === "keypress") {
      if (e.which === 32 || e.which === 13) {
        openMenu()
      }
    } else {
      openMenu()
    }
    function openMenu() {
      const mainMenu = document.querySelectorAll(".main__menu")
      if (mainMenu[0].classList.contains("opened")) {
        mainMenu[0].classList.remove("opened")
        mainMenu[0].classList.add("closed")
        mainMenu[0].setAttribute("aria-expanded", false)

        // Set the visibility to visible
        setTimeout(function() {
          mainMenu[0].style.visibility = "hidden"
          // Focus the element on the burguer menu
          document.getElementById("burguer-menu").focus()
        }, 1000)
      } else {
        mainMenu[0].classList.add("opened")
        mainMenu[0].classList.remove("closed")
        mainMenu[0].setAttribute("aria-expanded", true)
        // Set the visibility to visible
        setTimeout(function() {
          mainMenu[0].style.visibility = "visible"
          // Focus the element on the burguer menu
          document.getElementById("close-menu").focus()
          // Trap the focus loop inside the menu
          var element = document.getElementById("main-menu")
          var focusableEls = document.querySelectorAll(
            "#main-menu .menu__close__button, #main-menu .list__element a, #main-menu .social_nav a "
          )

          var firstFocusableEl = focusableEls[0],
            lastFocusableEl = focusableEls[focusableEls.length - 1],
            KEYCODE_TAB = 9

          element.addEventListener("keydown", function(e) {
            var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB
            if (!isTabPressed) {
              return
            }

            if (e.shiftKey) {
              /* shift + tab */ if (
                document.activeElement === firstFocusableEl
              ) {
                lastFocusableEl.focus()
                e.preventDefault()
              }
            } /* tab */ else {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus()
                e.preventDefault()
              }
            }
          })
        }, 1)
      }
    }
  }
  const closeMenu = e => {
    e.preventDefault()
    if (e.type === "keypress") {
      if (e.which === 32 || e.which === 13) {
        const mainMenu = document.querySelectorAll(".main__menu")
        mainMenu[0].classList.remove("opened")
        mainMenu[0].classList.add("closed")
        mainMenu[0].setAttribute("aria-expanded", false)

        // Set the visibility to visible
        setTimeout(function() {
          mainMenu[0].style.visibility = "hidden"
          // Focus the element on the burguer menu
          document.getElementById("burguer-menu").focus()
        }, 1000)
      }
    }
  }
  return (
    <nav
      className={`menu__wrapper main__menu menu-${menuId} `}
      key={menuId}
      id="main-menu"
      aria-expanded="false"
    >
      <div
        className="menu__close__button"
        id="close-menu"
        aria-label="Close Menu"
        tabIndex="0"
        role="button"
        onKeyPress={closeMenu}
        onClick={handleMenu}
      ></div>
      <ol>
        {menuItems
          ? menuItems.map((item, index) => (
              <li
                key={item.wordpress_id}
                className={`list__element ` + item.classes}
              >
                <Link to={item.url} id={item.url}>
                  <p>{item.title}</p>
                </Link>
              </li>
            ))
          : ""}
      </ol>
      <ul className={"social_nav"}>
        {socialItems
          ? socialItems.map((network, index) => (
              <a
                href={network.profile_link}
                key={`${network.social_network}-${index}`}
                target={"_BLANK"}
                rel="noopener noreferrer"
              >
                <li className={`social__item ${network.social_network}`}>
                  {network.social_network === "linkedin" ? (
                    <img src={LinkedinLogo} alt={"Linkedin Network Icon"} />
                  ) : (
                    ""
                  )}
                  {network.social_network === "facebook" ? (
                    <img src={FacebookLogo} alt={"Facebook Network Icon"} />
                  ) : (
                    ""
                  )}
                  {network.social_network === "twitter" ? (
                    <img src={TwitterLogo} alt={"Twitter Network Icon"} />
                  ) : (
                    ""
                  )}
                </li>
              </a>
            ))
          : ""}
      </ul>
    </nav>
  )
}
export default MainMenu
