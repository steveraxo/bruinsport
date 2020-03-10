
import React, { Component } from "react"
import Img from "gatsby-image"
import Popup from "reactjs-popup";
import { Scrollbars } from 'react-custom-scrollbars';
import ExternalButton from '../master/buttons/externalButton';

import "./project.css"
class Project extends Component {
    focusMain(event){
        setTimeout(function(){ 
        // Focus the element on the burguer menu
        document.getElementById("close__menu").focus(); 

        if(event.target.getAttribute('class') === 'diagonal__button'){
            document.getElementById("diagonal").scrollIntoView();
        }
        
        document.querySelectorAll('html')[0].classList.add('html__custom')
        document.querySelectorAll('.portfolio__page .diagonal')[0].classList.add('no__clipPath')
        // Trap the focus loop inside the menu
        var theElement = document.querySelectorAll('.popup__inner')[0].id; 
    
        var element = document.getElementById(theElement)
         
        var focusableEls = false; 
    
        if(theElement === 'popup__team'){
            focusableEls = document.querySelectorAll('#popup__team .close');
        }   
    
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
         },1);
    }
    
    endModal(e) {
        document.querySelectorAll('html')[0].classList.remove('html__custom')
        document.querySelectorAll('.portfolio__page .diagonal')[0].classList.remove('no__clipPath')
        
        e.preventDefault() 
        if (e.type === 'keypress'){
            if(e.which === 32 || e.which === 13){
            [...document.querySelectorAll('.popup-overlay')][0].remove()
            }
        }else{
            [...document.querySelectorAll('.popup-overlay')][0].remove()
        }
    }
      
    changeBodyScroll(){
        // When the modal is hidden...
        document.querySelectorAll('html')[0].classList.remove('html__custom')
        document.querySelectorAll('.portfolio__page .diagonal')[0].classList.remove('no__clipPath')
    }

