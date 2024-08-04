// In this file, we are creating our own custom Hook that fetches data.
//      Note: Custom Hook in react needs to start with the word `use` or it won't work.
//      This in-turn makes the useFetch file/Hook reusable in any part of our program...
import { useState, useEffect } from 'react'
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // The `useEffect` Hook simply means only ever fire the function inside of it once,
    // on the initial render and not whenever the data changes.
    // The 'isPending' useState is to Simulate what it would feel like when your page
    // has to load before the data is displayed. This should not be practiced or used in a real time program.  
    useEffect(() => {
        // When we navigate away from the homepage while data is still being fetched, 
        // it can cause an error due to state updates on an unmounted component. 
        // To prevent this, we use the cleanup function in useEffect and an AbortController 
        // to cancel the fetch request if the component unmounts.
        const abortCont = new AbortController()
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log("fetch aborted")
                    } else {
                        setError(err.message)
                        setIsPending(false)
                    }

                })
        }, (1000))
        return () => abortCont.abort();

    }, [url]) // We pass in the url as a dependency, so that whenever the url changes the function 
    // gets rerun
    return ({ data, isPending, error });
}

export default useFetch;