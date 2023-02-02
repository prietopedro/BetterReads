// import all of your actions into this file, and export them back out. 
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose. 
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving. 
// Declare action TYPES at the top of the file

import React, {useState,createContext, useEffect} from "react";
import { getUserBooks, getUserShelves } from "../../api";
import useSessionStorage from "../../utils/useSessionStorage";

export const AppContext = createContext({});


function AppContextProvider({children}) {
    const [user, setUser] = useState({});
    const [books,setBooks] = useSessionStorage("books",[])
    const [favorites, setFavorites] = useSessionStorage("favorites",[])
    const [toBeRead, setToBeRead] = useSessionStorage("toBeRead",[])
    const [reading,setReading] = useSessionStorage("reading",[])
    const [finished,setFinished] = useSessionStorage("finished",[])
    const [bookshelves,setMyBookshelves] = useSessionStorage("bookshelves",[])
    const [refetch,setRefetch] = useState(0);

    const getBooks = async () => {
        const res = await getUserBooks();
        const shelves = await getUserShelves()
        console.log(res)
        setMyBookshelves(shelves.shelves)
        setBooks(res.books)
        setFavorites(res.books.filter((x) => x.favorited));
        setToBeRead(res.books.filter(
            (x) => x.status === "planned"
        ));
        setReading(res.books.filter(
            (x) => x.status === "reading"
        ));
        setFinished(res.books.filter(
            (x) => x.status === "finished"
        ));
    }
    useEffect(() => {
        if(user){
            getBooks();
        }
    }, [refetch, user])

    const value = {
        user,
        setUser,
        books,
        favorites,
        toBeRead,
        reading,
        finished,
        bookshelves,
        setBooks,
        setFavorites,
        setToBeRead,
        setReading,
        setFinished,
        setMyBookshelves,
        refetch, 
        setRefetch
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContextProvider;