    render() {
        const projectData = this.props.projectData; 

        return (
            <>
                {
                    // ======= Diagonal Project Layout =======
                    projectData.project_layout === "diagonal"
                    ?   <div className={`our__approach featured__section container-fluid d-flex justify-content-center align-items-end ${projectData.project_layout} col-xl-12`} key={`0`} id={'diagonal'}>
                            <div className="page__background">
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className={'col-md-12 col-lg-12 col-xl-12 text-left'}>
                                    <img className={'svg__logo'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                    <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                    {
                                        projectData.opens_popup === true 
                                        ?<Popup     
                                                modal
                                                closeOnEscape
                                                closeOnDocumentClick
                                                onClick={this.centerview}
                                                onOpen={this.focusMain}
                                                onClose={this.changeBodyScroll}
                                                trigger={
                                                    <button className={'diagonal__button'} >
                                                        {projectData.button_text}
                                                    </button>
                                                }
                                            >
                                            {close => (
                                            <div>
                                                <div className="popup__inner featured__wrapper popup__portfolio" id={'popup__team'}>
                                                    <div className="triangle__big"></div>
                                                    <div className="triangle__small"></div>
                                                    <div className="featured__article row" >
                                                        <div className={'col-md-12 col-lg-12'}>
                                                        <Img 
                                                            tabIndex={0}
                                                            fluid={projectData.popup_background.localFile.childImageSharp.fluid}
                                                            alt={``}
                                                            className={'popup__background'}
                                                        />
                                                        <img className={'project__logo --floating'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                                        </div>
                                                        <div className={'col-md-12 col-lg-12'}>
                                                            <div className="featured__artitle__inner">
                                                                <div className="featured__article__top">
                                                                <div className={'col-md-12 col-lg-12'}>
                                                                <Scrollbars 
                                                                    renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                                                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                                                                    onScroll={this.handleScroll}
                                                                    onScrollFrame={this.handleScrollFrame}
                                                                    onScrollStart={this.handleScrollStart}
                                                                    onScrollStop={this.handleScrollStop}
                                                                    onUpdate={this.handleUpdate}
                                                                    renderView={this.renderView}

                                                                    autoHeight
                                                                    autoHeightMin={0}
                                                                    universal={true} 
                                                                >
                                                                    <div className="featured__article__content" dangerouslySetInnerHTML={{__html: projectData.popup_content}} />
                                                                </Scrollbars>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="close" tabIndex="0" onClick={close} onKeyPress={close}       id="close__menu" ></button>
                                            </div>
                                            )}
                                        </Popup>
                                        :
                                        <ExternalButton redirectionLink={projectData.project_link} buttonText={projectData.button_text} buttonClass={'diagonal__button'} />
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    :''
                }
                {
                    // ======= Half Left Project Layout =======
                    projectData.project_layout === "half-left"
                    ?   <div className={'col-md-12 col-lg-6 portfolio_half right__portfolio'} key={`2`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <img className={'svg__logo'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                </div>
                                {
                                        projectData.opens_popup === true 
                                        ?<Popup     
                                                modal
                                                closeOnEscape
                                                closeOnDocumentClick
                                                onClick={this.centerview}
                                                onOpen={this.focusMain}
                                                onClose={this.changeBodyScroll}
                                                trigger={
                                                    <button className={''} >
                                                        {projectData.button_text}
                                                    </button>
                                                }
                                            >
                                            {close => (
                                            <div>
                                                <div className="popup__inner featured__wrapper popup__portfolio" id={'popup__team'}>
                                                    <div className="triangle__big"></div>
                                                    <div className="triangle__small"></div>
                                                    <div className="featured__article row" >
                                                        <div className={'col-md-12 col-lg-12'}>
                                                        <Img 
                                                            tabIndex={0}
                                                            fluid={projectData.popup_background.localFile.childImageSharp.fluid}
                                                            alt={``}
                                                            className={'popup__background'}
                                                        />
                                                        <img className={'project__logo --floating'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                                        </div>
                                                        <div className={'col-md-12 col-lg-12'}>
                                                            <div className="featured__artitle__inner">
                                                                <div className="featured__article__top">
                                                                <div className={'col-md-12 col-lg-12'}>
                                                                <Scrollbars 
                                                                    renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                                                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                                                                    onScroll={this.handleScroll}
                                                                    onScrollFrame={this.handleScrollFrame}
                                                                    onScrollStart={this.handleScrollStart}
                                                                    onScrollStop={this.handleScrollStop}
                                                                    onUpdate={this.handleUpdate}
                                                                    renderView={this.renderView}

                                                                    autoHeight
                                                                    autoHeightMin={0}
                                                                    universal={true} 
                                                                    
                                                                            
                                                                >
                                                                    <div className="featured__article__content" dangerouslySetInnerHTML={{__html: projectData.popup_content}} />
                                                                </Scrollbars>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="close" tabIndex="0" onClick={close} onKeyPress={close}       id="close__menu" ></button>
                                            </div>
                                            )}
                                        </Popup>
                                        :
                                        <ExternalButton redirectionLink={projectData.project_link} buttonText={projectData.button_text} buttonClass={''} />
                                    }
                            </div>
                        </div>
                    :''
                }
                {
                    // ======= Half Right Project Layout =======
                    projectData.project_layout === "half-right"
                    ?   <div className={'col-md-12 col-lg-6 portfolio_half left__portfolio'} key={`1`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <img className={'svg__logo'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                </div>
                                {
                                        projectData.opens_popup === true 
                                        ?<Popup     
                                                modal
                                                closeOnEscape
                                                closeOnDocumentClick
                                                onClick={this.centerview}
                                                onOpen={this.focusMain}
                                                onClose={this.changeBodyScroll}
                                                trigger={
                                                    <button className={''} >
                                                        {projectData.button_text}
                                                    </button>
                                                }
                                            >
                                            {close => (
                                            <div>
                                                <div className="popup__inner featured__wrapper popup__portfolio" id={'popup__team'}>
                                                    <div className="triangle__big"></div>
                                                    <div className="triangle__small"></div>
                                                    <div className="featured__article row" >
                                                        <div className={'col-md-12 col-lg-12'}>
                                                        <Img 
                                                            tabIndex={0}
                                                            fluid={projectData.popup_background.localFile.childImageSharp.fluid}
                                                            alt={``}
                                                            className={'popup__background'}
                                                        />
                                                        <img className={'project__logo --floating'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                                        </div>
                                                        <div className={'col-md-12 col-lg-12'}>
                                                            <div className="featured__artitle__inner">
                                                                <div className="featured__article__top">
                                                                <div className={'col-md-12 col-lg-12'}>
                                                                <Scrollbars 
                                                                    renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                                                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                                                                    onScroll={this.handleScroll}
                                                                    onScrollFrame={this.handleScrollFrame}
                                                                    onScrollStart={this.handleScrollStart}
                                                                    onScrollStop={this.handleScrollStop}
                                                                    onUpdate={this.handleUpdate}
                                                                    renderView={this.renderView}

                                                                    autoHeight
                                                                    autoHeightMin={0}
                                                                    universal={true} 
                                                                    
                                                                            
                                                                >
                                                                    <div className="featured__article__content" dangerouslySetInnerHTML={{__html: projectData.popup_content}} />
                                                                </Scrollbars>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="close" tabIndex="0" onClick={close} onKeyPress={close}       id="close__menu" ></button>
                                            </div>
                                            )}
                                        </Popup>
                                        :
                                        <ExternalButton redirectionLink={projectData.project_link} buttonText={projectData.button_text} buttonClass={''} />
                                    }
                            </div>
                        </div>
                    :''
                }
                {
                    // ======= Full Width Project Layout =======
                    projectData.project_layout === "full-width"
                    ?   <div className={`col-md-12 col-lg-12 portfolio_full ${projectData.theme}`} key={`3`}>
                            <div className="page__background">
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                            </div>
                            <div className={'col-md-12 col-lg-6 first'}>

                            </div>
                            <div className={'col-md-12 col-lg-6 second'}>

                                <div className={'portfolio__inner'}>
                                    <div className={'portfolio__logo'}>
                                        <img className={'svg__logo'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                    </div>
                                    <div className={'porftolio__description'}>
                                        <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                    </div>
                                    {
                                        projectData.opens_popup === true 
                                        ?<Popup     
                                                modal
                                                closeOnEscape
                                                closeOnDocumentClick
                                                onClick={this.centerview}
                                                onOpen={this.focusMain}
                                                onClose={this.changeBodyScroll}
                                                trigger={
                                                    <button className={''} >
                                                        {projectData.button_text}
                                                    </button>
                                                }
                                            >
                                            {close => (
                                            <div>
                                                <div className="popup__inner featured__wrapper popup__portfolio" id={'popup__team'}>
                                                    <div className="triangle__big"></div>
                                                    <div className="triangle__small"></div>
                                                    <div className="featured__article row" >
                                                        <div className={'col-md-12 col-lg-12'}>
                                                        <Img 
                                                            tabIndex={0}
                                                            fluid={projectData.popup_background.localFile.childImageSharp.fluid}
                                                            alt={``}
                                                            className={'popup__background'}
                                                        />
                                                        <img className={'project__logo --floating'} src={projectData.project_logo.localFile.url} alt={'Client Logo'} tabIndex={0}/>
                                                        </div>
                                                        <div className={'col-md-12 col-lg-12'}>
                                                            <div className="featured__artitle__inner">
                                                                <div className="featured__article__top">
                                                                <div className={'col-md-12 col-lg-12'}>
                                                                <Scrollbars 
                                                                    renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                                                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                                                                    onScroll={this.handleScroll}
                                                                    onScrollFrame={this.handleScrollFrame}
                                                                    onScrollStart={this.handleScrollStart}
                                                                    onScrollStop={this.handleScrollStop}
                                                                    onUpdate={this.handleUpdate}
                                                                    renderView={this.renderView}

                                                                    autoHeight
                                                                    autoHeightMin={0}
                                                                    universal={true} 
                                                                    

                                                                >
                                                                    <div className="featured__article__content" dangerouslySetInnerHTML={{__html: projectData.popup_content}} />
                                                                </Scrollbars>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="close" tabIndex="0" onClick={close} onKeyPress={close}       id="close__menu" ></button>
                                            </div>
                                            )}
                                        </Popup>
                                        :
                                        <ExternalButton redirectionLink={projectData.project_link} buttonText={projectData.button_text} buttonClass={''} />
                                    }
                                </div>
                            </div>
                        </div>
                    :''
                }                                             
            </>
        )
    }
}
export default Project
