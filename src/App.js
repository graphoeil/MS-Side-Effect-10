// Imports
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

// Component
const App = () => {

	// State
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({
		userName:'',
		password:''
	});

	// Local storage ?
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('MS-10-isLoggedIn'));
		if (storedUser){
			if (storedUser.userName){
				const userName = storedUser.userName.split('@')[0];
				setIsLoggedIn(true);
				setUser({ userName:userName, password:storedUser.password });
			}
		}
	},[]);

	// Login
	const loginHandler = (email, password) => {
		const userName = email.split('@')[0];
		// Udapte state
		setUser({ userName, password });
		setIsLoggedIn(true);
		// Local storage
		localStorage.setItem('MS-10-isLoggedIn', JSON.stringify({ userName:email, password }));
	};

	// Logout
	const logoutHandler = () => {
		localStorage.removeItem('MS-10-isLoggedIn');
		setUser({ userName:'', password:'' });
		setIsLoggedIn(false);
	};

	// Return
	return(
		<React.Fragment>
			<Header isAuthenticated={ isLoggedIn } onLogout={ logoutHandler }/>
			{
				isLoggedIn ? <Home user={ user }/> : <Login onLogin={ loginHandler }/>
			}
		</React.Fragment>
	);

};

// Export
export default App;