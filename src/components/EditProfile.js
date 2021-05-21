import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Form, Button, Dropdown } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { FETCH_PROFILE_QUERY } from '../utils/graphql'

import DropDown from './DropDown'

// import { app } from '../storage/base'

function EditProfile(props){
    const username = props.match.params.username

    const Gender = [
        { key: 'M', value: 'M', text: 'Male' },
        { key: 'F', value: 'F', text: 'Female' },
        ]
    
    // const { loading, data } = useQuery(FETCH_PROFILE_QUERY, {
    //     variables: {
    //         username
    //     }
    // })

    const [pic, setFileUrl] = useState('')
    const [dob, setDob] = useState('')
    const [mobile, setMobile] = useState('')
    // const [profileId, setProfileId] = useState({})
    const [gender, setGender] = useState('')

    const onDobChange = (event) =>{
        setDob({...dob, [event.target.name]: event.target.value})
        // setProfileId(data.getProfile.id)
    }

    const onMobileChange = (event) =>{
        setMobile({...mobile, [event.target.name]: event.target.value})
        // setProfileId(data.getProfile.id)
    }

    const onGenderChange = (event, {value}) =>{
        setGender({...gender, gender: value})
        // setProfileId(data.getProfile.id)
    }

    const [handleData, { error }] = useMutation(UPDATE_PROFILE_MUTATION, {
        update(proxy, result){

            proxy.writeQuery({
                query: FETCH_PROFILE_QUERY,
                data: {
                    getProfile: result.data.editProfile
                }
            })
            props.history.push(`../profile/${username}`)
        },
        variables: {
            mobile: mobile.mobile,
            dob: dob.dob,
            pic: pic,
            gender: gender.gender
        }
    })

    const onSubmit = (e) =>{
        e.preventDefault()
        handleData()
    }

    return (
    <>
        {
        // loading ? (
        //     <h1>loading profile...</h1>
        // ) :
        //  (
            <Form onSubmit={onSubmit}>
            <Form.Field>
                <DropDown onAvatar={(pic) => setFileUrl(pic)} />

                <Form.Input
                    label="DOB"
                    placeholder="DOB"
                    name="dob"
                    type="date"
                    onChange={onDobChange}
                    error={error ? "Enter a Date Of Birth" : false}
                />
                <Form.Input
                    label="Mobile"
                    placeholder="MOBILE"
                    name="mobile"
                    onChange={onMobileChange}
                    error={error ? "Enter correct Mobile number" : false}
                    maxLength="10"
                    minLength="10"
                />
                <Dropdown
                    placeholder='Gender'
                    selection
                    fluid
                    options={Gender}
                    style={{marginBottom:10}}
                    onChange={onGenderChange}
                />
                <Button color="teal" type="submit">
                    Submit
                </Button>
            </Form.Field>
            </Form>
        // )
        }
    </>
    )
}

const UPDATE_PROFILE_MUTATION = gql`
    mutation editProfile($mobile: String, $dob: String, $pic: String, $gender: String){
        editProfile(mobile: $mobile, dob: $dob, pic: $pic, gender: $gender){
            id
            mobile
            dob
            pic
            gender
        }
    }
`

export default EditProfile