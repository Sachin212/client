import React, { useContext } from 'react'
import {useQuery} from '@apollo/react-hooks'
import { Grid, Transition } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'

import { FETCH_POSTS_QUERY } from '../utils/graphql'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

const Home = ()=>{
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return(
        <Grid columns={1} centered>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column width={10} style={{marginBottom: 10}}>
                        <PostForm />
                    </Grid.Column>
                ) }
                {loading ? (
                    <h1>loading posts...</h1>
                ) : (
                    <Transition.Group>
                        {
                            data.getPosts.length > 0 && data.getPosts.map(post=> (
                                <Grid.Column width={14} key={post.id} style={{marginBottom: 20}}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))
                        } 
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home;