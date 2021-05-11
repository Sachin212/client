import { useQuery } from '@apollo/react-hooks'
import React, { useContext } from 'react'
import { Card, Grid, Icon, Image, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import MyPopup from '../utils/MyPopup'
import { Link } from 'react-router-dom'

const Profile = (props) =>{
    const username = props.match.params.username
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_PROFILE_QUERY, {
        variables:{
            username
        }
    })

    return(
        <>
        {
            loading ? (
                <h1>loading profile...</h1>
            ) : (
                <>
                <Grid>
                    <Grid.Column width={4}>
                    <Image 
                    src = {
                        data.getProfile.pic === "false" ? 'https://react.semantic-ui.com/images/avatar/large/molly.png' : data.getProfile.pic
                    }
                    />
                    <Card fluid centered raised>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        {data.getProfile.dob === "false" ? "" : (
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{moment(data.getProfile.dob).format("DD-MMM-YYYY")}</Card.Header>
                                </Card.Content>
                            </Card>
                        )}
                        {data.getProfile.mobile === "false" ? "" : (
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{data.getProfile.mobile}</Card.Header>
                                </Card.Content>
                            </Card>
                        )}
                        {data.getProfile.pic === "false" ? "" : (
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{data.getProfile.pic}</Card.Header>
                                </Card.Content>
                            </Card>
                        )}
                        
                    </Grid.Column>
                </Grid>

                { user && user.username === username &&
                    <>
                        <MyPopup content="Edit profile">
                            <Button
                                floated="right"
                                as={Link} to={`/editprofile/${username}`}
                            >
                                <Icon name="edit" style={{margin:0}} />
                            </Button>
                        </MyPopup>
                    </>
                }
                </>
            )
        }
        </>
    )
}

const FETCH_PROFILE_QUERY = gql`
query($username: String!){
    getProfile(username: $username){
        id
        dob
        mobile
        pic
    }
}
`

export default Profile