import React from "react"
import Layout from "../layouts/index"
import SEO from "../components/seo"
import InternalButton from "../components/master/buttons/internalButton"
import "../pages/css/404.css"
import { Helmet } from "react-helmet"

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={"We were not able to find the page you are looking for"}
      />
      <title>{"Bruin Capital | Not Found"}</title>
    </Helmet>
    <div className="not__found__page">
      <SEO title="404: Not found" />
      <h1>Ups!</h1>
      <p>We were not able to find the page you are looking for</p>
      <InternalButton
        redirectionLink={"/"}
        buttonText={"Return to home"}
        buttonClass={"not__found__button"}
      />
    </div>
  </Layout>
)

export default NotFoundPage
