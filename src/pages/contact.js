import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
import "./css/contact.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "gatsby-image"
import Reaptcha from 'reaptcha';
import axios from "axios"
import MapBackground from "../components/master/map-background/mapBackground"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // form states
      name: '',
      email: '',
      message: ``,
      errorForm: 'error__field',
      verifiedEmail: false,
      // loading states
      loading: 'slept',
      //recaptcha states
      verified: false,
      recaptchaKey: `${process.env.GOOGLE_REV2_KEY}`,
      submit: false, 
      showRecaptcha: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    // we need the if statement
    const value = event.target.name.replace('your-', '');

    this.setState({[value]: event.target.value});
  }
  handleSubmit = async event => {
    event.preventDefault();
    
    const state = this.state; 
    this.setState({submit: true});

    const form = new FormData()

    let validName = false, validEmail = false, validMessage = false

    if(state.name.length > 3){ validName = true }
    if(this.validateEmail(state.email)) { validEmail = true; this.setState({verifiedEmail: true}); }
    if(state.message.length > 15){ validMessage = true }

    if(validName && validEmail && validMessage){
      // We activate the loading status
      this.setState({loading: 'loading'});

      // set the key and value for the form response
      form.set('field-name', state.name)
      form.set('field-email', state.email)
      form.set('field-interested', document.querySelectorAll('.checked input')[0].value)
      form.set('field-message', state.message)
  
      axios.post('https://bruinsp.raxo.dev/wp-json/contact-form-7/v1/contact-forms/14/feedback', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(response => {
          this.setState({loading: 'success'});
          // We reset the recaptcha field
          this.captcha.reset()
          this.setState({
            showRecaptcha: true,
            verified: false,
          });
      }).catch(err => {
          this.setState({loading: 'failed'});
      })
    }else{
      this.setState({loading: 'not__completed'});
      document.getElementById("async__form").scrollIntoView();
    }

  }

  // Verify the Recaptcha and hide it
  onVerify = recaptchaResponse => {
    this.setState({
      verified: true,
      showRecaptcha: false
    });
  };
  
  // function for email validation
  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  changeRadioOption(event){
    let radioElement = event.target;

    if(radioElement.classList.contains('is__input')){
      radioElement = document.getElementById(`${radioElement.id}__label`);
    }

    let allRadioButtons = [...document.querySelectorAll('#interest__group label')];
    let allRadioInputs = [...document.querySelectorAll('#interest__group label')];

    allRadioButtons.map(element => 
      element.classList.remove('checked')
    )
    allRadioInputs.map(element => 
      element.checked = false
    )

    radioElement.classList.add('checked');
    radioElement.firstElementChild.checked = true;

    radioElement.focus()
  }
  
  changeRadioOnKeyboard(){
    var element = document.getElementById("interest__group"),
    KEYCODE_TAB = 9;

    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
        if (!isTabPressed) { 
            return; 
        }
    });
  }

  render() {
    const {loading, submit, name, message, verifiedEmail} = this.state

    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const pageAcf = this.props.data.allWordpressPage.edges[0].node.acf

    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={ pageData.yoast_meta.yoast_wpseo_metadesc }/>
            <title>{ pageData.yoast_meta.yoast_wpseo_title }</title>
            <link rel="canonical" href={pageData.yoast_meta.yoast_wpseo_canonical} />
        </Helmet>
        <div className="contact__page">
          <section className="container-fluid contact__section__one position-relative">
            <Img className={'position-absolute'} fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-3">
                
                </div>
                <div className="col-sm-12 col-md-12 col-xl-9 form__section">
                  <h1 className="text-left" dangerouslySetInnerHTML={{__html: pageAcf.main_title}} />
                  <form className={'async__form'} id={'async__form'}>
                  
                  <div className={'container'}>
                    <div className={'row first__row'}>
                      <div className={'col-md-12 col-lg-6 name__wrapper'}>
                        <label htmlFor="name">Your name</label><br></br>
                        <input 
                          type="text" 
                          className={
                            submit === true
                            ? name.length > 3
                              ? ''
                              : 'error__field'
                            : ''
                          } 
                          value={name} 
                          onChange={this.handleChange}  
                          id="name" 
                          name="your-name" 
                          required 
                          placeholder={'My Name Is'}
                        />
                        <div className="validation__message">
                          {
                            submit === true
                            ? name.length > 3
                              ? ''
                              : <p><small>Please add your name and last name</small></p>
                            : ''
                          }
                        </div>
                      </div>
                      <div className={'col-md-12 col-lg-6 email__wrapper'}>
                        <label htmlFor="email" className={'invisible'}>Email address</label>
                        <input 
                          type="text" 
                          className={
                            submit === true
                            ? verifiedEmail === true
                              ? ''
                              : 'error__field'
                            : ''
                          } 
                          value={this.state.email} 
                          onChange={this.handleChange} 
                          id="email" 
                          name="your-email" 
                          required 
                          placeholder={'Email'}
                        />
                        <div className="validation__message">
                          {
                            submit === true
                            ? verifiedEmail === true
                              ? ''
                              : <p><small>Please add a valid email address!</small></p>
                            : ''
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'container'}>
                    <div className={'row second__row'}>
                      <div className={'col-md-12 col-lg-6 interested__wrapper'}>
                        <label htmlFor="your-interest">I'm interested in</label>
                        <fieldset name={'your-interest'} id={'interest__group'}>
                          
                          <label htmlFor="interest__option" id={'interest__option__one__label'} className={'checked'} onClick={this.changeRadioOption}>
                          <h4>General Inquires</h4>
                          <input id="interest__option__one" className={'is__input'} tabIndex={0} type="radio" name="interest__option" value="General Inquires"  checked onChange={this.changeRadioOption}/>
                          </label><br></br>
                          
                          <label htmlFor="interest__option"  id={'interest__option__two__label'} onClick={this.changeRadioOption}>
                          <h4>Media Inquires</h4>
                          <input id="interest__option__two" onChange={this.changeRadioOption} className={'is__input'} tabIndex={0} type="radio" name="interest__option" value="Media Inquires" />
                          </label><br></br>
                        </fieldset> 
                      </div>
                      <div className={'col-md-12 col-lg-6 message__wrapper'}>
                        <label htmlFor="message" className={'invisible'}>Your Message</label>
                        <textarea 
                          value={message} 
                          className={message.length > 0 ? 'passed__field' : 'error__field'} 
                          onChange={this.handleChange} 
                          id="message" 
                          name="your-message" 
                          required 
                          
                          placeholder={'Your Message'}
                          tabIndex={0}
                        >
                        </textarea>
                        <div className="validation__message">
                          {
                            submit === true
                            ? message.length > 20
                              ? ''
                              : <p><small>Please add a longer message for our team</small></p>
                            : ''
                          }
                        </div>

                      </div>
                      <div className={'col-md-12 col-lg-12 submit__wrapper d-flex justify-content-start align-items-start flex-column'}>
                        <Reaptcha ref={e => (this.captcha = e)} tabindex={0} className={this.state.showRecaptcha ? '' : 'hidden__element'} sitekey={'6LdDd9cUAAAAAODEZ-CLPxm1CPpZyqmfo2NN58Yk'} onVerify={this.onVerify} />
                        <button type="submit" style={{marginTop: '20px'}} className={'md-btn long-btn'} onClick={this.handleSubmit} disabled={!this.state.verified}>Send</button>
                        <div className={'loading__status ' + loading }>
                          {
                            loading === 'loading' ? <p>We are submitting your message</p> : ''
                          }
                          {
                            loading === 'success' ? <p>Your message was sent!</p> : ''
                          }
                          {
                            loading === 'failed' ? <p>We could not send your message, please try again later</p> : ''
                          }
                          {
                            loading === 'not__completed' ? <p>Please fill all the fields with the proper information</p> : ''
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </section>

          <section className="container-fluid contact__section__two position-relative d-flex justify-content-center align-items-center">
            <div className="img__background">
              <MapBackground  />
            </div>
            <div className="container">
              <div className="row">
                {
                  pageAcf.three_columns_data.map((element, index) => 
                    <div className="col-sm-12 col-md-6 col-xl-4 text-left column__data" key={`${element}-${index}`}>
                      <h4 className="text-left" dangerouslySetInnerHTML={{__html: element.column_title}} />
                      {
                        element.column_element.map((subElement, index) => 
                          <div key={`${element}-${subElement}-${index}`}>
                          <p >{subElement.element_title}</p>
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </section>

          <section className="container-fluid contact__section__three">
            <div className="container">
              <div className="row ">
                <div className="col-sm-12 col-xl-6">
                  <h2 className="mainText" dangerouslySetInnerHTML={{__html: pageAcf.portfolio_title}} />
                </div>
              </div>
              <div className="row contact__section__three__columns">
              {
                  pageAcf.portfolio_data.map((element, index) => 
                  <>
                    <div className="col-md-4 col-xl-3 s__three__column" key={`${element}-${index}`}>
                      <a href={`https://${element.client_url}`} target="_BLANK" rel="noopener noreferrer">
                        <div className={'column__image'}>
                          <Img fixed={element.cliente_logo.localFile.childImageSharp.fixed} alt={'Client Logo'} tabIndex={0}/>
                        </div>
                      </a>
                      <div className={'column__info'}>
                        <a href={`mailto:${element.client_email}`} target="_BLANK" rel="noopener noreferrer">
                          <p className="text-left" dangerouslySetInnerHTML={{__html: element.client_email}} />
                        </a>
                        <a href={`https://${element.client_url}`} target="_BLANK" rel="noopener noreferrer">
                          <p className="text-left" dangerouslySetInnerHTML={{__html: element.client_url}} />
                        </a>
                      </div>
                    </div>
                    <div className="col"></div>
                  </>
                  )
                }
                <div className="col-sm-12 col-md-6 col-xl-4">

                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}
export default HomePage

export const pageQuery = graphql`
query ContactQuery {
  allWordpressPage(filter: {path: {eq: "/contact/"}}) {
    edges {
      node {
        id
        title
        content
        yoast_meta {
          yoast_wpseo_metadesc
          yoast_wpseo_title
          yoast_wpseo_canonical
        }
        date(formatString: "MMMM DD, YYYY")
        featured_media {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        } 
        acf {
          main_title
          portfolio_title
          portfolio_data {
            client_email
            client_url
            cliente_logo {
              localFile {
                childImageSharp {
                  fixed(width: 200, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
              source_url
            }
          }
          three_columns_data {
            column_title
            column_element {
              element_title
            }
          }
        }
      }
    }
  }
}

`