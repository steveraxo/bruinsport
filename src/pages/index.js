import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
class HomePage extends Component {
  render() {
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={ pageData.title }/>
            <title>{ pageData.title }</title>
            <link rel="canonical" href={globalHistory.location.origin} />
        </Helmet>
        <div className="home__page">

        </div>
      </Layout>
    )
  }
}
export default HomePage

export const pageQuery = graphql`
query MyQuery {
  allWordpressPage(filter: {path: {eq: "/"}}) {
    edges {
      node {
        id
        title
        content
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
}
`