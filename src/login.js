import React, { useState, useEffect } from 'react' 

const config = {
}

function Login () {

    const [userInfo, setUserInfo] = useState({
        isUserLogedIn: false,
        user: null
    })
    
    useEffect(()=> {
        setUserInfo({
            isUserLogedIn: !!user,
            user:
        })
    },[])

    const { isUserLogedIn, user } = userInfo 


    const login = useCallback(() => {
        const     
    
    },[])


    const logout = useCallback(() => {
        setUserInfo({
            isUserLogedIn: false,
            user: null
        })    
    },[])

    return (

    )

}