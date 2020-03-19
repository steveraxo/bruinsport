import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import "./css/index.css"
import "./css/portfolio.css"
import BruinLogo from "../images/media/gray-b.png"
import Project from "../components/portfolio/project"


class MediaPage extends Component {

  componentDidMount(){
    let projectUrl = window.location.href.split('#')[1];

    if(projectUrl){
      document.getElementById(projectUrl).scrollIntoView();
    }

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
            <div className={'portfolio__page'}>
                <section className="our__approach container-fluid d-flex justify-content-center align-items-center">
                    <div className="floating__letter">
                        <img src={BruinLogo} alt=""/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className={'col-md-12 col-lg-12 top__info'}>
                                {   
                                    pageAcf.main_title.length > 0
                                    ?<h1 dangerouslySetInnerHTML={{__html: pageAcf.main_title}} />
                                    : ""
                                }    
                                <div className="featured__article__divider "></div>
                                {   
                                    pageAcf.main_second_title.length > 0
                                    ?<div dangerouslySetInnerHTML={{__html: pageAcf.main_second_title}} />
                                    : ""
                                }  
                            </div>
                        </div>
                    </div>
                </section>

                <section className={'projects__section container-fluid'}>
                  <div className={'row'}>
                    {
                        pageAcf.project.map((element, index) => (
                          
                            <Project projectData={element} key={index}  dataid={`project-${index}`}/>
                          
                            
                        ))
                    }
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

          main_second_title
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
            project_logo {
              localFile {
                url
              }
            }
            popup_content
            opens_popup
            popup_background {
              localFile {
                childImageSharp {
                    fluid(maxWidth: 4000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                    }
                }
              }
            }
            project_description
            project_link
            button_text
            project_layout
            theme
          }
          featured_media {
            post_date(formatString: "MMM DD  YYYY")
            post_title
            post_content
            acf {
              source_text
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