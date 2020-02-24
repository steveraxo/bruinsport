
import React, { Component } from "react"
import ExternalButton from "../../components/master/buttons/externalButton"
import Img from "gatsby-image"

import "./project.css"
class Project extends Component {
    render() {
        const projectData = this.props.projectData; 
console.log(projectData)
        return (
            <>
                {
                    // ======= Diagonal Project Layout =======
                    projectData.project_layout === "diagonal"
                    ?   <div className={`our__approach featured__section container-fluid d-flex justify-content-center align-items-end ${projectData.project_layout} col-xl-12`} key={`0`}>
                            <div className="page__background">
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className={'col-md-12 col-lg-10 col-xl-10 text-left'}>
                                    <Img fixed={projectData.project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                    <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={projectData.project_link}></ExternalButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :''
                }
                {
                    // ======= Half Left Project Layout =======
                    projectData.project_layout === "half-left"
                    ?   <div className={'col-md-12 col-lg-6 portfolio_half right__portfolio'} key={`2`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <Img fixed={projectData.project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                </div>
                                <div className={'portfolio__button'}>
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={projectData.project_link}></ExternalButton>
                                </div>
                            </div>
                        </div>
                    :''
                }
                {
                    // ======= Half Right Project Layout =======
                    projectData.project_layout === "half-right"
                    ?   <div className={'col-md-12 col-lg-6 portfolio_half left__portfolio'} key={`1`}>
                            <div className={'portfolio__header'}>
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} />
                            </div>
                            <div className={'portfolio__inner'}>
                                <div className={'portfolio__logo'}>
                                    <Img fixed={projectData.project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                </div>
                                <div className={'porftolio__description'}>
                                    <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                </div>
                                <div className={'portfolio__button'}>
                                    <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={projectData.project_link}></ExternalButton>
                                </div>
                            </div>
                        </div>
                    :''
                }
                {
                    // ======= Full Width Project Layout =======
                    projectData.project_layout === "full-width"
                    ?   <div className={`col-md-12 col-lg-12 portfolio_full ${projectData.theme}`} key={`3`}>
                            <div className="page__background">
                                <Img fluid={projectData.project_background.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                            </div>
                            <div className={'col-md-12 col-lg-6 first'}>

                            </div>
                            <div className={'col-md-12 col-lg-6 second'}>

                                <div className={'portfolio__inner'}>
                                    <div className={'portfolio__logo'}>
                                        <Img fixed={projectData.project_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                                    </div>
                                    <div className={'porftolio__description'}>
                                        <div dangerouslySetInnerHTML={{__html: projectData.project_description}} />
                                    </div>
                                    <div className={'portfolio__button'}>
                                        <ExternalButton buttonClass={'md-btn'} buttonText={'Learn More'} redirectionLink={projectData.project_link}></ExternalButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :''
                }                                             
            </>
        )
    }
}
export default Project
