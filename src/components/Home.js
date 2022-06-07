// Imports
import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/auth-context";

// Component
const Home = () => {

	// Context
	const { user } = useAuthContext();

	// Return
	return(
		<Wrapper className="shadowBoxed">
			<h1>Welcome back <span>{ user.userName }</span> !</h1>
			<h2>Your password is <span>{ user.password }</span></h2>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	width: 90%;
	max-width: 40rem;
	padding: 3rem;
	margin: 200px auto;
	text-align: center;
	h1{
		span{
			color: #2980b9;
		}
	}
	h2{
		span{
			color: #c0392b;
		}
	}
`;

// Export
export default Home;