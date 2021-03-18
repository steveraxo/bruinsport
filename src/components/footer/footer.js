import PropTypes from "prop-types"
import React from "react"
import Link from "gatsby-link"
import { useStaticQuery, graphql } from "gatsby"
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
          <div className="row text-center justify-content-start align-items-center">
            <div className="footer-menu d-flex justify-content-start align-items-around">
              <Link className="footer-link" to="/approach">
                About Us
              </Link>
              <Link className="footer-link" to="/terms">
                Terms Of Use
              </Link>
              <Link className="footer-link" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="footer-link" to="/contact">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="row text-center justify-content-start align-items-center">
            <div className="footer__content">
              {footerOptions.copyright.length > 0 ? (
                <p>
                  {footerOptions.copyright} {new Date().getFullYear()}. All
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
