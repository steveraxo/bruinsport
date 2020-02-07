import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCarrousel from "../components/media/newsCarrousel"
class MediaPage extends Component {
    
  render() {
    
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const PressData = this.props.data.allWordpressWpPressreleases.edges
    const NewsData = this.props.data.allWordpressWpNews.edges

    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={ pageData.title }/>
                <title>{ pageData.title }</title>
                <link rel="canonical" href={globalHistory.location.origin} />
            </Helmet>
            <div className="media__page">
                <section className="container-fluid hero-bg">
                    <div className="row text-center">
                    </div>
                </section>
                <NewsCarrousel newsArray={NewsData} elId={'news'} />
                <NewsCarrousel newsArray={PressData} elId={'press'} />
            </div>
        </Layout>
    )
  }
}
export default MediaPage

export const pageQuery = graphql`
query mediaPageQuery {
  allWordpressPage(filter: {path: {eq: "/media/"}}) {
    edges {
      node {
        id
        title
        content
        date(formatString: "MMMM DD, YYYY")
        featured_media {
          id
          localFile {
            childImageSharp {
              fixed {
                base64
                tracedSVG
                aspectRatio
                srcWebp
                srcSetWebp
                originalName
              }
            }
          }
        }
        acf {
          news_section_title
          page_title
          featured_media {
            post_date(formatString: "MMM/ DD / YYYY")
            post_title
            post_content
            acf {
              source_text
              pdf_press_release
              subtitle
            }
          }
        }
      }
    }
  }
  allWordpressWpPressreleases(limit: 18) {
    edges {
      node {
        title
        date(formatString: "MMM/DD/YYYY")
        acf {
          external_news_link
          pdf_press_release {
            source_url
          }
          subtitle
          source_text
        }
      }
    }
  }
  allWordpressWpNews(limit: 18) {
    edges {
      node {
        title
        date(formatString: "MMM/DD/YYYY")
        acf {
          external_news_link
          subtitle
          source_text
        }
      }
    }
  }
}
`