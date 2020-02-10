
import React, { Component } from "react"
import "./burguerButton.css"
class BurguerButton extends Component {
    // The next function handles the open and close of the menu and also includes the logic for a11y trap inside the menu
    handleMenu(e){
        e.preventDefault() 
        if (e.type === 'keypress'){
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
    }

    render() {
        const props = this.props; 
        return (
            <div aria-label={"Open the menu"} tabIndex="0" role="button" className={'ml-2 burguer__button ' + props.theme} onClick={this.handleMenu} onKeyPress={this.handleMenu} id="burguer-menu">
                <div aria-hidden={"true"} className="burguer__wrapper">
                    <div className={'burguer__line line-one'}></div>
                    <div className={'burguer__line line-two'}></div>
                    <div className={'burguer__line line-three'}></div>
                </div>
            </div>            
        )
    }
}
export default BurguerButton
