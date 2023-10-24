/*********************Custom Query Hook************************/

//import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
    //return axios.get('http://localhost:4000/superheroes');
    return request({ url: '/superheroes' })
}

const addSuperHero = (hero) => {
  //return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery(
        "super-heroes", 
        fetchSuperHeroes,
        {
          enabled: true,
          onSuccess: onSuccess,
          onError: onError,
          /*
          select: (data) => {
            const superHeroNames = data.data.map(hero => hero.name)
            return superHeroNames;
          },
          cacheTime: 600000,      // 10 minutes
          staleTime: 30000,       //30 seconds
          refetchOnMount: true,     // Possible values: true|false|"always"
          refetchOnWindowFocus: true,     // Possible values: true|false|"always"
          refetchInterval: 2000,      //Possible values: time(in milliseconds)|false
          refetchIntervalInBackground: true,
          */
        }      
        
      )
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  //useMutation unlike useQuery doesn't necessarily need a query key
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   //The code within the onSuccess function is executed as soon as the mutation succeeds.
      
    //   /*
    //       queryClient.invalidateQueries("super-heroes")

    //       1. when we invalidate a query, react query refetches the data for that query
    //       2. inValidateQueries does not work if the enabled is set to false of that query
    //       3. In onSuccess function, we automatically get the data in the response of the mutation, so instead of refetching a query by invalidating the query and wasting a network call for data that we already have in the response of the mutation, we can take advantage of the response data returned by the mutation function to immediately update the existing query with the new data.

    //       4. We can use setQueryData for it.
    //   */

    //   /*
    //     1. setQueryData is used to update the query cache
    //     2. the first argument is the query key that we want to update the cache for
    //     3. the second argument is a function, that automatically receives the OLD QUERY DATA
    //     4. Old Query Data refers to what currently present in the query cache
    //   */


    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // }

    /*Optimistic Updates Starts Here...*/
    onMutate: async (newHero) => {
      //onMutate is called before a mutation function is fired and it receives the same variables as parameters that our mutation function would receive. In this case, out mutation function (i.e. addSuperHero) receives new hero that we want to add

      /*First thing we will do is Cancelling any outgoing refetches so they dont override our optimistic updates
      This is done by using cancelQueries method on the queryClient instance
      */
      await queryClient.cancelQueries('super-heroes')

      /*Second thing we need to do is get hold of the current query data before we make any update. This will help us to roll back in case the mutation fails.
      To get hold of the current query data we use the geyQueryData method on the queryClient instance.
      */

      const previousHeroData = queryClient.getQueryData('super-heroes');

      /*Now we are all set to update the query data*/
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }]
        }
      })
      /*So we have now updated our list of heroes even before making the post request*/

      /*From this onMutate function, we are going to return an object with a key value set to previousHeroData*/
      return {
        previousHeroData,
      }
      /*This will help us to get back the data if the mutation fails*/

    },
    onError: (_error, _hero, context ) => {
      /*This function is called if the mutation encounters an error
      This function automatically receives three arguments:
      1. the error that was encountered (Note: if we dont need an arugument we can add an underscore before it)
      2. the second argument is the variables passed into the mutation which would be heroName and alterEgo and we dont need it either, so we have added an underscore.  
      3. the third argument is the context, which contains additional information pertaining to the mutation.
      And on the context Object, we can access the previousHeroData that we have returned from the onMutate callback and set it as the query data when there is a error.
      */
      queryClient.setQueryData('super-heroes', context.previousHeroData)

      /*So now if the mutation fails, we can roll back or get back our data*/
    },
    onSettled: () => {
      /*This function is called if the mutation is either successful or when it encounters an error.
      In this function all we have to do is refetch the super heroes.
      */

      queryClient.invalidateQueries('super-heroes')

      /*This will ensure the client state is in sync with the server state*/
    }
  });
}