import Navbar from './Navbar';
// import Home from './01-Home';
// import SecondHome from './02-Home'
// import ThirdHome from './03-Home';
// import FourthHome from './04-Home';
// import FifthHome from './05-Home';
import SixthHome from './06-Home';
import Create from './Create';
import Comments from './Comment';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
/**
 *    FIRST STEP to making use of the Router component:
 * We need to surround our whole application using the `Router` Component. And
 * That means we can use the Router in our entire application, all components that
 * are nested inside the App Component have access to the Router
 *    SECOND STEP:
 * The second step is to decide where we want our page content to go when we go to
 * different pages. We can do this using the `Switch` Component provided we have a 
 * specific location we want our page content to be.
 */

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={SixthHome} />
                        <Route path="/create" component={Create} />
                        <Route path="/blogs/:id" component={BlogDetails} />
                        <Route path="/comment" component={Comments} />

                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
// '@babel/plugin-proposal-private-property-in-object'