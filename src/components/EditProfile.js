import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Form, Button, Dropdown } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { FETCH_PROFILE_QUERY } from '../utils/graphql'

// import { app } from '../storage/base'

function EditProfile(props){
    const username = props.match.params.username

    const Gender = [
        { key: 'M', value: 'M', text: 'Male' },
        { key: 'F', value: 'F', text: 'Female' },
        ]
    
    const imageOption = [
        {
            key: 'J',
            value: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fdaniel.jpg?alt=media',
            image: { avatar: true, src: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fdaniel.jpg?alt=media' },
        },
        {
            key: 'E',
            value: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Felliot.jpg?alt=media',
            image: { avatar: true, src: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Felliot.jpg?alt=media' },
        },
        {
            key: 'SF',
            value: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fjenny.jpg?alt=media',
            image: { avatar: true, src: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fjenny.jpg?alt=media' },
        },
        {
            key: 'C',
            value: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fmatthew.png?alt=media',
            image: { avatar: true, src: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fmatthew.png?alt=media' },
        },
        {
            key: 'M',
            value: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fmolly.png?alt=media',
            image: { avatar: true, src: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fmolly.png?alt=media' },
        },
        {
            key: 'T',
            value: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fsteve.jpg?alt=media',
            image: { avatar: true, src: 'https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/User%2Fsteve.jpg?alt=media' },
        },
        ]

    const { loading, data } = useQuery(FETCH_PROFILE_QUERY, {
        variables: {
            username
        }
    })

    const [pic, setFileUrl] = useState('')
    const [dob, setDob] = useState('')
    const [mobile, setMobile] = useState('')
    const [profileId, setProfileId] = useState({})
    const [gender, setGender] = useState('')

    const onDobChange = (event) =>{
        setDob({...dob, [event.target.name]: event.target.value})
        setProfileId(data.getProfile.id)   
    }

    const onMobileChange = (event) =>{
        setMobile({...mobile, [event.target.name]: event.target.value})
        setProfileId(data.getProfile.id)
    }

    const onGenderChange = (event, {value}) =>{
        setGender({...gender, gender: value})
        setProfileId(data.getProfile.id)
    }

    const onPicChange = (event, { value }) => {
        setFileUrl({...pic, pic: value})
        setProfileId(data.getProfile.id)
    }

    const [handleData, { error }] = useMutation(UPDATE_PROFILE_MUTATION, {
        update(proxy, result){

            proxy.writeQuery({
                query: FETCH_PROFILE_QUERY,
                data: {
                    getProfile: result.data.editProfile
                }
            })
            props.history.push('/')
        },
        variables: {
            profileId,
            mobile: mobile.mobile,
            dob: dob.dob,
            pic: pic.pic,
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
        loading ? (
            <h1>loading profile...</h1>
        ) : (
            <Form onSubmit={onSubmit}>
            <Form.Field>
                <Dropdown
                    placeholder='Select Avatar'
                    fluid
                    selection
                    options={imageOption}
                    style={{marginBottom:10}}
                    onChange={onPicChange}
                />
                <Form.Input
                    label="DOB"
                    placeholder="DOB"
                    name="dob"
                    type="date"
                    onChange={onDobChange}
                    error={error ? true : false}
                />
                <Form.Input
                    label="Mobile"
                    placeholder="MOBILE"
                    // type="number"
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
        )
        }
    </>
    )
}

const UPDATE_PROFILE_MUTATION = gql`
    mutation editProfile($profileId: ID!, $mobile: String!, $dob: String!, $pic: String!, $gender: String!){
        editProfile(profileId: $profileId, mobile: $mobile, dob: $dob, pic: $pic, gender: $gender){
            id
            mobile
            dob
            pic
            gender
        }
    }
`

export default EditProfile
