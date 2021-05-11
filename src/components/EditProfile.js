import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Image, Form, Button, Dropdown, Grid, Input } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { app } from '../storage/base'

function EditProfile(props){
    const username = props.match.params.username

    const Gender = [
        { key: 'M', value: 'M', text: 'Male' },
        { key: 'F', value: 'F', text: 'Female' },
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
    const [temp, setTemp] = useState('')

    loading ? setTemp(data.getProfile.pic) : console.log('')

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

    const onPicChange = async (event) => {
        setTemp(URL.createObjectURL(event.target.files[0]))
        const file = event.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()
        setFileUrl({...pic, pic: fileUrl})
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
        loading ? (
            <h1>loading profile...</h1>
        ) : (
            <Form onSubmit={onSubmit}>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Image
                            fluid
                            style={{marginBottom: 10}}
                            src={temp}
                        />
                        <Input
                            name="pic"
                            type="file"
                            onChange={onPicChange}
                        />
                    </Grid.Column>
                </Grid>
            <Form.Field>
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
                    name="mobile"
                    onChange={onMobileChange}
                    error={error ? true : false}
                    maxLength="10"
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

const FETCH_PROFILE_QUERY = gql`
query($username: String!){
    getProfile(username: $username){
        id
        dob
        pic
        mobile
    }
}
`
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
