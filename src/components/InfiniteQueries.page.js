import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

//useInfiniteQuery automatically injects a couple of values into the fetcher function, for.eg. pageParam,there are more..For our scenario we only need pageParam.
//Pageparam here kind of refers to the page number.
const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery(
        'colors', 
        fetchColors,
        {
            /* getNextPageParam will be used to change "pageParam" 
              getNextPageParam automatically/implicitly receives two parameters, "lastPage" & "pages"
              We do not need "lastPage" in our case thats why we have added an underscore before it.
              "pages" here refers to an array of API responses where each response corresponds to fetching two colors at a time. 

              Within the function, what we have to determine is how to increase the "pageParam" value.

              Since we have 8 colors and 2 colors per page, we have 4 pages in total.
            */
            getNextPageParam: (_lastPage, pages) => {
              if (pages.length < 4) {
                return pages.length + 1;
              } else {
                return undefined;
              }
            } 
            /* getNextPageParam give us a property called "hasNextPage" which will be true or false based on what you have returned from the getNextPageParam function. 
            We can destructure it from useInfiniteQuery.
            */
        }
    )
  
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  
  return (
    <>
        <div>
            {/* useInfiniteQuery return pages instead of data */}
            {data?.pages.map((group, index) => {
                return (
                    <Fragment key={index}>
                      {
                        group.data.map(color => (
                          <h2 key={color.id}>
                            {color.id} - {color.label}
                          </h2>
                        ))
                      }
                    </Fragment>
                )
            })}
        </div>
        <div>
          <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More</button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage ? "Fetching..." : null}
        </div>
    </>
  )
}

export default InfiniteQueriesPage;