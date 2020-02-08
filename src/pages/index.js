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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { mixBlend: 'mix-blend' };
  }
  endModal() {
    [...document.querySelectorAll('.popup-overlay')][0].remove()
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
          breakpoint: 768,
          settings: {
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    }
    
    console.log(newsData);
    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={ pageData.title }/>
            <title>{ pageData.title }</title>
            <link rel="canonical" href={globalHistory.location.origin} />
        </Helmet>
        <div className="home__page">
          <section className="container-fluid hero-bg media__featured">
            <div className="page__background">
              <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} />
            </div>
            <div className="container">
              <div tabIndex={0} className="header__copy text-left" dangerouslySetInnerHTML={{__html: pageData.acf.main_copy}} />
            </div>
            <div className="container-fluid">
              <div className="row clients__logos">
                {
                  pageData.acf.header_logos.map( (element, index) => 
                    <div className="col" key={index}>
                      <Popup     
                        modal
                        closeOnEscape
                        closeOnDocumentClick
                        on="focus"
                        trigger={
                        <img 
                        className={this.state.mixBlend}
                        tabIndex={0}
                        src={element.icon.source_url}
                        alt={`${element.title} logo`}
                      />
                      }>
                      <div className="popup__inner featured__wrapper">
                        <div className="triangle__big"></div>
                        <div className="triangle__small"></div>
                        <a className="close" onClick={this.endModal}>
                          
                        </a>
                        <div className="featured__article" key={index}>
                        <img className="popup__inner__background" src={MapBackground} tabIndex="-1" />
                          <div className="featured__artitle__inner">
                            <div className="featured__article__top">
                              <div className="featured__article__title">
                                <h3>{element.title}</h3>
                              </div>
                              <div className="featured__article__content" dangerouslySetInnerHTML={{__html: element.first_copy}} />
                            </div>
                            <div className="featured__article__divider"></div>
                            <div className="featured__article__content" dangerouslySetInnerHTML={{__html: element.second_copy}} />
                          </div>
                          <div className="featured__article__bottom flex-end">
                              <div className="featured__article__cta">
                                <ExternalButton redirectionLink={element.button_link} buttonText={element.button_text}></ExternalButton>
                              </div>
                          </div>
                        </div>
                      </div>
                      </Popup>

                    </div>
                  )
                }
              </div>
            </div>
          </section>
          <section className="container-fluid latest__news">
            <div className="container">
              <h1 className="pl-4">{pageData.acf.latest_news_title}</h1>
            </div>  
            <div className="latest__news__wrapper">
            <Slider className="row featured__wrapper dark latest__news__wrapper" {...settings}>
              {
                newsData.map((element, index) => 
                  <div className="latest__article" key={index}>
                    <h5>{element.node.title}</h5>
                    <div dangerouslySetInnerHTML={{__html: element.node.title}} />
                    <ExternalButton buttonClass={'small-btn'} buttonText={'Read More'} redirectionLink={element.node.acf.external_news_link} ></ExternalButton>
                  </div>
                )
              }
            </Slider>
            </div> 
          </section>
          <section className="container-fluid get__started">
            <img className={'img__background'} src={pageData.acf.get_started_background.source_url} alt="Decorative background" tabIndex={-1} />
            <div className="container get__started__content">
              <div className="row d-flex justify-content-center align-items-center flex-column">
                <h1 style={{lineHeight: '100px'}}>{pageData.acf.get_started_title}</h1>
                <p>{pageData.acf.get_started_copy}</p>
                <InternalButton redirectionLink={pageData.acf.get_started_button_link} buttonText={pageData.acf.get_started_button_text} buttonClass={'dark-btn'}>

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
        featured_media {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid
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
            }
          }
          get_started_background {
            source_url
          }
          featured_background {
            source_url
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