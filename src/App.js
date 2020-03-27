
import React, {Component} from 'react';
import './css/main.css';
import './css/tachyons.css';
import logoImage from './images/logo.svg';
import menu from './data/menu';
import attractions from './data/attractions';

const Highlight = ({children, type}) => (
  <span className={`relative highlight highlight-${type}`}>
    <span className="relative z-2">{children}</span>
  </span>
);

const Intro = () => (
<div className="m-auto-ns f4 f3-m f2-l tc w-80-l normal">
  <div className="mb3 mb4-ns">
  <Highlight type="aqua">Lost in Tokyo</Highlight> is a directory of fun places to see,
  play in and <Highlight type="yellow">explore</Highlight>, in <Highlight type="blue">Tokyo</Highlight>, Japan.
  </div>

  <div>
    From <Highlight type="blue">museums</Highlight> and{' '}
    <Highlight type="blue">galleries</Highlight>, to{' '}
    <Highlight type="pink">robot restaurants</Highlight> and{' '}
    <Highlight type="pink">kitten cafes</Highlight>, Tokyo is the gift that keeps on giving.{` `}
    <Highlight type="yellow">Dattebayo!</Highlight>
  </div>
</div>
);

const NavItem = ({className, href, children, logo}) => (
<li className={`mh2-ns f6 f4-l tc ${className}`}>
  <a className="white no-underline" href={href}>
    {logo ? <img src={logoImage} className="cd center logo" /> : children}
  </a>
</li>
)

const Nav = () => (
<nav className="pt3 pt4-ns mb4 mb0-ns">
  <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
    {menu.map(item => (
        <NavItem {...item} />
    ))}
  </ul>
</nav>
);

// we can write compontnts as classes
// htey have more funcrunalities, such as lifecycle methods

const Overlay = ({title, description, showInfo, link}) => (
<div className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay" style={{transform: showInfo ? 'none' : 'translateY(-100%)'}}>
  <div>
      <h1 className="f4 f3-ns mt0 mb2 regular black  normal 1h-title">
        {link ? <a className="black" href={link}>{title}</a> : title}
      </h1>
      <p className="1h-title 1h-copy-ns mv0 black f6-measure-l">{description}</p>
  </div>
</div>
)


class Attraction extends Component{
constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
}

closeInfo = () => {
  this.setState({
    showInfo: false
  })
}

toggleInfo = () => {
   this.setState((prevState, props) => {
     return {showInfo: !prevState.showInfo}
   })
}


render(){
  const { title, description, image, className, link} = this.props
  const { showInfo } = this.state

  return (
    <div
      className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${className}`}
      onMouseEnter ={this.toggleInfo}
      onMouseLeave = {this.closeInfo}
      >
        <div className="relative">
          <Overlay {...this.props} {...this.state}/>
          <img 
          src={require(`./images/${image}`)}
           className="db" />
        </div>
    </div>
  )
}
}


const App = () => (
  <div>
    <div className="min-vh-100 ph4 flex flex-column">
      {}
      <Nav />
      <Intro />
    </div>
    <div className="flex flex-wrap container">
      {attractions.map(attraction => (
        <Attraction {...attraction} />
      ))}
    </div>
  </div>
)

export default App;
