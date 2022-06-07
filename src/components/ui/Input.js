// Imports
import React from "react";
import styled from "styled-components";

// Component
const Input = (props) => {

	// Variables
	const { isValid, id, label, type, name, value, onChangeHandler } = props;

	// Return
	return(
		<Wrapper className={ `control ${ !isValid ? 'invalid' : '' }` }>
			<label htmlFor={ id }>{ label }</label>
			<input type={ type } id={ id } name={ name }
				value={ value } onChange={ onChangeHandler }/>
		</Wrapper>
	);

}

// Styled
const Wrapper = styled.div`
	margin: 1rem 0;
	display: flex;
	align-items: stretch;
	flex-direction: column;
	label, input{
		display: block;
	}
	label{
		font-weight: bold;
		flex: 1;
		color: #464646;
		margin-bottom: 0.5rem;
	}
	input{
		flex: 3;
		font: inherit;
		padding: 0.35rem 0.35rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		&:focus{
			outline: none;
			border-color: #4f005f;
			background: #f6dbfc;
		}
	}
	&.invalid{
		input{
			border-color: red;
			background: #fbdada;
		}
	}
	@media only screen and (min-width:768px){
		align-items: center;
		flex-direction: row;
	}
`;

// Export
export default Input;