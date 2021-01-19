import React from "react"
import Layout from "../layouts"
import "./css/terms.css"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
export default function Terms(props) {
  const pageData = props.data.allWordpressPage.edges[0].node

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={pageData.yoast_meta.yoast_wpseo_metadesc}
        />
        <title>Terms of Use | Bruin Capital</title>
        <link
          rel="canonical"
          href={pageData.yoast_meta.yoast_wpseo_canonical}
        />
      </Helmet>

      <section id="terms-conditions">
        <div className="hero-terms">
          <div className="container">
            <div className="col-sm-12 col-md-12">
              <h1 className="terms-title">
                Bruin Capital <br /> Terms of Use
              </h1>
              <p>Last Updated: {pageData.date}</p>
            </div>
          </div>
        </div>

        <div className="terms-content">
          <div className="container">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query termsPageQuery {
    allWordpressPage(filter: { path: { eq: "/terms-of-use/" } }) {
      edges {
        node {
          id
          content
          yoast_meta {
            yoast_wpseo_metadesc
            yoast_wpseo_title
            yoast_wpseo_canonical
          }
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
