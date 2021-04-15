require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  // The site metadata below its not goin the be used because we are pulling this data from wordpress
  siteMetadata: {
    // title: ``,
    // description: ``,
    // subtitle: ``,
    // author: ``,
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-mailchimp`,
    //   options: {
    //       endpoint: `${process.env.MAILCHIMP_KEY}`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Montserrat`,
    //         variants: [`300`, `400`,`500`, `600`, `700`, `800`],
    //         fontDisplay: `swap`,
    //       },
    //       {
    //         family: `Muli`,
    //         variants: [`300`,`400`,`500`,`600` ,`700`, `800`],
    //         fontDisplay: `swap`,
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-79923821-1",
        head: true,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/.*\.svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        // This is the base url for the website, right now its pulling data from the env file
        baseUrl: `${process.env.GATSBY_WP_API_LINK}`,
        // This is the protocol used on the url for the website, right now its pulling data from the env file
        protocol: `${process.env.GATSBY_WP_PROTOCOL}`,
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}
