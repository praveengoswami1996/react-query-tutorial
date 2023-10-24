import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes")
}

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends")
}

const ParallelQueriesPage = () => {

  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends)

  console.log(superHeroes);
  console.log(friends)

  return (
    <div>ParallelQueriesPage - Open Browser's console to see the results</div>
  )
}

export default ParallelQueriesPage;