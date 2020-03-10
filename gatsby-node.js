// We require dotenv to create the environment variables
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const queryAll = require(`./src/queries/queryAll.js`)
const createPaginatedPages = require(`gatsby-paginate`)
// exports.createPages = ({ graphql, actions }) => {
//     const { createPage } = actions;
//     return new Promise((resolve, reject) => {

//         const pageTemplate = path.resolve("./src/templates/page.js");
//         const postTemplate = path.resolve("./src/templates/posts/post.js");
//         const newsTemplate = path.resolve("./src/templates/news/new.js");
//         const pressTemplate = path.resolve("./src/templates/press/press.js");

//         resolve(
//             graphql(queryAll).then(result => {
//                 if (result.errors) reject(result.errors)
//                 const pages = result.data.allWordpressPage.edges
//                 pages.forEach(edge => {
//                     createPage({
//                         path: `/${edge.node.slug}/`,
//                         component: slash(pageTemplate),
//                         context: {
//                             id: edge.node.id,
//                         },
//                     })
//                 })

//                 // Posts detail
//                 const posts = result.data.allWordpressPost.edges
//                 createPaginatedPages({
//                     edges: posts,
//                     createPage: createPage,
//                     pageTemplate: 'src/templates/posts/posts.js',
//                     pageLength: 3,
//                     pathPrefix: 'blog',
//                 })
//                 posts.forEach(edge => {
//                     createPage({
//                         path: `/post/${edge.node.slug}/`,
//                         component: slash(postTemplate),
//                         context: {
//                             id: edge.node.id,
//                         },
//                     });
//                 })

//                 // News detail
//                 const news = result.data.allWordpressWpNews.edges
//                 createPaginatedPages({
//                     edges: news,
//                     createPage: createPage,
//                     pageTemplate: 'src/templates/news/news.js',
//                     pageLength: 3,
//                     pathPrefix: 'news',
//                 })
//                 news.forEach(edge => {
//                     createPage({
//                         path: `/news/${edge.node.slug}/`,
//                         component: slash(newsTemplate),
//                         context: {
//                             id: edge.node.id,
//                         },
//                     });
//                 })

//                 // Press Releases detail
//                 const press = result.data.allWordpressWpPressreleases.edges
//                 createPaginatedPages({
//                     edges: press,
//                     createPage: createPage,
//                     pageTemplate: 'src/templates/press/pressLoop.js',
//                     pageLength: 3,
//                     pathPrefix: 'press',
//                 })
//                 press.forEach(edge => {
//                     createPage({
//                         path: `/press/${edge.node.slug}/`,
//                         component: slash(pressTemplate),
//                         context: {
//                             id: edge.node.id,
//                         },
//                     });
//                 })
//             })
//         )
//     });
// };