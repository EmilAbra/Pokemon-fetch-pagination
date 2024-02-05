import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, { cancelToken: new axios.CancelToken(c => {
      return cancel = c;
    })}).then((response) => {
      setLoading(false);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
      setPokemon(response.data.results.map(p => {
        return p.name;
      }))
    })

    return () => cancel();
  }, [currentPageUrl])

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
