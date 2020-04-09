import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import "./css/index.css"
import "./css/about.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "gatsby-image"

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  handleAccordion(event){


      if(event.target.classList.contains('--open')){
        event.target.classList.remove('--open');
      }else{
        [...document.querySelectorAll('.values__information')].map(element => {
          if(element.classList.contains('--open')){
                element.classList.remove('--open');
          }
        })
        event.target.classList.add('--open');
      }

  }
  render() {
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const pageAcf = this.props.data.allWordpressPage.edges[0].node.acf

    //Slick Setting
    let settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [
            {
                breakpoint: 825,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
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
        <div className="about">
            <section className="about__header">
                {
                    pageData.featured_media
                    ?<div className="page__background">
                        <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                    </div>
                    : ""
                }
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 about__header__top">
                            <div className="about__header__top__title">
                                {   
                                    pageAcf.title.length > 0
                                    ?<>
                                        <h1 className={'text-white'}>{pageAcf.title}</h1>
                                        <div className="featured__article__divider "></div>
                                    </>
                                    : ""
                                } 
                            </div>
                            
                            <div className="about__header__top__subtitle">
                                {   
                                    pageAcf.subtitle.length > 0
                                    ?<h3 className="text-white">{pageAcf.subtitle}</h3>
                                    : ""
                                } 
                            </div>
                        </div>
                        <div className="col-md-12 col-xl-6 about__header__column__one">
                            {   
                                pageAcf.first_column_text.length > 0
                                ?<div className={'text-white'} dangerouslySetInnerHTML={{__html: pageAcf.first_column_text}} />
                                : ""
                            } 
                        </div>
                        <div className="col-md-12 col-xl-6 about__header__column__two">
                            {   
                                pageAcf.second_column_text.length > 0
                                ?<div className={'text-white'} dangerouslySetInnerHTML={{__html: pageAcf.second_column_text}} />
                                : ""
                            } 
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="mis__vals__soc">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 mission">
                            {   
                                pageAcf.mission_title.length > 0
                                ?<h2 className=" ">{pageAcf.mission_title}</h2>
                                : ""
                            }
                            {   
                                pageAcf.mission_copy.length > 0
                                ?<div dangerouslySetInnerHTML={{__html: pageAcf.mission_copy}} />
                                : ""
                            }
                        </div>
                        {
                            pageAcf.values_blocks
                            ?<div className="col-md-12 col-xl-6 values">
                                {   
                                    pageAcf.values_title.length > 0
                                    ?<h2 className=" ">{pageAcf.values_title}</h2>
                                    : ""
                                }
                                
                                <div className="values__wrapper">
                                    {
                                        pageAcf.values_blocks.map((value, index) => (
                                            <div className={`values__information ${index === 0 ? "--open" : " "} `} key={`${value.title}-${index}`} onClick={this.handleAccordion}>
                                                <div className="values__information__inner">
                                                    {   
                                                        value.title.length > 0
                                                        ?<p>{value.title}</p>
                                                        : ""
                                                    }
                                                    <div className="values__description">
                                                        {   
                                                            value.description.length > 0
                                                            ?<div dangerouslySetInnerHTML={{__html: value.description}} />
                                                            : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            : ""
                        }

                        <div className="col-md-12 col-xl-6 social">
                            {   
                                pageAcf.social_title.length > 0
                                ?<h2 >{pageAcf.social_title}</h2>
                                : ""
                            }
                            {   
                                pageAcf.social_copy.length > 0
                                ?<div dangerouslySetInnerHTML={{__html: pageAcf.social_copy}} />
                                : ""
                            }
                            <div className="social__logo">
                                <div className="row">
                                    <div className="col-lg-5 social__logo__left">
                                        <div className="gray__line"></div>
                                    </div>
                                    <div className="col-lg-7 social__logo__right">
                                        {
                                            pageAcf.social_logo
                                            ?<Img fluid={pageAcf.social_logo.localFile.childImageSharp.fluid} alt={'Save the childran logo'}/> 
                                            : ""
                                        }
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            {
                pageAcf.history_timeline
                ?<section className="history">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                {   
                                    pageAcf.history_title.length > 0
                                    ?<h2 className="text-center">{pageAcf.history_title}</h2>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    {
                        pageAcf.history_background
                        ?<div className="page__background">
                            <Img fluid={pageAcf.history_background.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                        </div>
                        :""
                    }
                    <div className="container history__timeline">
                        <Slider className="row featured__wrapper" {...settings}>
                            {
                                pageAcf.history_timeline.map((element, index) => (
                                    <div className="history__timeline__moment col-xs-12 col-sm-12 col-md-12 col-xl-12" key={`${element.date}-${index}`}>
                                        <div className="history__timeline__moment__date">
                                            {   
                                                element.date.length > 0
                                                ?<p>{element.date}</p>
                                                : ""
                                            }
                                            
                                        </div>
                                        <div className="history__timeline__moment__description">
                                            {   
                                                element.description.length > 0
                                                ?<a href={element.link} target={'_BLANK'} rel="noopener noreferrer" >
                                                    <div className={'text-white'} dangerouslySetInnerHTML={{__html: element.description}} />
                                                </a>
                                                : ""
                                            }
                                            
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </section>  
                : ""          
            }
        </div>
      </Layout>
    )
  }
}
export default AboutPage

export const pageQuery = graphql`
query AboutQuery {
    allWordpressPage(filter: {path: {eq: "/about/"}}) {
      edges {
        node {
          id
          title
          content
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 4000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          yoast_meta {
            yoast_wpseo_metadesc
            yoast_wpseo_title
            yoast_wpseo_canonical
          }
          acf {
            title
            subtitle
            first_column_text
            second_column_text
            mission_title
            mission_copy
            values_title
            values_blocks {
              description
              title
            }
            social_title
            social_copy
            social_logo {
                localFile {
                    childImageSharp {
                        fluid(maxWidth: 300, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
            history_title
            history_timeline {
              date
              description
              link
            }
            history_background {
                localFile {
                    childImageSharp {
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
  }
`