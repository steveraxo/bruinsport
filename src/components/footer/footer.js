import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./footer.css"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query footerQuery {
      allWordpressAcfOptions {
        edges {
          node {
            options {
              copyright
              logo {
                source_url
                alt_text
                localFile {
                  childImageSharp {
                    fixed(width: 20, height: 20) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const footerOptions = data.allWordpressAcfOptions.edges[0].node.options

  return (
    <>
      <footer className="footer__wrapper">
        <div className="footer__container container">
          <div className="row text-center justify-content-center align-items-center">
            <div className="footer__logo d-flex justify-content-center align-items-center"></div>
            <div className="footer__content">
              {footerOptions.copyright.length > 0 ? (
                <p>
                  {footerOptions.copyright} {new Date().getFullYear()}[•]. All
                  Rights Reserved
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
Footer.propTypes = {
  siteTitle: PropTypes.string,
}
Footer.defaultProps = {
  siteTitle: ``,
}
export default Footer
