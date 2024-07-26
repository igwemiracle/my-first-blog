// In this file, we are creating our own custom Hook that fetches data.
//      Note: Custom Hook in react needs to start with the word `use` or it won't work.
//      This in-turn makes the useFetch file/Hook reusable...
import { useState, useEffect } from 'react'
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // This simply means only ever fire the function once on the initial render
    //  and not whenever the data changes.
    useEffect(() => {
        // This is just to Simulate what it would feel like when your page has to load before the
        //   data is displayed. This should not be practiced or used in a real time program.
        setTimeout(() => {
            fetch(url)
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
                    setError(err.message)
                    setIsPending(false)
                })
        }, (2000))

    }, [url]) // We pass in the url as a dependency, so that whenever the url changes the function 
    // gets rerun
    return ({ data, isPending, error });
}

export default useFetch;