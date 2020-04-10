import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import "./css/index.css"
import "./css/home.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "gatsby-image"
import Popup from "reactjs-popup";
import ExternalButton from "../components/master/buttons/externalButton"
import InternalButton from "../components/master/buttons/internalButton"
import BruinLogo from "../components/master/bruin-letter-logo/bruinLetter"

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mixBlend: 'mix-blend',
    };
  }
  focusTrap(){
    setTimeout(function(){ 

    document.getElementById("section-2").scrollIntoView();

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
    
    document.querySelectorAll('.clients__logos')[0].classList.remove('rotate__clients__logos');

    [...document.querySelectorAll('.clients__logos .col')].map(el => (
      el.classList.remove('rotated__col')
    ))

    },10);
  }
  endModal(e) {
    document.querySelectorAll('html')[0].classList.remove('html__custom')
    document.getElementById('clients__logos').classList.remove('show__element');
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
    document.getElementById('clients__logos').classList.remove('show__element');
    document.querySelectorAll('.clients__logos')[0].classList.add('rotate__clients__logos');

    [...document.querySelectorAll('.clients__logos .col')].map(el => (
      el.classList.add('rotated__col')
    ))
  }
  triggerClientPopUp(event){
    const idPopup = event.target.getAttribute('datatracknumber');

    document.getElementById(idPopup).click();
    
    if (window.innerWidth < 768) {
      document.getElementById('clients__logos').classList.add('show__element');
    }
    
  }
  componentDidMount(){
    setTimeout(function(){ 
      var linkMont = document.createElement('link');
      linkMont.id = 'montserrat__font';
      linkMont.rel = 'stylesheet';
      linkMont.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap';
      document.head.appendChild(linkMont);
  
      var linkMul = document.createElement('link');
      linkMul.id = 'muli__font';
      linkMul.rel = 'stylesheet';
      linkMul.href = 'https://fonts.googleapis.com/css2?family=Muli:wght@300;400;500;600;700;800;900&display=swap';
      document.head.appendChild(linkMul);
    }, 100);
  }
  render() {
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node,
          newsData = this.props.data.allWordpressWpNews.edges;
    console.log(newsData);
          //Slick Setting
    let settings = {
      speed: 500,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 9000,
      arrows: true,
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1180,
          settings: {
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
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

    let settingsClients = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 9000,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
      ]
    }
    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={ pageData.yoast_meta.yoast_wpseo_metadesc }/>
            <title>{ pageData.yoast_meta.yoast_wpseo_title }</title>
            <link rel="canonical" href={ pageData.yoast_meta.yoast_wpseo_canonical} />
        </Helmet>
        <div className="home__page">
          <section className="container-fluid hero-bg media__featured">
            { /*
            <a href="#section-2" tabIndex={0} className="down__arrow"><div  tabIndex={-1} aria-hidden="true"></div><span className={'opacity-0'} tabIndex={-1}>Scroll down link</span></a> */}
            {
              pageData.featured_media
              ?<div className="page__background" aria-hidden="true">
                <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={""} tabIndex={-1}/>
              </div>
              :" "
            }
            <div className="container-fluid">
              {   
                  pageData.acf.main_copy.length > 0
                  ?<div tabIndex={0} className="header__copy text-left" dangerouslySetInnerHTML={{__html: pageData.acf.main_copy}} />
                  : ""
              }
              <div className="featured__article__divider home__divider"></div>
              {   
                  pageData.acf.main_second_copy.length > 0
                  ?<div tabIndex={0} className="home__copy text-left" dangerouslySetInnerHTML={{__html: pageData.acf.main_second_copy}} />
                  : ""
              }
            </div>
            {
              pageData.acf.header_logos
              ?<div className="container-fluid">
                  <div className="clients__logos__wrapper" >
                    <div className="clients__slider">
                    <Slider  {...settingsClients}>
                      {
                        pageData.acf.header_logos.map( (element, index) => 
                          <img 
                            datatracknumber={`logo-client-${index}`}
                            id={`logo-client-${index}-s`}
                            tabIndex={0}
                            src={element.icon.localFile.url}
                            alt={`Client ${element.title} logo`}
                            onClick={this.triggerClientPopUp}
                            onKeyPress={this.triggerClientPopUp}
                            loading="lazy"
                            key={`${index}-logo`}
                          />
                        )
                      }
                    </Slider>
                    </div>

                    <div className="row clients__logos rotate__clients__logos" id={'clients__logos'}>
                    {
                      pageData.acf.header_logos.map( (element, index) => 
                        <div className="col rotated__col" key={`header_logos-${element}-${index}`}>
                          <Popup 
                          onOpen={this.focusTrap} 
                          onClose={this.changeBodyScroll} 
                          modal 
                          closeOnEscape 
                          closeOnDocumentClick 
                          trigger={
                            <img 
                              id={`logo-client-${index}`}
                              tabIndex={0}
                              src={element.icon.localFile.url}
                              alt={`Client ${element.title} logo`}
                              onKeyPress={this.triggerClientPopUp}
                              datatracknumber={`logo-client-${index}`}
                              loading="lazy"
                            />
                          } 
                          position="center center">
                              {close => (
                                <div>
                                  <div className="popup__inner featured__wrapper" id={'popup__inner'}>
                                    <div className="triangle__big"></div>
                                    <div className="triangle__small"></div>
                                    <div className="featured__article" key={index}>
                                    <Img className={'popup__inner__background'} fluid={element.map.localFile.childImageSharp.fluid} alt="" tabIndex={-1} />
                                      <div className="featured__artitle__inner">
                                        <div className="featured__article__top">
                                          <div className="featured__article__title">
                                          {   
                                              element.title.length > 0
                                              ?<h4>{element.title}</h4>
                                              : ""
                                          }
                                          </div>
                                          {   
                                              element.first_copy.length > 0
                                              ?<div className="featured__article__content home__pop__content" dangerouslySetInnerHTML={{__html: element.first_copy}} />
                                              : ""
                                          }
                                        </div>
                                        <div className="featured__article__divider"></div>
                                        {   
                                            element.second_copy.length > 0
                                            ?<div className="featured__article__content" dangerouslySetInnerHTML={{__html: element.second_copy}} />
                                            : ""
                                        }
                                        
                                      </div>
                                      <div className="featured__article__bottom flex-end">
                                          <div className="featured__article__cta">
                                            <ExternalButton  redirectionLink={element.button_link} buttonText={element.button_text} buttonClass={''}></ExternalButton>
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
              </div>
              : ""
            }
          </section>
          <section className="our__approach container-fluid" id="section-2">
            <div className="floating__letter">
              <BruinLogo />
            </div>
            <div className="container">
              <div className="row">
                <div className={'col-md-12 col-lg-9'}>
                  {   
                      pageData.acf.our_approach_title.length > 0
                      ?<h2 className={'text-black'} dangerouslySetInnerHTML={{__html: pageData.acf.our_approach_title}} />
                      : ""
                  }
                  {   
                      pageData.acf.our_approach_content.length > 0
                      ?<div dangerouslySetInnerHTML={{__html: pageData.acf.our_approach_content}} />
                      : ""
                  }
                  {
                    pageData.acf.our_approach_button_link
                    ?<InternalButton buttonText={pageData.acf.our_approach_button_text} redirectionLink={pageData.acf.our_approach_button_link}></InternalButton>
                    :""
                  }
                  
                </div>
              </div>
            </div>
          </section>
          <section className="our__approach featured__section container-fluid">
            {
              pageData.acf.featured_background
              ?<Img className={'img__background'} fluid={pageData.acf.featured_background.localFile.childImageSharp.fluid} alt="" tabIndex={-1} />
              : ""
            }
            <div className="container">
              <div className="row">
                <div className={'col-md-12 col-lg-4 col-xl-6 text-left'}>
                  {   
                      pageData.acf.featured_title.length > 0
                      ?<h2 className={'text-white'} dangerouslySetInnerHTML={{__html: pageData.acf.featured_title}} />
                      : ""
                  }
                  {   
                      pageData.acf.featured_content.length > 0
                      ?<div dangerouslySetInnerHTML={{__html: pageData.acf.featured_content}} />
                      : ""
                  }
                  {
                    pageData.acf.featured_button_link
                    ?<ExternalButton buttonText={pageData.acf.featured_button_text} redirectionLink={pageData.acf.featured_button_link.source_url}></ExternalButton>
                    :""
                  }
                </div>
                <div className={'col-md-12 col-lg-8 col-xl-6 '}>
                </div>
              </div>
            </div>
          </section>
          {
            newsData
            ?<section className="container-fluid latest__news">
              <div className="container">
                {   
                    pageData.acf.latest_news_title.length > 0
                    ?<h2 className={'text-center text-black '} dangerouslySetInnerHTML={{__html: pageData.acf.latest_news_title}} />
                    : ""
                }
              </div>  
              <div className="latest__news__wrapper">
              <Slider className="row featured__wrapper dark latest__news__wrapper" {...settings}>
                {
                  newsData.map((element, index) => 
                  (
                    element.node.acf 
                    ?<div className={`latest__article`} key={`newsData-${element}-${index}`}>

                    {   
                        element.node.categories !== null
                        ?<div className={'title'}  >
                            <p dangerouslySetInnerHTML={{__html: element.node.categories[0].name}} />
                          </div>
                        : <div className={'title'}>
                            <p>Uncategorized</p>
                          </div>
                    }
                    <div className={'date__title'}  >
                      <p dangerouslySetInnerHTML={{__html: element.node.date}} />
                    </div>

                    {   
                        element.node.title.length > 0
                        ?<p className={'content'} dangerouslySetInnerHTML={{__html: element.node.title }} />
                        : ""
                    }

                    {
                      element.node.acf !== null
                      ? <>
                          {
                            element.node.acf.media_file
                            ? <ExternalButton buttonClass={''} buttonText={'Read More'} redirectionLink={element.node.acf.media_file.localFile.url} ></ExternalButton>
                            : <>
                              {
                                element.node.acf.external_news_link !== null 
                                ? <ExternalButton buttonClass={''} buttonText={'Read More'} redirectionLink={element.node.acf.external_news_link} ></ExternalButton>
                                : <>
                                  {
                                    element.node.acf.external_link_file.length > 0
                                    ?<ExternalButton buttonClass={''} buttonText={'Read More'} redirectionLink={element.node.acf.external_link_file} ></ExternalButton>
                                    :""
                                  }
                                  </>
                              }
                              </>
                          }
                        </>
                      : ""
                    }                    
                  </div>
                    : ""
                  )

                  )
                }
              </Slider>
              </div> 
            </section>
            :""
          }
          <section className="container-fluid get__started">
            {
              pageData.acf.get_started_background
              ? <Img className={'img__background'} fluid={pageData.acf.get_started_background.localFile.childImageSharp.fluid} alt="" tabIndex={-1} />
              : ""
            }
            <div className="container get__started__content">
              <div className="row d-flex justify-content-center align-items-center flex-column">
                {   
                    pageData.acf.get_started_title.length > 0
                    ?<h2 style={{lineHeight: '100px'}} dangerouslySetInnerHTML={{__html: pageData.acf.get_started_title}} />
                    : ""
                }
                {   
                    pageData.acf.get_started_copy.length > 0
                    ?<p>{pageData.acf.get_started_copy}</p>
                    : ""
                }
                {
                  pageData.acf.get_started_button_link
                  ?<InternalButton redirectionLink={pageData.acf.get_started_button_link} buttonText={pageData.acf.get_started_button_text} buttonClass={'dark-btn'}></InternalButton>
                  : ""
                }
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
        yoast_meta {
          yoast_wpseo_metadesc
          yoast_wpseo_title
          yoast_wpseo_canonical
        }
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
          featured_button_link {
            source_url
          }
          featured_button_text
          featured_content
          featured_title
          get_started_button_link
          get_started_button_text
          get_started_copy
          get_started_title
          latest_news_title
          main_copy
          main_second_copy
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
            map{
              localFile {
                childImageSharp{
                  fluid(maxWidth: 2000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            icon {
              source_url
              localFile {
                  url
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
  allWordpressWpNews(limit: 12) {
    edges {
      node {
        acf {
          external_link_file
          external_news_link
          media_file {
            localFile {
              url
            }
          }
        }
        title
        content
        categories {
          name
        }
        date(formatString: "MM.DD.YYYY")
      }
    }
  }
}
`