import Navbar from './Navbar';
// import Home from './01-Home';
// import SecondHome from './02-Home'
// import ThirdHome from './03-Home';
// import FourthHome from './04-Home';
// import FifthHome from './05-Home';
import SixthHome from './06-Home';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                {/* <Home /> */}
                {/* <SecondHome /> */}
                {/* <ThirdHome /> */}
                {/* <FourthHome /> */}
                {/* <FifthHome /> */}
                <SixthHome />


            </div>
        </div>
    );
}

export default App;

// '@babel/plugin-proposal-private-property-in-object'