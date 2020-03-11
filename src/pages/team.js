import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
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

  showContent(){
      document.querySelectorAll('.team__extra__copy')[0].classList.add('--show');
      document.querySelectorAll('.team__extra__second__copy')[0].classList.add('--show');
      document.querySelectorAll('.team__extra__content')[0].classList.add('--show');
      document.querySelectorAll('.team__page__first')[0].classList.add('--open');
      document.querySelectorAll('.team__section')[0].classList.add('--open');

      document.querySelectorAll('.team__page__first button')[0].classList.add('remove__content')
  }
  render() {
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const pageAcf = this.props.data.allWordpressPage.edges[0].node.acf
    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={ pageData.yoast_meta.yoast_wpseo_metadesc }/>
                <title>{ pageData.yoast_meta.yoast_wpseo_title }</title>
                <link rel="canonical" href={pageData.yoast_meta.yoast_wpseo_canonical} />
            </Helmet>
            <div className={'team__page'}>
                <section className={'main__section container-fluid  team__page__first'}>
                    <div className="page__background">
                        <div className={'fade__top'}></div>
                        <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                    </div>
                    <div className="media__list__background">
                        <img src={BruinLogo} alt={''} />
                    </div>
                    <div className={'container'}>
                        <div className={'row main__row'}>
                            <div className={'col-md-12 col-xl-6'}>
                                {   
                                    pageAcf.main_copy.length > 0
                                    ?<div dangerouslySetInnerHTML={{__html: pageAcf.main_copy}} />
                                    : ""
                                } 
                                {   
                                    pageAcf.first_column_copy.length > 0
                                    ?<div className={'team__extra__copy'} dangerouslySetInnerHTML={{__html: pageAcf.first_column_copy}} />
                                    : ""
                                }   
                            </div>
                            <div className={'col-md-12 col-xl-6 d-flex justify-element-end align-items-end team__extra__second__copy'}>
                                {   
                                    pageAcf.second_column_copy.length > 0
                                    ?<div dangerouslySetInnerHTML={{__html: pageAcf.second_column_copy}} />
                                    : ""
                                } 
                                
                            </div>
                            <div className="col-xl-12 ">
                                <button className="" onClick={this.showContent}>Learn More</button>
                            </div>
                            <div className="col-xl-12 hidden team__extra__content">
                                <div className={'iframe__team d-flex justify-content-center align-items-center'} dangerouslySetInnerHTML={{__html: pageAcf.video_iframe}} />
                                <div className="popup__logos">
                                    {
                                        pageAcf.popup_logos.map((logo, index) => (
                                            <div className="logo__wrapper" key={index}>
                                                <div className="team__logo__image">
                                                <a href={logo.url} target={'_BLANK'} rel="noopener noreferrer">
                                                    <Img fixed={logo.logo.localFile.childImageSharp.fixed} alt={logo.title} />
                                                </a>
                                                </div>
                                                {   
                                                    logo.title.length > 0
                                                    ?<p className={'text-white'} dangerouslySetInnerHTML={{__html: logo.title}} />
                                                    : ""
                                                } 
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div> 
                </section>

                <section className={'team__section container-fluid'}>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-md-12 col-xl-6'}>
                                {   
                                    pageAcf.team_copy.length > 0
                                    ?<div dangerouslySetInnerHTML={{__html: pageAcf.team_copy}} />
                                    : ""
                                } 
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
                                                <Img 
                                                    tabIndex={0}
                                                    fixed={member.photo.localFile.childImageSharp.fixed}
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
                                                                {   
                                                                    member.name.length > 0
                                                                    ?<h4 className="featured__article__name" dangerouslySetInnerHTML={{__html: member.name}} />
                                                                    : ""
                                                                } 
                                                                {   
                                                                    member.position.length > 0
                                                                    ?<p className="featured__article__position" dangerouslySetInnerHTML={{__html: member.position}} />
                                                                    : ""
                                                                }  
                                                            </div>
                                                            {   
                                                                member.bio.length > 0
                                                                ?<div className="featured__article__content" dangerouslySetInnerHTML={{__html: member.bio}} />
                                                                : ""
                                                            }  
                                                            </div>
                                                            <div className="featured__article__cta">
                                                                <ExternalButton  redirectionLink={member.member_link} buttonText={'Read More'} buttonclassName={''}></ExternalButton>
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
                                            {   
                                                member.name.length > 0
                                                ?<h4 dangerouslySetInnerHTML={{__html: member.name}} />
                                                : ""
                                            } 
                                            {   
                                                member.position.length > 0
                                                ?<p dangerouslySetInnerHTML={{__html: member.position}} />
                                                : ""
                                            } 
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
        yoast_meta {
          yoast_wpseo_metadesc
          yoast_wpseo_title
          yoast_wpseo_canonical
        }
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
            first_column_copy
            second_column_copy
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
                            fixed(width: 250, quality: 100) {
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