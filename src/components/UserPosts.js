import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { Card } from 'semantic-ui-react'
import moment from 'moment'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

const UserPosts = ({username}) =>{
    
    const { loading, data } = useQuery(FETCH_USER_POSTS, {
        variables:{
            username
        }
    })

    return(
        <>
        {
            loading ? (
                <h1>Getting Posts</h1>
            ) : (
                <>
                
                {
                    data.getUserPost.length > 0 && data.getUserPost.map(post => (
                        <Card fluid key={post.id}>
                            <Card.Content>
                                <Card.Meta as={Link} to={`../posts/${post.id}`}>{moment(post.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{post.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))
                }
                </>
            )
        }
        </>
    )
}

const FETCH_USER_POSTS = gql`
    query getUserPost($username: String!){
        getUserPost(username: $username){
            id
            body
            createdAt
        }
    }
`

export default UserPosts