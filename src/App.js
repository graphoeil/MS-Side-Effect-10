// Imports
import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import { useAuthContext } from "./context/auth-context";

// Component
const App = () => {

	// Context
	const { user } = useAuthContext();

	// Return
	return(
		<React.Fragment>
			<Header/>
			{
				user.isLoggedIn ? <Home/> : <Login/>
			}
		</React.Fragment>
	);

};

// Export
export default App;