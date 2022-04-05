import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../base' 
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

//The rest of this file is creating a component that will allow the app to communicate this info to other components that are nested inside this one. 'children' is referring to those components nested inside.
export default function AuthProvider({children}){
    //Create hooks for currentUser and another custom hook to determine if the context has information to share with nested components and load thos components in after they have been given the info.
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true); 
    //Instantiate a GitHubAuthProvider object from Firebase
    const gitHubProvider = new GithubAuthProvider();

    async function login(){
        signInWithPopup(auth, gitHubProvider).then(authData => { 
            console.log(authData);
            setCurrentUser(authData.user)})
    }

async function logout(){
    signOut(auth).then(setCurrentUser(null))
}

//The object below will hold currentUser info, login, and logout, so we can use them in components as necessary.
    const value = { currentUser, login, logout };

    //uef => tab
    useEffect(() => {
        //authChange will use Firebase functionality to get user info, set the currentUser hook to the value retrieved, and allow the components to load in using the custom hook
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange;
    }, []);

    return(
        <AuthContext.Provider value={value}>
            {/* Below we are waiting for the AuthContext info to populate before loading the components in the UI */}
            {!loading && children}
        </AuthContext.Provider>
    )

}