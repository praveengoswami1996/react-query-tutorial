import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
}

const RQSuperHeroesPage = () => {
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
      "super-heroes", 
      fetchSuperHeroes,
      {
        enabled: false,
        /*
        cacheTime: 600000,      // 10 minutes
        staleTime: 30000,       //30 seconds
        refetchOnMount: true,     // Possible values: true|false|"always"
        refetchOnWindowFocus: true,     // Possible values: true|false|"always"
        refetchInterval: 2000,      //Possible values: time(in milliseconds)|false
        refetchIntervalInBackground: true,
        */
      }      
      
    )

    console.log(isLoading, isFetching);

    if (isLoading || isFetching) {
      return <h2>Loading...</h2>
    }

    if (isError) {
      return <h2>{error.message}</h2>
    }

    return (
      <>
        <h2>RQ Super Heroes Page</h2>
        <button onClick={refetch}>Fetch SuperHeroes</button>
        {
          data?.data.map((hero) => {
            return <div key={hero.name}>{hero.name}</div>
          })
        }
      </>
    )
  }
  
export default RQSuperHeroesPage;