
import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const MapBackground = ({ children }) => {
    const data = useStaticQuery(graphql`
      query {
        allWordpressWpMedia(filter: {title: {eq: "map-background-contact"}}) {
            nodes {
                localFile {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
      }
    `)

    let mapImage = data.allWordpressWpMedia.nodes[0];

    return (
        <>
         <Img fluid={mapImage.localFile.childImageSharp.fluid} alt=""  tabIndex={-1}/>
        </>
    )
}

export default MapBackground
