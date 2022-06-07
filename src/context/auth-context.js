// Imports
import React, { useContext, useState, useEffect } from "react";

// Context
const AuthContext = React.createContext();

// Provider
const AuthProvider = ({ children }) => {

	// Variables
	const [user, setUser] = useState({
		isLoggedIn:false,
		userName:'',
		password:''
	});

	// Local storage ?
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('MS-10-isLoggedIn'));
		if (storedUser){
			if (storedUser.userName){
				const userName = storedUser.userName.split('@')[0];
				setUser({ userName:userName, password:storedUser.password, isLoggedIn:true });
			}
		}
	},[]);

	// Methods
	const login = (email, password) => {
		const userName = email.split('@')[0];
		// Udapte state
		setUser({ userName, password, isLoggedIn:true });
		// Local storage
		localStorage.setItem('MS-10-isLoggedIn', JSON.stringify({ userName:email, password, isLoggedIn:true }));
	};
	const logout = () => {
		localStorage.removeItem('MS-10-isLoggedIn');
		setUser({ userName:'', password:'', isLoggedIn:false });
	};

	// Return
	return <AuthContext.Provider value={ {
		user, login, logout
	} }>{ children }</AuthContext.Provider>

};

// Custom hooks
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// Provider export
export { AuthProvider };