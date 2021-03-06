import React from "react"
import Layout from "../layouts"
import "./css/privacy.css"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

export default function Privacy(props) {
  const pageData = props.data.allWordpressPage.edges[0].node
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={pageData.yoast_meta.yoast_wpseo_metadesc}
        />
        <title>Privacy Policy | Bruin Capital</title>
        <link
          rel="canonical"
          href={pageData.yoast_meta.yoast_wpseo_canonical}
        />
      </Helmet>

      <section id="terms-conditions">
        <div className="hero-privacy">
          <div className="container">
            <div className="col-sm-12 col-md-12">
              <h1 className="terms-title">
                Bruin Capital <br /> Privacy Policy
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
  query privacyPageQuery {
    allWordpressPage(filter: { path: { eq: "/privacy-policy/" } }) {
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
