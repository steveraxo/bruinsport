import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import "./css/index.css"
import "./css/media.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import NewsCarrousel from "../components/media/newsCarrousel"
import Img from "gatsby-image"
import ExternalButton from "../components/master/buttons/externalButton"
import BruinLogo from "../images/media/bruin-letter.png"

class MediaPage extends Component {
  changeList(event) {
    const clickedElement = event.target,
      type = event.target.getAttribute("data-type")

    if (!clickedElement.classList.contains("active")) {
      ;[...document.querySelectorAll(".type__selector")].map(element =>
        element.classList.remove("active")
      )
      clickedElement.classList.add("active")
    }

    ;[...document.querySelectorAll(".news__list")].map(element => {
      if (element.id === type) {
        if (!element.classList.contains("active")) {
          element.classList.add("active")
          element.classList.remove("not__active")
        }
      } else {
        element.classList.add("not__active")
        element.classList.remove("active")
      }

      return true
    })
  }
  render() {
    var featuredArticles = false

    const pageData = this.props.data.allWordpressPage.edges[0].node
    const PressData = this.props.data.allWordpressWpPressreleases.edges
    const NewsData = this.props.data.allWordpressWpNews.edges

    if (pageData.acf.featured_media) {
      featuredArticles = pageData.acf.featured_media
    }

    //Slick Setting
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      autoplay: true,
      autoplaySpeed: 90000,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: "ondemand",
    }
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={pageData.yoast_meta.yoast_wpseo_metadesc}
          />
          <title>{pageData.yoast_meta.yoast_wpseo_title}</title>
          <link
            rel="canonical"
            href={pageData.yoast_meta.yoast_wpseo_canonical}
          />
        </Helmet>
        <div className="media__page">
          {featuredArticles ? (
            <section
              className={`container-fluid hero-bg media__featured ${
                featuredArticles ? "" : "hidden-el"
              }`}
            >
              {pageData.featured_media ? (
                <div className="page__background">
                  <Img
                    fluid={
                      pageData.featured_media.localFile.childImageSharp.fluid
                    }
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}
              <div className="row text-center">
                <div className="page__title">
                  {pageData.acf.page_title.length > 0 ? (
                    <h1>{pageData.acf.page_title}</h1>
                  ) : (
                    ""
                  )}
                </div>
                {featuredArticles.length > 0 ? (
                  <Slider className="featured__wrapper" {...settings}>
                    {featuredArticles.map((element, index) => (
                      <div className="featured__article" key={index}>
                        <div className="featured__article__top">
                          <div className="featured__article__title">
                            {element.post_title.length > 0 ? (
                              <h3>{element.post_title}</h3>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="featured__article__subtitle">
                            {(element.acf !== null) &
                            (element.acf.subtitle.length > 0) ? (
                              <p>{element.acf.subtitle}</p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="featured__article__content">
                            {element.post_content.length > 0 ? (
                              <p
                                className="text-left"
                                dangerouslySetInnerHTML={{
                                  __html: element.post_content,
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="featured__article__divider"></div>
                        <div className="featured__article__bottom">
                          <div className="featured__article__meta">
                            <div className="featured__article__date">
                              {element.post_date.length > 0 ? (
                                <p>{element.post_date}</p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="featured__article__source">
                              {(element.acf !== null) &
                              (element.acf.source_text.length > 0) ? (
                                <p>
                                  <strong> Source </strong>{" "}
                                  {element.acf.source_text}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="featured__article__cta">
                            {element.acf !== null &&
                            element.acf.external_news_link !== null &&
                            element.acf.external_news_link !== "#" ? (
                              <ExternalButton
                                buttonClass={""}
                                buttonText={"Read More"}
                                redirectionLink={element.acf.external_news_link}
                              ></ExternalButton>
                            ) : (
                              <>
                                {element.acf.pdf_press_release ? (
                                  <ExternalButton
                                    buttonClass={""}
                                    buttonText={"Read More"}
                                    redirectionLink={
                                      element.acf.pdf_press_release.url
                                        .source_url
                                    }
                                  ></ExternalButton>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  ""
                )}
              </div>
            </section>
          ) : (
            ""
          )}

          <section className="media__lists">
            <div className="media__list__background">
              <img src={BruinLogo} alt={""} />
            </div>
            <div className="container">
              <div className="row">
                {pageData.acf.news_section_title.length > 0 ? (
                  <h2
                    className="text-black text-left"
                    dangerouslySetInnerHTML={{
                      __html: pageData.acf.news_section_title,
                    }}
                  />
                ) : (
                  ""
                )}
                <div className="article__type__selector">
                  {NewsData ? (
                    <button
                      onClick={this.changeList}
                      data-type={"news"}
                      className="type__news type__selector active "
                    >
                      News
                    </button>
                  ) : (
                    ""
                  )}
                  {PressData ? (
                    <button
                      onClick={this.changeList}
                      data-type={"press"}
                      className="type__press type__selector"
                    >
                      Press Releases
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                {NewsData ? (
                  <NewsCarrousel
                    newsArray={NewsData}
                    state={"active"}
                    elId={"news"}
                  />
                ) : (
                  ""
                )}
                {PressData ? (
                  <NewsCarrousel
                    newsArray={PressData}
                    state={"not__active"}
                    elId={"press"}
                  />
                ) : (
                  ""
                )}
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
  query mediaPageQuery {
    allWordpressPage(filter: { path: { eq: "/media/" } }) {
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
                fluid(maxWidth: 1920, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          acf {
            news_section_title
            page_title
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
    allWordpressWpPressreleases {
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
    allWordpressWpNews {
      edges {
        node {
          title
          date(formatString: "MM.DD.YYYY")
          acf {
            external_link_file
            external_news_link {
              source_url
            }
            media_file {
              localFile {
                url
              }
            }
          }
        }
      }
    }
  }
`
