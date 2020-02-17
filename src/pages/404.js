import React from "react"
import Layout from "../layouts/index"
import SEO from "../components/seo"
import InternalButton from "../components/master/buttons/internalButton"
import "../pages/css/404.css"

const NotFoundPage = () => (
  <Layout>
    <div className="not__found__page">
      <SEO title="404: Not found" />
      <h1>Ups!</h1>
      <p>It seems that you just hit a page that doesn&#39;t exist... you better return to home</p>
      <InternalButton redirectionLink={'/'} buttonText={'Return to home'} buttonClass={'md-btn not__found__button'} />
    </div>
  </Layout>
)

export default NotFoundPage
