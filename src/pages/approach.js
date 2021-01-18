import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import "./css/index.css"
import "./css/approach.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Img from "gatsby-image"

class ApproachPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevPage: 0,
      nextPage: 0,
    }
  }
  handleSliderKeyboard(e) {
    e.preventDefault()
    if (e.type === "keypress") {
      if (
        e.which === 32 ||
        e.which === 13 ||
        e.which === 37 ||
        e.which === 39
      ) {
        this.handleSlider(e)
      }
    }
  }
  handleSlider(event) {
    // get the next page
    let toPage = event.target.getAttribute("topage")
    // get total page count
    let totalPages = event.target.getAttribute("totalpage")
    // remove the active from the item and the menu item
    document.querySelectorAll(".--s-active")[0].classList.remove("--s-active")
    document.querySelectorAll(".--active")[0].classList.remove("--active")
    // add the active class to the selected element and menu item
    document.getElementById(`${toPage}`).classList.add("--s-active")
    document.querySelectorAll(`.${toPage}`)[0].classList.add("--active")
    // create variables for next and prev pages
    let theNextPage =
        parseInt(toPage.substr(toPage.indexOf("-")).replace("-", "")) + 1,
      thePrevPage =
        parseInt(toPage.substr(toPage.indexOf("-")).replace("-", "")) - 1
    totalPages = parseInt(
      totalPages.substr(totalPages.indexOf("-")).replace("-", "")
    )

    // we trap the slider in a loop
    if (theNextPage > 5) {
      theNextPage = 1
    }
    if (thePrevPage < 1) {
      thePrevPage = totalPages
    }

    // we update the state
    this.setState({
      prevPage: `${thePrevPage}`,
      nextPage: `${theNextPage}`,
    })
  }
  componentDidMount() {
    let pageAcf = this.props.data.allWordpressPage.edges[0].node.acf

    this.setState({
      prevPage: pageAcf.first_slider_sections.length,
      nextPage: 2,
    })
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
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: "ondemand",
      fade: true,
      cssEase: "linear",
    }

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={pageData.yoast_meta.yoast_wpseo_metadesc}
          />
          <title>Our Approach | Bruin Capital</title>
          <link
            rel="canonical"
            href={pageData.yoast_meta.yoast_wpseo_canonical}
          />
        </Helmet>
        <div className="approach">
          <section className="about__header approach__header">
            {pageData.featured_media ? (
              <div className="page__background">
                <Img
                  fluid={
                    pageData.featured_media.localFile.childImageSharp.fluid
                  }
                  alt={""}
                  tabIndex={-1}
                />
              </div>
            ) : (
              ""
            )}
            <div className="container">
              <div className="row">
                <div className="col-xl-12 about__header__top">
                  <div className="">
                    {pageData.title.length > 0 ? (
                      <>
                        <h1 className={"text-white text-left"}>
                          {pageData.title}
                        </h1>
                        <div className="featured__article__divider "></div>
                      </>
                    ) : (
                      ""
                    )}

                    {pageAcf.page_subtitle.length > 0 ? (
                      <h3 className={"text-white text-left"}>
                        {pageAcf.page_subtitle}
                      </h3>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={"approach__copy"}>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-xl-6 about__header__column__one">
                  {pageAcf.first_column_block.length > 0 ? (
                    <div
                      className={"text-black"}
                      dangerouslySetInnerHTML={{
                        __html: pageAcf.first_column_block,
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-12 col-xl-6 about__header__column__two">
                  {pageAcf.second_column_block.length > 0 ? (
                    <div
                      className={"text-black"}
                      dangerouslySetInnerHTML={{
                        __html: pageAcf.second_column_block,
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </section>

          {pageAcf.first_slider_sections.length > 0 ? (
            <section className="approach__slider">
              <div className="container-fluid">
                <div className="row approach__slider__controls">
                  {pageAcf.first_slider_sections.map((slide, index) => (
                    <button
                      className={`
                                        ${
                                          index === 0
                                            ? "arrow__button --active"
                                            : "arrow__button"
                                        } 
                                        ${
                                          index + 1 ===
                                          pageAcf.first_slider_content.length
                                            ? "--square__end"
                                            : ""
                                        } 
                                        slide-${index + 1}
                                        type__selector 
                                    `}
                      key={`${slide.title}-${index}`}
                      totalpage={`slide-${pageAcf.first_slider_content.length}`}
                      topage={`slide-${index + 1}`}
                      onClick={this.handleSlider.bind(this)}
                    >
                      <div dangerouslySetInnerHTML={{ __html: slide.title }} />
                    </button>
                  ))}
                </div>
                <div className="row approach__slider__wrapper">
                  <div className="row featured__wrapper approach__first__slider">
                    {pageAcf.first_slider_content.map((element, index) => (
                      <div
                        className={`approach__first__slider__element col-md-12 ${
                          index === 0 ? "--s-active" : ""
                        }  `}
                        key={`the_element_slider-${index}`}
                        id={`slide-${index + 1}`}
                      >
                        <div className="approach__first__slider__element__background page__background">
                          {element.background ? (
                            <Img
                              fluid={
                                element.background.localFile.childImageSharp
                                  .fluid
                              }
                              alt={""}
                              tabIndex={-1}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="approach__first__element__wrapper container">
                          <div className="approach__first__slider__title">
                            {element.title.length > 0 ? (
                              <h2 className={"text-white"}>{element.title}</h2>
                            ) : (
                              ""
                            )}
                            {element.subtitle.length > 0 ? (
                              <h3 className={"text-white"}>
                                {element.subtitle}
                              </h3>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="approach__first__slider__copy">
                            {element.copy.length > 0 ? (
                              <div
                                className={"text-white"}
                                dangerouslySetInnerHTML={{
                                  __html: element.copy,
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className="prev__button"
                      totalpage={`slide-${pageAcf.first_slider_content.length}`}
                      topage={`slide-${this.state.prevPage}`}
                      aria-label="Previous slide"
                      onClick={this.handleSlider.bind(this)}
                      onKeyPress={this.handleSliderKeyboard.bind(this)}
                      tabIndex={0}
                    ></div>
                    <div
                      className="next__button"
                      totalpage={`slide-${pageAcf.first_slider_content.length}`}
                      topage={`slide-${this.state.nextPage}`}
                      aria-label="Next slide"
                      onClick={this.handleSlider.bind(this)}
                      onKeyPress={this.handleSliderKeyboard.bind(this)}
                      tabIndex={0}
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
          <section className="mis__vals__soc approach_mvs">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-xl-12 mission">
                  {pageAcf.capabilities_title.length > 0 ? (
                    <h2 className=" ">{pageAcf.capabilities_title}</h2>
                  ) : (
                    ""
                  )}
                  {pageAcf.capabilities_subtitle.length > 0 ? (
                    <p>{pageAcf.capabilities_subtitle}</p>
                  ) : (
                    ""
                  )}
                </div>
                {pageAcf.capabilities_first_block.length > 0 ? (
                  <div className="col-md-12 col-xl-6 values">
                    <div className="values__wrapper">
                      {pageAcf.capabilities_first_block.map((value, index) => (
                        <div
                          className={`values__information`}
                          key={`${value.title}-${index}`}
                        >
                          <div className="values__information__inner">
                            <p>{value.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {pageAcf.capabilities_second_block.length > 0 ? (
                  <div className="col-md-12 col-xl-6 values">
                    <div className="values__wrapper">
                      {pageAcf.capabilities_second_block.map((value, index) => (
                        <div
                          className={`values__information`}
                          key={`${value.title}-${index}`}
                        >
                          <div className="values__information__inner">
                            <p>{value.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>
          {pageAcf.second_slider.length > 0 ? (
            <section className={"approach__testimonial"}>
              <div className="container-fluid">
                <div className="row">
                  <Slider
                    className="row featured__wrapper testimonial__slider"
                    {...settings}
                  >
                    {pageAcf.second_slider.map((element, index) => (
                      <div
                        className="testimonial__slider__element col-md-12"
                        key={`${element.name}-${index}`}
                      >
                        <div className="testimonial__slider__element__background page__background">
                          {element.background ? (
                            <Img
                              fluid={
                                element.background.localFile.childImageSharp
                                  .fluid
                              }
                              alt={""}
                              tabIndex={-1}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="testimonial__element__wrapper container">
                          <div className="testimonial__slider__element__testimonial">
                            <div
                              className={"text-white"}
                              dangerouslySetInnerHTML={{ __html: element.copy }}
                            />
                          </div>
                          <div className="featured__article__divider"></div>
                          <div className="testimonial__slider__element__info">
                            <p
                              className={"text-white text-uppercase"}
                              dangerouslySetInnerHTML={{ __html: element.name }}
                            />
                            <p
                              className={"text-white "}
                              dangerouslySetInnerHTML={{
                                __html: element.position,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      </Layout>
    )
  }
}
export default ApproachPage

export const pageQuery = graphql`
  query ApproachQuery {
    allWordpressPage(filter: { path: { eq: "/approach/" } }) {
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
            page_subtitle
            first_column_block
            second_column_block
            first_slider_sections {
              title
            }
            first_slider_content {
              title
              subtitle
              copy
              background {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 4000, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            capabilities_title
            capabilities_subtitle
            capabilities_first_block {
              title
            }
            capabilities_second_block {
              title
            }
            second_slider {
              copy
              name
              position
              background {
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
  }
`
