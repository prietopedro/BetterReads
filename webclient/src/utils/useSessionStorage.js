import { useEffect, useState } from "react";

function getSavedValue(key,initialValue){
    const savedValue = JSON.parse(sessionStorage.getItem(key)) || initialValue;
    if(savedValue instanceof Function) return initialValue();
    return savedValue
}
const useSessionStorage = (key, initialValue) => {
    const [value,setValue] = useState(() => getSavedValue(key,initialValue));

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    },[value])

    return [value,setValue]
}

export default useSessionStorage
