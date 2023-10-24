import { useSuperHeroesData, useAddSuperHeroData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from 'react';


const RQSuperHeroesPage = () => {
    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');

    //This function will be called when the query successfully fetches data
    const onSuccess = (data) => {
      console.log("Perform side effect after data fetching", data)
    }

    //This function will be called when the query encounters an error while trying to fetch the data. 
    const onError = (error) => {
      console.log("Perform side effect after encountering error", error)
    } 

    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError) 

    //console.log(data);
    //console.log(isLoading, isFetching);

    const { mutate: addHero } = useAddSuperHeroData();

    const handleAddHeroClick = () => {
      const hero = { name, alterEgo }
      addHero(hero);
    }

    if (isLoading || isFetching) {
      return <h2>Loading...</h2>
    }

    if (isError) {
      return <h2>{error.message}</h2>
    }

    return (
      <>
        <h2>RQ Super Heroes Page</h2>
        <div>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="text"
            value={alterEgo}
            onChange={(e) => setAlterEgo(e.target.value)}
          />
          <button onClick={handleAddHeroClick}>Add Hero</button>
        </div>
        <button onClick={refetch}>Fetch SuperHeroes</button>
        {
          data?.data.map((hero) => {
            return <div key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
          })
        }
        {
          //data below is basically the superHeroNames array from select configuration
          // data?.map((heroName) => {
          //   return <div key={heroName}>{heroName}</div>
          // })
        }
      </>
    )
  }
  
export default RQSuperHeroesPage;