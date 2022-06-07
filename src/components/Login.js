// Imports
import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import Button from "./ui/Button";
import { useAuthContext } from "../context/auth-context";
import Input from "./ui/Input";

// Component
const Login = () => {

	// Context
	const { login } = useAuthContext();

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
		throw new Error(`No action type match ${ action.type }`);
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
		// Debouncing with timer (like autoComplete limitation)
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
		login(state.email, state.password);
	};

	// Return
	return(
		<Wrapper className="shadowBoxed" onSubmit={ submitForm }>

			{/* Email */}
			<Input isValid={ state.isEmailValid } label="Email" id="email" type="email" 
				name="email" value={ state.email } onChangeHandler={ handleChange }/>
			{/* Email */}

			{/* Password */}
			<Input isValid={ state.isPasswordValid } label="Password" id="password" type="password" 
				name="password" value={ state.password } onChangeHandler={ handleChange }/>
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
	.actions{
		text-align: center;
	}
`;

// Export
export default Login;