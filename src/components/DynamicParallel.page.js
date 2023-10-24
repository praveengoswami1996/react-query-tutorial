import { useQueries } from "react-query";
import axios from "axios";

//fetches data of single superhero
const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
const DynamicParallelPage = ({ heroIds }) => {
  
    //useQueries returns an array of query results
  const queryResults = useQueries(
    heroIds.map(id => {
        return {
            queryKey: ['super-hero', id],
            queryFn: () => fetchSuperHero(id)
        }
    })
  )
  
  console.log({ queryResults })

  return (
    <div>DynamicParallelPage - Open browser's console to see the results</div>
  )
}

export default DynamicParallelPage;