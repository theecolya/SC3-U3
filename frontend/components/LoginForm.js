import React, { useState } from 'react'
import PT from 'prop-types'
import { axiosWithAuth } from '../axios/index'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const navigate = useNavigate()
  // ✨ where are my props? Destructure them here
  

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value.trim() })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    axiosWithAuth().post('/login', {
      username: values.username,
      password: values.password
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      navigate('/articles')})
    .catch(err => console.log(err))
  }

  const isDisabled = () => {
    const userValue = values.username.trim().length
    const passValue = values.password.trim().length
    if (userValue >= 3 && passValue >= 8) {
      return false
    } else {
      return true
    }
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
