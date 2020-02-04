import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "gatsby-link"
import "./menus.css"
const MainMenu = (props) => {

  const data = useStaticQuery(graphql`
    query mainMenuQuery {
      allWordpressMenusMenusItems(filter: {slug: {eq: "top-menu"}}) {
        edges {
          node {
            id
            items {
              target
              title
              url
              classes
              attr_title
            }
          }
        }
      }
    }
  `)

  var menuItems = false; 
  var menuId = false; 
  if(data.allWordpressMenusMenusItems){
    menuItems = data.allWordpressMenusMenusItems.edges[0].node.items;
    menuId  = data.allWordpressMenusMenusItems.edges[0].node.wordpress_id;
  }
  return (
    <div className={`menu__wrapper main__menu ${props.theme} ${menuId}`}>
      <ul >
        {
          menuItems
          ? menuItems.map((item, index) => 
              <li key={item.wordpress_id}  className={`list__element ` + item.classes}>
                <Link to={item.url} id={item.url}>
                  {item.title}
                </Link>
              </li>
            )
          : ''
        }
      </ul>
    </div>  
  )
}
export default MainMenu

