import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
import "./css/home.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "gatsby-image"
import Popup from "reactjs-popup";
import ExternalButton from "../components/master/buttons/externalButton"
import InternalButton from "../components/master/buttons/internalButton"
import MapBackground  from "../images/home/home-map.png"
import BruinLogo from "../components/master/bruin-letter-logo/bruinLetter"

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { mixBlend: 'mix-blend' };
  }
  focusTrap(){
    setTimeout(function(){ 
    
    document.querySelectorAll('html')[0].classList.add('html__custom')
    // Focus the element on the burguer menu
    document.getElementById("close__menu").focus(); 

    // Trap the focus loop inside the menu
    var element = document.getElementById("popup__inner")
    var focusableEls = document.querySelectorAll('#popup__inner .close, #popup__inner .btn-main a ');

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
    },10);
    

  }
  endModal(e) {
    document.querySelectorAll('html')[0].classList.remove('html__custom')

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
  }
  render() {
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const newsData = this.props.data.allWordpressWpNews.edges

    //Slick Setting
    let settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 9000,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    }
    
    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={ pageData.title }/>
            <title>{ pageData.yoast_title }</title>
            <link rel="canonical" href={globalHistory.location.origin} />
        </Helmet>
        <div className="home__page">
          <section className="container-fluid hero-bg media__featured">
            <div className="page__background">
              <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={""} tabIndex={-1}/>
            </div>
            <div className="container">
              <div tabIndex={0} className="header__copy text-left" dangerouslySetInnerHTML={{__html: pageData.acf.main_copy}} />
            </div>
            <div className="container-fluid">
              <div className="row clients__logos">
                {
                  pageData.acf.header_logos.map( (element, index) => 
                    <div className="col" key={`${element}-${index}`}>
                      <Popup 
                      onOpen={this.focusTrap} 
                      onClose={this.changeBodyScroll} 
                      modal 
                      closeOnEscape 
                      closeOnDocumentClick 
                      trigger={
                        <Img 
                          className={`${this.state.mixBlend}`}
                          tabIndex={0}
                          fluid={element.icon.localFile.childImageSharp.fluid}
                          alt={`Client ${element.title} logo`}
                        />
                      } 
                      position="center center">
                          {close => (
                            <div>
                              <div className="popup__inner featured__wrapper" id={'popup__inner'}>
                                <div className="triangle__big"></div>
                                <div className="triangle__small"></div>
                                <div className="featured__article" key={index}>
                                <img className="popup__inner__background" src={MapBackground} alt="" tabIndex="-1" />
                                  <div className="featured__artitle__inner">
                                    <div className="featured__article__top">
                                      <div className="featured__article__title">
                                        <h4>{element.title}</h4>
                                      </div>
                                      <div className="featured__article__content" dangerouslySetInnerHTML={{__html: element.first_copy}} />
                                    </div>
                                    <div className="featured__article__divider"></div>
                                    <div className="featured__article__content" dangerouslySetInnerHTML={{__html: element.second_copy}} />
                                  </div>
                                  <div className="featured__article__bottom flex-end">
                                      <div className="featured__article__cta">
                                        <ExternalButton  redirectionLink={element.button_link} buttonText={element.button_text} buttonClass={'md-btn'}></ExternalButton>
                                      </div>
                                  </div>
                                </div>
                              </div>
                              <button className="close" tabIndex="0" onClick={close} onKeyPress={close} id="close__menu" ></button>
                            </div>
                          )}
                      </Popup>
                    </div>
                  )
                }
              </div>
            </div>
          </section>
          <section className="our__approach container-fluid">
            <div className="floating__letter">
              <BruinLogo />
            </div>
            <div className="container">
              <div className="row">
                <div className={'col-md-12 col-lg-9'}>
                  <h1 dangerouslySetInnerHTML={{__html: pageData.acf.our_approach_title}} />
                  <div dangerouslySetInnerHTML={{__html: pageData.acf.our_approach_content}} />
                  <InternalButton buttonText={pageData.acf.our_approach_button_text} redirectionLink={pageData.acf.our_approach_button_link}></InternalButton>
                </div>
              </div>
            </div>
          </section>
          <section className="our__approach featured__section container-fluid">
            <Img className={'img__background'} fluid={pageData.acf.featured_background.localFile.childImageSharp.fluid} alt="" tabIndex={-1} />
            <div className="container">
              <div className="row">
                <div className={'col-md-12 col-lg-4 col-xl-6'}></div>
                <div className={'col-md-12 col-lg-8 col-xl-6 text-left'}>
                  
                  <h2 className={'mainText --white'} dangerouslySetInnerHTML={{__html: pageData.acf.featured_title}} />
                  <div dangerouslySetInnerHTML={{__html: pageData.acf.featured_content}} />
                  <InternalButton buttonText={pageData.acf.featured_button_text} redirectionLink={pageData.acf.featured_button_link}></InternalButton>
                </div>
              </div>
            </div>
          </section>
          <section className="container-fluid latest__news">
            <div className="container">
              <h2 className={'mainText '} dangerouslySetInnerHTML={{__html: pageData.acf.latest_news_title}} />
            </div>  
            <div className="latest__news__wrapper">
            <Slider className="row featured__wrapper dark latest__news__wrapper" {...settings}>
              {
                newsData.map((element, index) => 
                  <div className="latest__article" key={`${element}-${index}`}>
                    <div className={'title'} dangerouslySetInnerHTML={{__html: element.node.content}} />
                    <div className={'content'} dangerouslySetInnerHTML={{__html: element.node.content}} />
                    <ExternalButton buttonClass={'small-btn'} buttonText={'Read More'} redirectionLink={element.node.acf.external_news_link} ></ExternalButton>
                  </div>
                )
              }
            </Slider>
            </div> 
          </section>
          <section className="container-fluid get__started">
            <Img className={'img__background'} fluid={pageData.acf.get_started_background.localFile.childImageSharp.fluid} alt="" tabIndex={-1} />
            <div className="container get__started__content">
              <div className="row d-flex justify-content-center align-items-center flex-column">
                <h2 style={{lineHeight: '100px'}} dangerouslySetInnerHTML={{__html: pageData.acf.get_started_title}} />
                <p>{pageData.acf.get_started_copy}</p>
                <InternalButton redirectionLink={pageData.acf.get_started_button_link} buttonText={pageData.acf.get_started_button_text} buttonClass={'dark-btn md-btn'}>

                </InternalButton>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}
export default HomePage

export const pageQuery = graphql`
query HomeQuery {
  allWordpressPage(filter: {path: {eq: "/"}}) {
    edges {
      node {
        id
        title
        content
        date(formatString: "MMMM DD, YYYY")
        yoast_title
        featured_media {
          localFile {
            childImageSharp {
              fluid(maxWidth: 4000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        acf {
          featured_button_link
          featured_button_text
          featured_content
          featured_title
          get_started_button_link
          get_started_button_text
          get_started_copy
          get_started_title
          latest_news_title
          main_copy
          our_approach_button_link
          our_approach_button_text
          our_approach_content
          our_approach_title
          header_logos {
            button_link
            button_text
            first_copy
            second_copy
            title
            icon {
              source_url
              localFile {
                childImageSharp{
                  fluid(maxWidth: 200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          get_started_background {
            source_url
            localFile {
              childImageSharp{
                fluid(maxWidth: 4000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featured_background {
            source_url
            localFile {
              childImageSharp{
                fluid(maxWidth: 4000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
  allWordpressWpNews(limit: 18) {
    edges {
      node {
        acf {
          external_news_link
          source_text
          subtitle
        }
        title
        content
      }
    }
  }
}
`