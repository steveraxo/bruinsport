import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Link from "gatsby-link"
import { useCallback } from "react";
import "./menus.css"

const MainMenu = (props) => {
  const data = useStaticQuery(graphql`
    query mainMenuQuery {
      allWordpressMenusMenusItems(filter: {slug: {eq: "side-menu"}}) {
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
    }
  `)

  var menuItems = false; 
  var menuId = false; 
  if(data.allWordpressMenusMenusItems){
    menuItems = data.allWordpressMenusMenusItems.edges[0].node.items;
    menuId  = data.allWordpressMenusMenusItems.edges[0].node.id;
  }
  // The next function handles the open and close of the menu and also includes the logic for a11y trap inside the menu
  const handleMenu = useCallback(e => {
    e.preventDefault() 
    if (e.type == 'keypress'){
        if(e.which === 32 || e.which === 13){
            openMenu()
        }
    }else{
        openMenu()
    }
    function openMenu(){
        const mainMenu = document.querySelectorAll('.main__menu');
        if(mainMenu[0].classList.contains('opened')){
            
            mainMenu[0].classList.remove('opened')
            mainMenu[0].classList.add('closed')
            mainMenu[0].setAttribute('aria-expanded', false);
    
            // Set the visibility to visible
            setTimeout(function(){ 
              mainMenu[0].style.visibility = "hidden";
              // Focus the element on the burguer menu
              document.getElementById("burguer-menu").focus();  
              
              var focusableEls = false;
            }, 1000);
        }else{
            mainMenu[0].classList.add('opened')
            mainMenu[0].classList.remove('closed')
            mainMenu[0].setAttribute('aria-expanded', true);
            // Set the visibility to visible
            setTimeout(function(){        
              mainMenu[0].style.visibility = "visible";
              // Focus the element on the burguer menu
              document.getElementById("close-menu").focus();     
              // Trap the focus loop inside the menu
              var element = document.getElementById("main-menu")
              var focusableEls = document.querySelectorAll('#main-menu .menu__close__button, #main-menu .list__element a ');

              var firstFocusableEl = focusableEls[0],  
                  lastFocusableEl = focusableEls[focusableEls.length - 1],
                  KEYCODE_TAB = 9;
                  
                element.addEventListener('keydown', function(e) {
                    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
                    if (!isTabPressed) { 
                        return; 
                    }

                    if ( e.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            e.preventDefault();
                        }
                    }
                });
            }, 1);
        }
    }
    
  });
  const closeMenu = useCallback(e => {
    e.preventDefault() 
    if (e.type === 'keypress'){
        if(e.which === 32 || e.which === 13){
          const mainMenu = document.querySelectorAll('.main__menu');
          mainMenu[0].classList.remove('opened')
          mainMenu[0].classList.add('closed')
          mainMenu[0].setAttribute('aria-expanded', false);
  
          // Set the visibility to visible
          setTimeout(function(){ 
            mainMenu[0].style.visibility = "hidden";
            // Focus the element on the burguer menu
            document.getElementById("burguer-menu").focus();  
            
            var focusableEls = false;
          }, 1000);
        }
    }
  });
  return (
    <nav className={`menu__wrapper main__menu menu-${menuId} `} key={menuId} id="main-menu" aria-expanded="false" >
      <div className="menu__close__button" id="close-menu" aria-label="Close Menu" tabIndex="0" role="button" onKeyPress={closeMenu}  onClick={handleMenu}></div>
      <ol >
        {
          menuItems
          ? menuItems.map((item, index) => 
              <li key={item.wordpress_id}  className={`list__element ` + item.classes}>
                <Link to={item.url} id={item.url}>
                  <h5>{item.title}</h5>
                </Link>
              </li>
            )
          : ''
        }
      </ol>
    </nav>  
  )
}
export default MainMenu

