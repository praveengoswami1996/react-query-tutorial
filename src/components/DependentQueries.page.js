/* To understand the Dependent Queries, In Dependent Queries Page we are going to fetch the list of courses for the email "praveen@example.com" 

It will be done in two steps:
1. First, we query for the user whose email is "praveen@example.com"
2. Then using the channel ID associated with the user, we need to fire a second query and fetch the channel details where the ID matches the user's channel ID.
*/
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(
        ['user', email],
        () => fetchUserByEmail(email)
    )

    const channelId = user?.data.channelId;

    const { data: courses } = useQuery(
        ['courses', channelId],
        () => fetchCoursesByChannelId(channelId),
        {
            enabled: !!channelId, //Double negation converts a value to the boolean which enabled expects
        }
    )

    return (
        <div>
            {courses?.data.courses}
        </div>
    )
}

export default DependentQueriesPage;