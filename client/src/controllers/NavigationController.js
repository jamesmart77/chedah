import React from 'react';
import API from '../utils/API';
import { requireAuth, isLoggedIn } from '../utils/AuthService';
import { Nav, Breadcrumbs } from '../components/Nav';
import ActionButton from '../components/ActionButton';


const pathNames = {
    dashboard: { name: 'Home', url: '/dashboard' },
    accounts: { name: 'Accounts', url: '/accounts' },
    gigs: { name: 'Gigs', url: '#' },
    goals: { name: 'Goals', url: '#' }
}


String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


const outputStyle = {
  position: 'fixed',
  bottom: 0,
  right: '1.5rem',
  backgroundColor: '#00000035',
  padding: '10px',
  color: '#fff',
  zIndex: 999999,
  borderRadius: '1rem',
  paddingTop: 6,
  paddingBottom: 4,
  paddingLeft: 18,
  paddingRight: 18
};



// navigation visual cue
class ModeOutput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='footer-debug' style={outputStyle}>
                <span>{'mode: ' + this.props.mode}</span>
                <span id='screen-res-root'></span>
            </div>
        )
    }
}


// navigation controller
class NavigationController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rawPaths: [],
            pathData: [],
            section: null,
            detailId: null,
            mode: 'none'
        }

        this.updateMode = props.updateMode.bind(this)
    }

    componentWillMount() {
        this.parsePath(this.props.location.pathname)
    }

    componentDidMount(){
        // this.parsePath(this.props.location.pathname)
    }


    // parse the current path
    parsePath(path) {
        const pathArray = path.split('/').filter(p => { return (p !== '')} )


        var sectionNames = Object.keys(pathNames)
        sectionNames.splice(sectionNames.indexOf('dashboard'), 1)

        // temp data
        var pathData = [{name: 'Home', url: '/dashboard'}];
        var tempSection;
        var tempDetailId;
        var tempMode = 'dashboard';

        pathArray.forEach(p => {
            if (sectionNames.includes(p)) {
                tempSection = p;
                tempMode = p;
                pathData.push({name: pathNames[p].name, url: pathNames[p].url})
            } else {
                if (p != 'dashboard') {
                    pathData.push({name: p, url: `/${tempSection}/${p}`})
                    tempDetailId = p;
                    tempMode = `${tempMode}Detail`;
                }
            }
        })


        if (tempDetailId) {
            let newPaths = pathData;
            let detailPath = newPaths.pop();

            if (tempSection == 'accounts') {
                API.getAccount({accountId: tempDetailId}).then(dbacct => {

                    detailPath.name = dbacct.data.name;
                    pathData = newPaths.concat(detailPath)
                    this.setState({pathData: pathData})
                })
            }

            if (tempSection == 'gigs') {
                API.getGig({gigId: tempDetailId}).then(dbgig => {
                    detailPath.name = dbgig.data.name;
                    pathData = newPaths.concat(detailPath)
                    this.setState({pathData: pathData})
                })
            }
        }

        this.updateMode(tempMode)
        this.setState({rawPaths: pathArray, pathData: pathData, section: tempSection, detailId: tempDetailId, mode: tempMode})
    }

    render() {
        const isLandingPath = (this.state.rawPaths.length > 0)
        const pathItems = this.state.pathData.map((pdata, i) => {
            if (pdata != 'dashboard') {
                let trailing = (i < (this.state.pathData.length - 1)) ? ' > ' : ''
                return <a key={i} href={pdata.url}>{pdata.name.toTitleCase() + trailing}</a>
            }
        })

        return (
            <div>
            <Nav mode={this.state.mode} user={this.props.user}/>
            {isLandingPath ?
                (<div>
                    <Breadcrumbs paths={this.state.pathData}/>
                    <ActionButton mode={this.state.mode}/>
                    <ModeOutput mode={this.state.mode}/>
                </div>)
            : (<div> </div>)
            }
            </div>
        );
    }
}

export default NavigationController;
