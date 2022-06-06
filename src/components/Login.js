// Imports
import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import Button from "./ui/Button";

// Component
const Login = ({ onLogin }) => {

	// Reducer
	const initialState = {
		email:'', isEmailValid:false,
		password:'', isPasswordValid:false,
		isFormValid:false
	};
	const reducerFunction = (state, action) => {
		if (action.type === 'USER_INPUT'){
			const { name, value } = action.payload.target;
			return { ...state, [name]:value };
		}
		if (action.type === 'CHECK_VALIDITY'){
			const { isEmailValid, isPasswordValid, isFormValid } = action.payload;
			return { ...state, isEmailValid, isPasswordValid, isFormValid };
		}
		throw new Error(`No action types match ${ action.type }`);
	};
	const [state, dispatch] = useReducer(reducerFunction, initialState);

	// Input change
	const handleChange = (e) => {
		dispatch({ type:'USER_INPUT', payload:e });
	};

	// Validation
	useEffect(() => {
		const isEmailValid = state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		const isPasswordValid = state.password.trim().length >= 5;
		const isFormValid = isEmailValid && isPasswordValid;
		// Debouncing with timer (like autoCompletion limitation)
		const timerChange = setTimeout(() => {
			dispatch({ type:'CHECK_VALIDITY', payload:{ isEmailValid, isPasswordValid, isFormValid } });
		},500);
		// Clean function run before every new side effect 
		// (here changes in formData.email or password)
		// and before the component unmount
		return () => {
			clearTimeout(timerChange);
		};
	},[state.email, state.password]);

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		onLogin(state.email, state.password);
	};

	// Return
	return(
		<Wrapper className="shadowBoxed" onSubmit={ submitForm }>

			{/* Email */}
			<div className={ `control ${ !state.isEmailValid ? 'invalid' : '' }` }>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email"
					value={ state.email } onChange={ handleChange }/>
			</div>
			{/* Email */}

			{/* Password */}
			<div className={ `control ${ !state.isPasswordValid ? 'invalid' : '' }` }>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" 
					value={ state.password } onChange={ handleChange }/>
			</div>
			{/* Password */}

			{/* Button */}
			<div className="actions">
				<Button type="submit" disabled={ !state.isFormValid }>
					Login
				</Button>
			</div>
			{/* Button */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.form`
	width: 90%;
	max-width: 40rem;
	margin: 200px auto;
	padding: 2rem;
	.control{
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
	}
	.actions{
		text-align: center;
	}
`;

// Export
export default Login;