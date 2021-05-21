import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
query getPosts{
    getPosts {
        id body createdAt username likeCount
        likes{
            username
        }
        commentCount
        comments{
            id username createdAt body
        }
    }
}
`

export const FETCH_PROFILE_QUERY = gql`
query getProfile($username: String!){
    getProfile(username: $username){
        id
        dob
        pic
        mobile
        followedBy{
            id
            username
        }
        followerCount
    }
}
`