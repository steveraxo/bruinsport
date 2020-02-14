import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
import "./css/team.css"
import Popup from "reactjs-popup";
import ExternalButton from "../components/master/buttons/externalButton"
import Img from "gatsby-image"
import BruinLogo from "../images/media/bruin-letter.png"


class MediaPage extends Component {
  focusMain(){
    setTimeout(function(){ 
    // Focus the element on the burguer menu
    document.getElementById("close__menu").focus(); 

    document.querySelectorAll('html')[0].classList.add('html__custom')
    
    // Trap the focus loop inside the menu
    var theElement = document.querySelectorAll('.popup__inner')[0].id; 

    var element = document.getElementById(theElement)
     
    var focusableEls = false; 

    if(theElement === 'popup__main'){
        focusableEls = document.querySelectorAll('#popup__main .close, #popup__main a, #popup__main iframe ');
        document.querySelectorAll('.team__page .main__section')[0].classList.add('no__clipPath')
    }

    if(theElement === 'popup__team'){
        focusableEls = document.querySelectorAll('#popup__team .close, #popup__team .btn-main a ');
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
    document.querySelectorAll('.team__page .main__section')[0].classList.remove('no__clipPath')

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
    document.querySelectorAll('.team__page .main__section')[0].classList.remove('no__clipPath')
  }
  render() {
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const pageAcf = this.props.data.allWordpressPage.edges[0].node.acf
    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={ pageData.title }/>
                <title>{ pageData.yoast_title }</title>
                <link rel="canonical" href={globalHistory.location.origin} />
            </Helmet>
            <div className={'team__page'}>
                <section className={'main__section container-fluid'}>
                    <div className="page__background">
                        <div className={'fade__top'}></div>
                        <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={' '} tabIndex={-1}/>
                    </div>
                    <div className="media__list__background">
                        <img src={BruinLogo} alt={' '} />
                    </div>
                    <div className={'container'}>
                        <div className={'row main__row'}>
                            <div className={'col-md-12 col-xl-8'}>
                                <div dangerouslySetInnerHTML={{__html: pageAcf.main_copy}} />

                                <Popup onOpen={this.focusMain} onClose={this.changeBodyScroll} modal closeOnEscape closeOnDocumentClick trigger={<button className={'md-btn'}>Learn More</button>} position="center center">
                                {close => (
                                    <div>
                                        <div className="popup__inner featured__wrapper team__main__popup" id={'popup__main'}>
                                            <div className="triangle__big"></div>
                                            <div className="triangle__small"></div>
                                            <div className="featured__article row">
                                                <div className={'col-md-12 col-lg-6'}>
                                                    <div className="featured__artitle__inner">
                                                        <div className="featured__article__top">
                                                            <p className="featured__article__full__copy" dangerouslySetInnerHTML={{__html: pageAcf.full_copy}} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'col-md-12 col-lg-6'}>
                                                    <div className={'popup_iframe'}>
                                                        <div className="featured__article__iframe" dangerouslySetInnerHTML={{__html: pageAcf.video_iframe}} />
                                                    </div>
                                                    <div className={'popup__logos row'}>
                                                        {
                                                            pageAcf.popup_logos.map((element, index) => 
                                                                <div className={'col-xs-6 col-sm-4 col-md-4 col-lg-4 d-flex justify-content-center align-items-center'} key={`logo-${index}`}>
                                                                    <a href={element.url} target={'_BLANK'} rel="noopener noreferrer">
                                                                        <img src={element.logo.source_url} alt={' '} tabIndex={-1}/>
                                                                        <p className="featured__article__logo__desc" dangerouslySetInnerHTML={{__html: element.title}} />
                                                                    </a>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                      
                                        <button className="close" tabIndex="0" onClick={close} onKeyPress={close} id="close__menu" ></button>
                                    </div>
                                )}
                            </Popup>

     
                            </div>
                            <div className={'col-md-12 col-xl-4'}></div>
                        </div>
                    </div> 
                </section>

                <section className={'team__section container-fluid'}>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-md-12 col-xl-6'}>
                                <div dangerouslySetInnerHTML={{__html: pageAcf.team_copy}} />
                            </div>
                            <div className={'col-md-12 col-xl-6'}></div>
                        </div>
                        <div className={'row team__members'}>
                            {
                                pageAcf.team_members.map((member, index) => 
                                    <div className={'col-sm-12 col-md-6 col-xl-4'} key={`${member.name}-${index}`}>
                                        <Popup     
                                            modal
                                            closeOnEscape
                                            closeOnDocumentClick
                                            onOpen={this.focusMain}
                                            onClose={this.changeBodyScroll}
                                            key={`d-${index}`}
                                            trigger={
                                                <img 
                                                    tabIndex={0}
                                                    src={member.photo.source_url}
                                                    alt={`${member.name}, member Bruin Sport Capital Team`}
                                                />
                                            }
                                        >
                                        {close => (
                                        <div>
                                            <div className="popup__inner featured__wrapper" id={'popup__team'}>
                                                <div className="triangle__big"></div>
                                                <div className="triangle__small"></div>
                                                
                                                <div className="featured__article row" key={index}>
                                                    <div className={'col-md-12 col-lg-4'}>
                                                    <Img 
                                                        tabIndex={0}
                                                        fixed={member.photo.localFile.childImageSharp.fixed}
                                                        alt={`${member.name}, member Bruin Sport Capital Team`}
                                                    />
                                                    </div>
                                                    <div className={'col-md-12 col-lg-8'}>
                                                        <div className="featured__artitle__inner">
                                                            <div className="featured__article__top">
                                                            <div className="featured__article__title">
                                                                <h4 className="featured__article__name" dangerouslySetInnerHTML={{__html: member.name}} />
                                                                <p className="featured__article__position" dangerouslySetInnerHTML={{__html: member.position}} />
                                                            </div>
                                                            <div className="featured__article__content" dangerouslySetInnerHTML={{__html: member.bio}} />
                                                            </div>
                                                            <div className="featured__article__cta">
                                                                <ExternalButton  redirectionLink={member.member_link} buttonText={'Read More'} buttonClass={'md-btn'}></ExternalButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <button className="close" tabIndex="0" onClick={close} onKeyPress={close}       id="close__menu" ></button>
                                         </div>
                                        )}
                                        </Popup>
                                        <div className={'team__inside'}>
                                            <h4 dangerouslySetInnerHTML={{__html: member.name}} />
                                            <p dangerouslySetInnerHTML={{__html: member.position}} />
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
  }
}
export default MediaPage

export const pageQuery = graphql`
query teamPageQuery {
  allWordpressPage(filter: {path: {eq: "/team/"}}) {
    edges {
      node {
        id
        title
        content
        yoast_title
        date(formatString: "MMMM DD, YYYY")
        featured_media {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 4000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        acf {
            main_copy
            full_copy
            video_iframe
            popup_logos{
                logo {
                    localFile {
                        childImageSharp {
                            fixed(width: 200, quality: 100) {
                                ...GatsbyImageSharpFixed_withWebp
                            }
                        }
                    }
                    source_url
                }
                title
                url
            }
            team_copy
            team_members{
                photo{
                    localFile {
                        childImageSharp {
                            fixed(width: 300, quality: 100) {
                                ...GatsbyImageSharpFixed_withWebp
                            }
                        }
                    }
                    source_url
                }
                name
                position
                bio
                member_link
            }
        }
      }
    }
  }
}
`