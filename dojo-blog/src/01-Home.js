import { useState } from "react";

const Home = () => {
    // const name = 'Jake';
    const [name, setName] = useState('Jake');
    const [age, setAge] = useState(25);

    const handleClick = () => {
        // console.log("Hello, World!");
        setName("Miracle");
        setAge(30);
    }
    //What happens when we want our button to print our name when we click it.
    // what happens when we want to pass a parameter to our function. For example;

    const handleClickAgin = (name) => {
        console.log("Welcome " + name + " to our Homepage!");

    }

    return (
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>click me</button>
            <p>{name} is {age} years old</p>
            {/* We can only use a parameter when we wrap it in an Anonymous function  */}
            <button onClick={() => { handleClickAgin("Victor") }}>clickMeAgain</button>

        </div>
    );
}


export default Home;