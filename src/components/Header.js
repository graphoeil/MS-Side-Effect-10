// Imports
import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

// Component
const Header = () => {

	// Return
	return(
		<Wrapper>
			<h1>A typical page</h1>
			<Navigation/>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #741188;
	padding: 0 2rem;
	h1{
		color: white;
	}
`;


// Export
export default Header;