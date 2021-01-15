import React from "react"
import Helmet from "react-helmet"
import Layout from "../layouts/index"

export default function Privacy() {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        {/* <meta
          name="description"
          content={pageData.yoast_meta.yoast_wpseo_metadesc}
        />
        <title>{pageData.yoast_meta.yoast_wpseo_title}</title>
        <link
          rel="canonical"
          href={pageData.yoast_meta.yoast_wpseo_canonical}
        /> */}
      </Helmet>
    </Layout>
  )
}
