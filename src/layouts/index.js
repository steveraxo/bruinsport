import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import MainMenu from "../components/menu/mainMenu"
import "./index.css"
import "./custom.css"
import "../fonts/custom-fonts.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressSiteMetadata {
        edges {
          node {
            description
            home
            name
            url
          }
        }
      }
      logo: allWordpressWpMedia(filter: {title: {eq: "logo"}}) {
        nodes {
          source_url
          title
          localFile {
            childImageSharp{
              fixed(width: 200, quality: 100) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
      favicon: allWordpressWpMedia(filter: {title: {eq: "favicon"}}) {
        nodes {
          source_url
          title
        }
      }
    }
  `)
  const siteData = data.allWordpressSiteMetadata.edges[0].node
  let siteLogo = false, 
      siteFavicon = false

  if(data.logo.nodes.length > 0){
    siteLogo = data.logo.nodes[0]
  }

  if(data.favicon.nodes.length > 0){
    siteFavicon = data.favicon.nodes[0].source_url
  }

  return (
    <>
      <Helmet>
        <link rel="icon" href={siteFavicon} />
        <html lang="en" />
      </Helmet>
      <Header  siteTitle={siteData.name} siteLogo={siteLogo} />
      <div className="master__wrapper">
        <main >{children}</main>
        <MainMenu ></MainMenu>
        <Footer />
      </div>
    </>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Layout