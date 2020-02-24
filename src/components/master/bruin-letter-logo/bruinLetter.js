
import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const BruinLogo = ({ children }) => {
    const data = useStaticQuery(graphql`
      query {
        allWordpressWpMedia(filter: {title: {eq: "bruin-letter"}}) {
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

    let bruinLetter = data.allWordpressWpMedia.nodes[0];

    return (
        <>
         <Img fluid={bruinLetter.localFile.childImageSharp.fluid} backgroundColor={'#ffffff'} tabIndex={-1}/>
        </>
    )
}

export default BruinLogo
