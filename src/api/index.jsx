import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import Toast from '../components/Toast'

const API = axios.create({baseURL:'https://minifylink.cyclic.app'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userToken')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`
        req.headers.refresh = `Bearer ${JSON.parse(localStorage.getItem('refreshToken'))}`
    }
    return req
})

const checkExpired = async (err) => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (err?.response?.status === 401 && user) {
        await API.post('/auth/refresh', {
            email: user.email,
            id: user._id,
        })  
        .then(res => {
            console.log(res)
            localStorage.setItem('userToken', JSON.stringify(res?.data?.newAccess))  
            ReactDOM.render(<Toast>Token refreshed, Please reload</Toast>, document.getElementById('modal'))
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    } else {
        logout()
    }
}

export const auth = async (accessToken) => {
    await API.post('/auth/login', { googleAccessToken: accessToken })
    .then(res => {
        localStorage.setItem('userToken', JSON.stringify(res?.data?.token))
        localStorage.setItem('refreshToken', JSON.stringify(res?.data?.refresh))
        localStorage.setItem('userInfo', JSON.stringify(res?.data?.result))
    })
    .catch(err => console.log(err))
}

export const logout = () => {
    localStorage.clear()
    window.location.href = '/'
}

export const getLinks = async (email) => {
    let result = await API.post('/link/get', {email})
    .then(res => {
        return res?.data
    })
    .catch(err =>  checkExpired(err))
    return result
}

export const createLinks = async (ori, mini) => {
    await API.post('/link/create', {
        oriUrl: ori,
        id: mini,
    })
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(err => {
        checkExpired(err)
    })
}

export const updateLinks = async (ori, urlID, uID) => {
    await API.post('/link/update', {
        ori: ori,
        urlID: urlID,
        uID: uID,
    })
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(err => {
        checkExpired(err)
    })
}

export const removeOwner = async (uID) => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    await API.post('/link/removeowner', {
        uID: uID,
        email: user.email, 
    })
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(err => {
        checkExpired(err)
    })
}

