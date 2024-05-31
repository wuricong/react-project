import {useState, useEffect} from "react";

const useLocalStorage = (key: string, defaultValue: string) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : defaultValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}


export {useLocalStorage}
