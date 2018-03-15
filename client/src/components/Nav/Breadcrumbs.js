import React, {Component} from 'react'
import './Breadcrumbs.css'

const pathNames = {
  dashboard: { name: 'Home', url: '/dashboard' },
  accounts: { name: 'Accounts', url: '/accounts' },
  gigs: { name: 'Gigs', url: '#' },
  goals: { name: 'Goals', url: '#' }
}

// navigation breadcrumbs
class Breadcrumbs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      paths: [pathNames.dashboard]
    }
  }

  // parse the current path
  parsePath (url) {
    let currentPath = url || '/'
    let paths = currentPath.split('/').filter(item => { return (item != '') })
    let nextPathState = [pathNames.dashboard]
    paths.forEach(p => {
      console.log(`  -> path: `, p)
      if (!(p === 'dashboard') && (Object.keys(pathNames).includes(p))) {
        nextPathState.push(pathNames[p])
      }
    })

    this.setState({paths: nextPathState})
  }

  componentWillMount () {
    this.parsePath(this.props.location.pathname)
  }

  render () {
    if (this.state.paths.length == 0) {
      return (<div />)
    }

    const pathItems = this.state.paths.map((path, i) =>
      <a key={i} href={path.url} className='breadcrumb'>{path.name}</a>
    )

    return (
      <nav className='breadcrumbs'>
        <div className='nav-wrapper breadcrumbs-wrapper'>
          <div className='breadcrumbs col s12'>
            {pathItems}
          </div>
        </div>
      </nav>
    )
  }
}

export default Breadcrumbs
