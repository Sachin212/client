import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Image, Form, Button, Dropdown, Grid, Input } from 'semantic-ui-react'
import gql from 'graphql-tag'

function EditProfile(props){
    const Gender = [
        { key: 'M', value: 'M', text: 'Male' },
        { key: 'F', value: 'F', text: 'Female' },
        ]
    const [pic, setFile] = useState('')
    const [dob, setDob] = useState('')
    const [mobile, setMobile] = useState('')
    const [profileId, setProfileId] = useState({})
    const [gender, setGender] = useState('')
    const [temp, setTemp] = useState('https://react.semantic-ui.com/images/avatar/large/molly.png')
    const username = props.match.params.username

    const { loading, data } = useQuery(FETCH_PROFILE_QUERY, {
        variables: {
            username
        }
    })

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

    const [handleData, { error }] = useMutation(UPDATE_PROFILE_MUTATION, {
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_PROFILE_QUERY,
                variables:{
                    username
                }
            })

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

    const fileChange = (e) =>{
        setTemp(URL.createObjectURL(e.target.files[0]))
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
                            type="file"
                            onChange={fileChange}
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
