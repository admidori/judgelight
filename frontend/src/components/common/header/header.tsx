import React from 'react'
import Menu from './menu'
import Login from './login'
import ContestTitle from './title'

export default function Header() {
    return (
        <div>
            <Login />
            <ContestTitle />
            <Menu />
        </div>
    )
}
