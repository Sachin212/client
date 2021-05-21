import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Label,Icon } from 'semantic-ui-react'
// import { FETCH_PROFILE_QUERY } from '../utils/graphql'

import MyPopup from '../utils/MyPopup'


function Follow({user, username , data: {data: {getProfile: {followedBy, followerCount}}}}){
    const [followed, setFollowedBy] = useState(false)
    // console.log(data.data)

    // let history = useHistory()

    useEffect(() => {
        if(user && followedBy.find(follow => follow.username === user.username)){
            setFollowedBy(true)
        }else{
            setFollowedBy(false)
        }
    }, [user, followedBy])

    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: { username }
    })

    const followButton = user ? (
        followed ? (
            <Button color='blue'>
                    <Icon name='add user' />
            </Button>
        ) : ( 
            <Button color='blue' basic>
                    <Icon name='add user' />
            </Button>
        ) 
    ): (
            <Button as={Link} to="/login" color='blue' basic>
                    <Icon name='add user' />
            </Button>
    )
    return(
        <Button as='div' labelPosition='right' onClick={followUser}>
            <MyPopup content={followed ? 'UnFollow' : 'Follow'}>
                {followButton}
            </MyPopup>
            <MyPopup content='Follower'>
                <Label basic color='blue' pointing='left'>
                    {followerCount}
                </Label>
            </MyPopup>
        </Button>
    )
}

// If response contains id it update cache automatically

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($username: String!){
        followUser(username: $username){
            id
            username
            followedBy{
                id
                username
            }
            followerCount
        }
    }
`

export default Follow