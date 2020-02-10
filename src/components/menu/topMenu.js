import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "gatsby-link"
import BurguerButton from "../master/burguer/burguerButton"
import "./topMenu.css"
const MainMenu = (props) => {

  const data = useStaticQuery(graphql`
    query topMenuQuery {
      allWordpressMenusMenusItems(filter: {slug: {eq: "navigation-menu"}}) {
        edges {
          node {
            id
            items {
              target
              title
              url
              classes
              attr_title
              wordpress_id
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
    menuId  = data.allWordpressMenusMenusItems.edges[0].node.id;
  }
  return (
    <nav className={`d-flex justify-content-center align-items-center menu__wrapper top__menu  menu-${menuId}`} key={menuId}>
      <ul className="mr-2">
        {
          menuItems
          ? menuItems.map((item, index) => 
              <li key={item.wordpress_id}  className={`list__element ` + item.classes}>
                <Link to={item.url} id={item.url}>
                  <p>{item.title}</p>
                </Link>
              </li>
            )
          : ''
        }
      </ul>
      <div className="top__menu__divider mr-4 ml-4"></div>
      <BurguerButton ></BurguerButton>
    </nav>  
  )
}
export default MainMenu

