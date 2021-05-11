import React , { useContext } from 'react'
import {Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'

import LikeButton from './LikeButton'
import { AuthContext } from '../context/auth'
import DeleteButton from './DeleteButton'
import MyPopup from '../utils/MyPopup'

const PostCard = ({post: {body, createdAt, username, id, likeCount, commentCount, likes }}) =>{
    const { user } = useContext(AuthContext)
    // console.log(userId)

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/Screenshot%20(72).png?alt=media'
                />
                <Card.Header as={Link} to={`/profile/${username}`}>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}} />
                <MyPopup 
                    content="Comment on post"
                >
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} /> }
            </Card.Content>
        </Card>
    )
}

export default PostCard;