import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Dropdown } from 'semantic-ui-react'

function DropDown({onAvatar}){

    const { data: {getImages} = {} } = useQuery(FETCH_AVATAR_QUERY)

    let dropdown;

    if(!getImages){
        dropdown = <h1>hello</h1>
    }else{
        const imageOption = getImages.map((item) => ({
            key: item.id,
            value: item.value,
            image: {
                avatar: item.image.avatar,
                src: item.image.src
            }
        }))
        dropdown = (
            <Dropdown
                placeholder='Select Avatar'
                fluid
                selection
                options={imageOption}
                style={{marginBottom:10}}
                onChange={(event, { value }) => onAvatar(value)}
            />
        )
    }
    return dropdown
}

const FETCH_AVATAR_QUERY = gql`
    query getImages{
        getImages {
            id
            value
            image {
                avatar
                src
            }
        }
    } 
`

export default DropDown