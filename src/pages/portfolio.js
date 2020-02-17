import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
import "./css/portfolio.css"
import BruinLogo from "../images/media/bruin-letter.png"
import ExternalButton from "../components/master/buttons/externalButton";
import Img from "gatsby-image"


class MediaPage extends Component {
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
            <div className={'portfolio__page'}>
                <section className="our__approach container-fluid d-flex justify-content-center align-items-center">
                    <div className="floating__letter">
                        <img src={BruinLogo} alt=" "/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className={'col-md-12 col-lg-12'}>
                                <h1 dangerouslySetInnerHTML={{__html: pageAcf.main_title}} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={'projects__section container-fluid'}>
                    <div className={'row'}>
                        <div className={`our__approach featured__section container-fluid d-flex justify-content-center align-items-end ${pageAcf.project[0].project_layout} col-xl-12`} key={`1`}>
                            <div className="page__background">
                                <Img fluid={pageAcf.project[0].project_background.localFile.childImageSharp.fluid} alt={' '} tabIndex={-1}/>
                            </div>
                            <div className="container">
                            <div className="row">
                                <div className={'col-md-12 col-lg-10 col-xl-10 text-left'}>
                                <Img fixed={pageAcf.project[0].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                <div dangerouslySetInnerHTML={{__html: pageAcf.project[0].project_description}} />
                                <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[0].project_link}></ExternalButton>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div class={'col-md-12 col-lg-6 portfolio_half left__portfolio'} key={`1`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={pageAcf.project[1].project_background.localFile.childImageSharp.fluid} alt={' '} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <Img fixed={pageAcf.project[1].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: pageAcf.project[1].project_description}} />
                                </div>
                                <div className={'portfolio__button'}>
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[1].project_link}></ExternalButton>
                                </div>
                            </div>
                        </div>
                        <div class={'col-md-12 col-lg-6 portfolio_half right__portfolio'} key={`2`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={pageAcf.project[2].project_background.localFile.childImageSharp.fluid} alt={' '} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <Img fixed={pageAcf.project[2].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: pageAcf.project[2].project_description}} />
                                </div>
                                <div className={'portfolio__button'}>
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[2].project_link}></ExternalButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div class={'col-md-12 col-lg-12 portfolio_full '} key={`3`}>
                            <div className="page__background">
                                <Img fluid={pageAcf.project[3].project_background.localFile.childImageSharp.fluid} alt={' '} tabIndex={-1}/>
                            </div>
                            <div class={'col-md-12 col-lg-6 first'}>

                            </div>
                            <div class={'col-md-12 col-lg-6 second'}>

                                <div className={'portfolio__inner'}>
                                    <div className={'portfolio__logo'}>
                                        <Img fixed={pageAcf.project[3].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                    </div>
                                    <div className={'porftolio__description'}>
                                        <div dangerouslySetInnerHTML={{__html: pageAcf.project[3].project_description}} />
                                    </div>
                                    <div className={'portfolio__button'}>
                                        <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[3].project_link}></ExternalButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div class={'col-md-12 col-lg-6 portfolio_half left__portfolio'} key={`4`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={pageAcf.project[4].project_background.localFile.childImageSharp.fluid} alt={' '} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <Img fixed={pageAcf.project[4].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: pageAcf.project[4].project_description}} />
                                </div>
                                <div className={'portfolio__button'}>
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[4].project_link}></ExternalButton>
                                </div>
                            </div>
                        </div>
                        <div class={'col-md-12 col-lg-6 portfolio_half right__portfolio'} key={`5`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={pageAcf.project[5].project_background.localFile.childImageSharp.fluid} alt={' '} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <Img fixed={pageAcf.project[5].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: pageAcf.project[5].project_description}} />
                                </div>
                                <div className={'portfolio__button'}>
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[5].project_link}></ExternalButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div class={'col-md-12 col-lg-12 portfolio_full dark '} key={`6`}>
                            <div className="page__background">
                                <Img fluid={pageAcf.project[6].project_background.localFile.childImageSharp.fluid} alt={' '} tabIndex={-1}/>
                            </div>
                            <div class={'col-md-12 col-lg-6 first'}>

                                <div className={'portfolio__inner'}>
                                    <div className={'portfolio__logo'}>
                                        <Img fixed={pageAcf.project[6].project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                    </div>
                                    <div className={'porftolio__description'}>
                                        <div dangerouslySetInnerHTML={{__html: pageAcf.project[6].project_description}} />
                                    </div>
                                    <div className={'portfolio__button'}>
                                        <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={pageAcf.project[6].project_link}></ExternalButton>
                                    </div>
                                </div>
                            </div>
                            <div class={'col-md-12 col-lg-6 second'}></div>
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
query portfolioPageQuery {
  allWordpressPage(filter: {path: {eq: "/portfolio/"}}) {
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
          main_title
          project{
            project_background{
              localFile {
                childImageSharp {
                    fluid(maxWidth: 4000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                    }
                }
              }
            }
            project_logo{
                localFile {
                    childImageSharp {
                        fixed(width: 220, quality: 100) {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
            project_description
            project_link
            project_layout
          }
          featured_media {
            post_date(formatString: "MMM DD  YYYY")
            post_title
            post_content
            acf {
              source_text
              pdf_press_release {
                url {
                  source_url
                }
              }
              subtitle
              external_news_link
            }
          }
        }
      }
    }
  }
}
`