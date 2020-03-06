import React, {Component} from "react"
import "./newsCarrousel.css"
import downloadIcon from "../../images/media/media-37.png"
import linkIcon from "../../images/media/media-36.png"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 1,
        paginationSize: 5,
    };
  }
  // Constrols de arrow to next page of articles
  nextPage(event){
    let type = event.target.getAttribute("data-type"),
          lastPage = parseInt(event.target.getAttribute("data-finalpage")),
          currentPage = event.target.getAttribute("data-page"),
          nextPage = parseInt(currentPage++)
    
    if(nextPage >= lastPage){
        nextPage = 1
    }else{
        nextPage ++;
    }

    this.setState({
        currentPage: nextPage,
    });

    const elements = [...document.querySelectorAll(`.news__list_element.${type}`)]

    elements.map(element => {
        if(element.classList.contains(`${type}-${nextPage}`)){
            element.classList.add('active')
            element.classList.remove('not__active')
        }else{
            element.classList.remove('active')
            element.classList.add('not__active')
        }

        return true
    })
  }
  // Constrols de arrow to previous page of articles
  previousPage(event){
    let   type = event.target.getAttribute("data-type"),
          lastPage = parseInt(event.target.getAttribute("data-finalpage")),
          currentPage = event.target.getAttribute("data-page"),
          nextPage = parseInt(currentPage++)
    
    if(nextPage <= 1){
        nextPage = lastPage
    }else{
        nextPage --;
    }

    this.setState({
        currentPage: nextPage,
    });

    
    const elements = [...document.querySelectorAll(`.news__list_element.${type}`)]

    elements.map(element => {
        if(element.classList.contains(`${type}-${nextPage}`)){
            element.classList.add('active')
            element.classList.remove('not__active')
        }else{
            element.classList.remove('active')
            element.classList.add('not__active')
        }

        return true
    })
  }
  // Split the list in chunks
  ChunkArrayList(array, totalPages){
    function chunkArray(array, chunk_size){
        var results = [];
        while (array.length) {
            results.push(array.splice(0, chunk_size));
        }
        return results;
    }
    return chunkArray(array, totalPages);
  }
  // Add numbered id to each chunk to paginate the results
  identifyLists(finalArray){
    finalArray.forEach((array, index) => {
        const parentIndex = index+1; 

        array.forEach(htmlElement => {
            let itsActive = 'not__active'
            if(parentIndex === 1){
                itsActive = 'active'
            }
            htmlElement.classList.add(`${this.props.elId}-${parentIndex}`)
            htmlElement.classList.add(`${itsActive}`)
        })
    });
  }
  componentDidMount () {
    const totalPages = this.state.paginationSize;
    const listedNews = [...document.querySelectorAll(`.${this.props.elId}`)];

    const finalArray = this.ChunkArrayList(listedNews, totalPages)
    this.identifyLists(finalArray)
  }
  render() {
    let newsArray = this.props.newsArray 

    return (
        <div className={`news__list ${this.props.state}`} id={this.props.elId}>
            {
                newsArray.map((element, index) => 
                    <div className={`${this.props.elId} news__list_element`} key={`${this.props.elId}-${index}`} >
                            <div className="news__list_field date col-xl-2">
                                <p>{element.node.date}</p>
                            </div>
                            <div className="news__list_field subtitle col">
                                <p>{element.node.acf.subtitle}</p>
                            </div>
{/*                             
                            <div className="news__list_field title col">
                                <p>{element.node.acf.title}</p>
                            </div> */}
                            <div className="news__list_field actions col-xl-2">
                            {   
                                this.props.elId === 'press'
                                ? <>
                                    {
                                        element.node.acf.pdf_press_release
                                        ? <a href={element.node.acf.pdf_press_release.url.source_url} download target="_BLANK" rel="noopener noreferrer">
                                            <img src={downloadIcon} alt="Download the PDF attachment"/>
                                          </a>
                                        :''
                                    }
                                </>
                                : <>
                                    <a href={element.node.acf.external_news_link} target="_BLANK" rel="noopener noreferrer">
                                        <img src={linkIcon} alt="Link to Press Release"/>
                                    </a>
                                </>
                            }
                            </div>
                    </div>

                )
            }
            
            <div className="news__list__pagination">
                <div className={'previous__page'} 
                     data-type={this.props.elId} 
                     data-page={this.state.currentPage} 
                     onClick={this.previousPage.bind(this)} 
                     key={`id-${this.props.elId}-1`} 
                     tabIndex={0}
                     data-finalpage={`${ Math.ceil(newsArray.length / this.state.paginationSize)}`}> back 
                </div>
                
                <div className={'next__page'} 
                     key={`id-${this.props.elId}-2`} 
                     data-type={this.props.elId} 
                     data-page={this.state.currentPage} 
                     tabIndex={0}
                     data-finalpage={`${ Math.ceil(newsArray.length / this.state.paginationSize)}`}  
                     onClick={this.nextPage.bind(this)}> next 
                </div>
            </div>
        </div>
    )
  }
}
export default Header