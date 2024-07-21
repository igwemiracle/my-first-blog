import Navbar from './Navbar';
// import Home from './01-Home';
import HomeTwo from './02-Home'

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                {/* <Home /> */}
                <HomeTwo />

            </div>
        </div>
    );
}

export default App;

// '@babel/plugin-proposal-private-property-in-object'