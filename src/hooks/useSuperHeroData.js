import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`)
// }

const fetchSuperHero = ({ queryKey }) => {
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient();

    return useQuery(
        ['super-hero', heroId], //It will maintain separate query for each hero 
        //() => fetchSuperHero(heroId),
        fetchSuperHero,
        {
            //How to set Initial Query Data
            initialData: () => {
                const hero = queryClient.getQueryData("super-heroes")?.data?.find((hero) => hero.id === parseInt(heroId))

                if(hero) {
                    return { data:hero }
                } else {
                    return undefined
                }
            }
        }
    );
}

/*
    Here, above we have passed an array for generating query keys.
    The first thing in the array is query key name.
    And the second thing is the dynamic heroId.    
    This is because this query is dependent on the heroId.
    So if we provide only 'super-hero' as query key then the cached value
    of heroId=1 would be used for heroId=2, heroId=3 and so on.
*/