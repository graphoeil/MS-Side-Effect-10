// Imports
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./ui/Button";

// Component
const Login = ({ onLogin }) => {

	// State
	const [formData, setFormData] = useState({
		email:'', isEmailValid:true,
		password:'', isPasswordValid:true,
		isFormValid:false
	});

	// Input change
	const handleChange = (e) => {
		setFormData((oldState) => {
			return {
				...oldState,
				[e.target.name]:e.target.value
			};
		});
	};

	// Validation
	useEffect(() => {
		const isEmailValid = formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		const isPasswordValid = formData.password.trim().length >= 5;
		const isFormValid = isEmailValid && isPasswordValid;
		// Debouncing with timer (like autoCompletion limitation)
		const timerChange = setTimeout(() => {
			setFormData((oldState) => {
				return {
					...oldState,
					isEmailValid, isPasswordValid, isFormValid
				};
			});
		},500);
		// Clean function run before every new side effect 
		// (here changes in formData.email or password)
		// and before the component unmount
		return () => {
			clearTimeout(timerChange);
		};
	},[formData.email, formData.password]);

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		onLogin(formData.email, formData.password);
	};

	// Return
	return(
		<Wrapper className="shadowBoxed" onSubmit={ submitForm }>

			{/* Email */}
			<div className={ `control ${ !formData.isEmailValid ? 'invalid' : '' }` }>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email"
					value={ formData.email } onChange={ handleChange }/>
			</div>
			{/* Email */}

			{/* Password */}
			<div className={ `control ${ !formData.isPasswordValid ? 'invalid' : '' }` }>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" 
					value={ formData.password } onChange={ handleChange }/>
			</div>
			{/* Password */}

			{/* Button */}
			<div className="actions">
				<Button type="submit" disabled={ !formData.isFormValid }>
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