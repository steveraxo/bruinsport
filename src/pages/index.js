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

class HomePage extends Component {
  render() {
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    console.log(pageData.acf);
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
                  pageData.acf.header_logos.map( element => 
                    <div className="col">
                      <img tabIndex={0}
                        data-button-link={element.button_link} 
                        data-button-text={element.button_text} 
                        data-fcopy={element.first_copy} 
                        data-scopy={element.second_copy} 
                        data-title={element.title}

                        src={element.icon.source_url}
                        alt={`${element.title} logo`}

                        onClick={this.openPopup}
                      />
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
}
`