import { FC, useEffect, useState, FormEvent } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useResponsiveViewports from "../../components/useResponsiveViewports";
import useRecaptcha from "../../components/reCAPTCHA";
import { validateEmail, validateName, validatePassword, validatePhone } from "../../components/InputValidations";
import { useSpring, animated } from "react-spring";
import "./SignInUp.scss";
const env = import.meta.env;

const SignInAndRecovery: FC = () => {
	const isViewport740 = useResponsiveViewports(740);
	const { recaptchaRef, recaptchaValue } = useRecaptcha();
	const [title, setTitle] = useState("Sign In");
	const [passwordPage, setPasswordPage] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [resetErrorMessage, setResetErrorMessage] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	
	useEffect(() => {
		// this is responsible for the page background
		{!isViewport740 ? (
			document.body.style.background =
				"radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url('/images/new_login_bg_strong_mask.jpg') center top no-repeat, #181A21"
		) : (
			document.body.style.background = 
				"radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url( '/images/new_login_bg_strong_mask_mobile.jpg' ) center top no-repeat, #181A21"
		)}
		
		// this is responsible for the tab title
		document.title = `Sign In`;
	}, [isViewport740]);

	// Handle redirect to password reset page
	useEffect(() => {
		if (window.location.pathname.includes('/reset-password')) {
			setPasswordPage(true);
			setTitle("Name / Password Recovery")
			document.querySelector('.signin-form')?.remove();
			document.querySelector('.forgot-my-password')?.classList.add('active');
			(document.querySelector('.signin-title .title') as HTMLElement).style.margin = 'auto';
			isViewport740 && ((document.querySelector('.login-form-container') as HTMLElement).style.width = 'max-content');
		}
	}, [isViewport740]);

	// Toggle the state when the div is clicked
	const handleRememberMeClick = () => {
		setIsChecked(!isChecked);
	};

	// amimation of the "forgot-my-password" section
	const springProps = useSpring({
		opacity: showForgotPassword ? 1 : 0,
		width: showForgotPassword ? "295px" : "0",
		paddingLeft: showForgotPassword ? "14px" : "0px",
		marginLeft: showForgotPassword ? "14px" : "0px",
		overflow: "hidden",
	});
	const springProps740 = useSpring({
		opacity: showForgotPassword ? 1 : 0,
		height: showForgotPassword ? "280.5px" : "0",
		paddingTop: showForgotPassword ? "14px" : "0px",
		marginTop: showForgotPassword ? "14px" : "0px",
		overflow: "hidden",
	});

	// Toggle the visibility of the "forgot-my-password" section
	const handleForgotPasswordClick = () => {
		setShowForgotPassword((prevShowForgotPassword) => !prevShowForgotPassword);
	};

	const authenticateUser = async (accountName: string, password: string) => {
		try {
			const response = await fetch(`${env.VITE_BACKEND_API_URL}/authenticate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ accountName, password }),
			});
	
			if (response.ok) {
				const result = await response.json();
				return result.isAuthenticated;
			} else {
				console.error('Error during authentication:', response.statusText);
				return false;
			}
		} catch (error) {
			console.error('Error during authentication:', error);
			return false;
		}
	};

	const handleFormSubmit = async (event: { preventDefault: () => void; currentTarget: { querySelector: (arg0: string) => HTMLInputElement; }; }) => {
		event.preventDefault();
	
		const accountNameInput = event.currentTarget.querySelector('#field-input-account') as HTMLInputElement;
		const passwordInput = event.currentTarget.querySelector('#field-input-password') as HTMLInputElement;

		if (!validateName(accountNameInput.value) || !validatePassword(passwordInput.value) ) {
			setErrorMessage("Please provide a valid name and password");
			return;
		}
	
		const accountName = accountNameInput.value;
		const password = passwordInput.value;
		const rememberMeValue = isChecked;
	
		try {
			setErrorMessage("");
			setIsLoading(true);
			const isAuthenticated = await authenticateUser(accountName, password);
	
			if (isAuthenticated) {
				console.log('Authentication successful');
				const formData = {
					accountName,
					password,
					rememberMe: rememberMeValue,
				};
		
				// Make a POST request to your backend
				const response = await fetch(`${env.VITE_BACKEND_API_URL}/submitForm`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});
		
				if (response.ok) {
					// Handle success, e.g., show a success message
					console.log('Form submitted successfully');
				} else {
					// Handle errors, e.g., show an error message
					console.error('Error submitting form:', response.statusText);
				}
			} else {
				console.error('Authentication failed');
				setErrorMessage("Authentication failed, Please try again later");
			}
		} catch (error) {
			console.error('Error during authentication:', error);
			setErrorMessage("Error during authentication, Please try again later");
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetPasswordFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		// Access the selectedCountry state here and include it in your form data
		const formData = {
			email: '',
			phoneNumber: '',
		};
	
		// Get the input value for email or phone number
		const inputElement = event.currentTarget.querySelector('.field-input') as HTMLInputElement;
		const inputValue = inputElement ? inputElement.value : '';

		// Check if the user didn't write anything
		if (!inputValue) {
			setResetErrorMessage("Please provide a valid email or phone number");
			setNotFound(true);
			return;
		}

		// Determine whether the input is an email or a phone number
		if (validateEmail(inputValue)) {
			formData.email = inputValue;
		} else if (validatePhone(inputValue)) {
			formData.phoneNumber = inputValue;
		} else {
			setResetErrorMessage("Invalid email or phone number");
			setNotFound(true);
			return;
		}
	
		// Check if either email or phone number is provided before searching the database
		if (formData.email || formData.phoneNumber) {
			try {
				setIsSearching(true);

				// Simulate checking if the account exists in the database
				const accountExists = await checkAccountExists(formData.email); // Replace with your actual database check
	
				// Use recaptchaValue along with other form data for submission
				if (recaptchaValue) {
					console.log("Form data:", formData);
					console.log("Form submitted with reCAPTCHA value:", recaptchaValue);
	
					// Check if the account was not found and set the appropriate message
					if (!accountExists) {
						setResetErrorMessage("We were unable to find an account that matches the information you provided.");
						setNotFound(true);
					} else {
						initiatePasswordReset(formData.email || formData.phoneNumber);
					}
				} else {
					// Show an error or take appropriate action if reCAPTCHA is not solved
					console.error("reCAPTCHA not solved");
					setResetErrorMessage("reCAPTCHA not solved");
					setNotFound(true);
				}
			} catch (error) {
				console.error("Error checking account existence:", error);
				setResetErrorMessage("Internal server error, Please try again later.");
				setNotFound(true);
			} finally {
				setIsSearching(false);
			}
		} else {
			setResetErrorMessage("Please provide a valid email or phone number");
			setNotFound(true);
		}
	};

	// Simulate an asynchronous function to initiate password reset
	const initiatePasswordReset = async (email: string) => {
		try {
			const response = await fetch(`${env.VITE_BACKEND_API_URL}/initiate-password-reset`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
	
			if (response.ok) {
				// Password reset initiation successful
				console.log('Password reset initiated successfully');
			} else {
				// Password reset initiation failed, handle the error
				console.error('Error initiating password reset:', response.statusText);
			}
		} catch (error) {
			console.error('Error initiating password reset:', error);
		}
	};
	
	// Simulate an asynchronous function to check if the account exists in the database
	const checkAccountExists = async (email: string): Promise<boolean> => {
		try {
			const response = await fetch(`${env.VITE_BACKEND_API_URL}/checkAccountExists`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
		
			if (response.ok) {
				const result = await response.json();
				return result.exists; // Assuming your backend responds with a property named 'exists'
			} else {
				console.error('Error checking account existence:', response.statusText);
				return false;
			}
		} catch (error) {
			console.error('Error checking account existence:', error);
			return false;
		}
	};

	return (
		<>
			<Header />
			<div className="page-content-sign">
				<div className="login-container">
					<div className="new-login">
						<div className="signin-title">
							<div className="title">{title}</div>
						</div>
						<div className="login-form-container">
							<form className="login-form signin-form" action="" onSubmit={handleFormSubmit}>
								<div className="login-dialog-field">
									<div className="field-label account">
										Sign in with account name
									</div>
									<input className="field-input" id="field-input-account" type="text" />
								</div>
								<div className="login-dialog-field">
									<div className="field-label">Password</div>
									<input className="field-input" id="field-input-password" type="password" />
								</div>
								<div className="remember-me" onClick={handleRememberMeClick}>
								<div className="check" tabIndex={0}>
									{isChecked && <img src="images/check.svg" alt="Checkmark" />}
								</div>
									<div className="check-label">Remember me</div>
								</div>
								<div className="login-dialog-field">
									<button className={`submit-button ${isLoading && 'loading'}`} type="submit" disabled={isLoading}>
										Sign in
										{isLoading && (<div className="loading-container"><div className="loading-spinner" /></div>)}
									</button>
								</div>
								<div
									className="form-error"
									style={ errorMessage !== "" ? {display: "block"} : undefined }
								>
									{errorMessage}
								</div>
								<a
									className="forgot-password"
									onClick={handleForgotPasswordClick}
								>
									{showForgotPassword ? "Hide Forgot Password / Username" : "Forgot Password / Username?"}
								</a>
							</form>
							<animated.div className="forgot-my-password " style={!isViewport740 ? springProps : springProps740}>
								<form className="login-form" action="" onSubmit={handleResetPasswordFormSubmit}>
									<div className="help-title">
										I forgot my Steam Account name or password
									</div>
									<div className="login-dialog-field">
										<div className="field-label account">
											Enter your email address or phone number
										</div>
										<input className="field-input" type="text" />
									</div>
									<div className="g-recaptcha" data-sitekey={env.VITE_RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
									<div className="recovery-submit">
										<div
											className="form-error"
											style={ notFound ? {display: "block"} : undefined }
										>
											{resetErrorMessage}
										</div>
										<button className={`submit-button search ${isSearching && 'loading'}`} style={isSearching ? {color: "transparent"} : {}} type="submit" disabled={isSearching}>
											Search
											{isSearching && (<div className="loading-container"><div className="loading-spinner" /></div>)}
										</button>
									</div>
									{passwordPage && <a href="/login" className="forgot-password">Login instead</a>}
								</form>
							</animated.div>
						</div>
					</div>
				</div>
				<div className="new-user">
					<div className="new-user-item create-acc">
						<div className="headline">New to Steam?</div>
						<a className="signup-btn" target="_top" href="/join">
							<span>Create an account</span>
						</a>
					</div>
					<div className="new-user-item">
						<div className="subtext">
							It's free and easy. Discover thousands of<br />games to play with
							millions of new friends.<br />
							<a className="join-desc" href="#">
								Learn more about Steam
							</a>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SignInAndRecovery;
