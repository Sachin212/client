import React, { useContext, useState } from 'react'
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const Register = (props)=>{
    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    
    const {onChange, onSubmit, value} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data: { register: userData }}){
            context.login(userData)
            props.history.push('/')
        },
        onError(err){
            // console.log(err.graphQLErrors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: value
    })

    function registerUser(){
        addUser()
    }

    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={value.username}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={value.email}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={value.password}
                    onChange={onChange}
                />
                <Form.Input 
                    label="ConfirmPassword"
                    placeholder="ConfirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={value.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value =>(
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;