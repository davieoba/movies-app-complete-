import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup, reset } from '../features/auth/auth-slice'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import styles from './register.module.css'
import Footer from '../components/Footer'
import signup_img from './../img/signup.svg'
import { unwrapResult } from '@reduxjs/toolkit'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, isSuccess, message } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleClick = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('clicked')
    if (formData.password !== formData.confirmPassword) {
      return toast.error('passwords do not match')
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.confirmPassword
    }

    try {
      const response = await dispatch(signup(userData))
      const data = unwrapResult(response)
      toast.success('registration successful')
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header text="register" />
      <div className="" id={styles.login_container}>
        <main id={styles.main}>
          <section id={styles.section_1}>
            <div id={styles.form_container}>
              <div id={styles.img_container}>
                {/* <img src={signup} id={styles.img} alt="signup" /> */}
              </div>
              <form
                action=""
                id={styles.form}
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <img src={signup_img} id={styles.signup_img} />
                <h1>Register</h1>
                <input
                  type="text"
                  placeholder="Firstname"
                  name="firstName"
                  onChange={handleClick}
                  value={formData.firstName}
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  name="lastName"
                  onChange={handleClick}
                  value={formData.lastName}
                />
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={handleClick}
                  value={formData.email}
                />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleClick}
                  value={formData.password}
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  onChange={handleClick}
                  value={formData.confirmPassword}
                />
                <div id={styles.button_box}>
                  <button type="submit" id={styles.button}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Register
