import { FC, useEffect, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useRecaptcha from "../../components/reCAPTCHA";
import { validateEmail, validateName, validatePassword } from "../../components/InputValidations";
import { countries } from "../../components/countries";
import { VerifyModal } from "./VerifyModal";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./SignInUp.scss";

const env = import.meta.env;

const SignUp: FC = () => {
	const navigate = useNavigate();
	const { recaptchaRef, recaptchaValue } = useRecaptcha();
	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const [resetKey, setResetKey] = useState(0);
	const [selectedCountry, setSelectedCountry] = useState("PS");
	const [email, setEmail] = useState("");
	const [confirmedEmail, setConfirmedEmail] = useState("");
	const [existingEmail, setExistingEmail] = useState(false);
	const [firstStep, setFirstStep] = useState(false);
	const [nameAvailable, setNameAvailable] = useState(false);
	const [accountName, setAccountName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordWarning, setPasswordWarning] = useState(false);
	const [noMatch, setNoMatch] = useState(false);
	const [showVerificationModal, setShowVerificationModal] = useState(false);

	useEffect(() => {
		// this is responsible for the page background
		document.body.style.background =
			"radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429";
		document.body.style.backgroundImage = "none";
		// this is responsible for the tab title
		document.title = `Create Your Account`;
	}, []);

	// handle storing error messages
	const addErrorMessage = (newErrorMessage: string) => {
		setErrorMessages((prevErrorMessages: string[]) => [...prevErrorMessages, newErrorMessage]);
	};

	// fading animation for error message
	useEffect(() => {
		setResetKey((prevKey) => prevKey + 1);
	}, [errorMessages]);
	const springProps = useSpring({
		key: resetKey,
		from: { backgroundColor: "rgba(244, 183, 134, 1)" },
		to: { backgroundColor: errorMessages.length !== 0 ? "rgba(0, 0, 0, 0.5)" : "rgba(244, 183, 134, 1)" },
		config: { duration: 1000 },
	});

	// Fetch the user's current location
	useEffect(() => {
		const fetchUserCountry = async () => {
			try {
				const country = (await axios.get(
						`https://ipinfo.io/country?token=${env.VITE_IPINFO_TOKEN}`
					)).data.trim();
				setSelectedCountry(country);
			} catch (error) {
				console.error("Error fetching country code:", error);
			}
		};
		fetchUserCountry();
	}, []);

	// handle country change
	const OnCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		console.log("Selected Country:", selectedValue);
		setSelectedCountry(selectedValue);
	};

	// Function to check for an existing email
	const checkExistingEmail = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessages([]);

		const isEmailValid = validateEmail(email);
		const isCheckboxChecked = (document.querySelector("#i-agree-check") as HTMLInputElement)?.checked;

		if (!isEmailValid) {
			document.getElementById("email")?.classList.add("error");
			document.getElementById("reenter-email")?.classList.add("error");
			addErrorMessage("- Please enter a valid email address.");
		}
		if (confirmedEmail !== email) {
			document.getElementById("reenter-email")?.classList.add("error");
			addErrorMessage("- Please enter the same address in both email address fields.");
		}
		if (!isCheckboxChecked) {
			document.getElementById("agree-label")?.classList.add("error");
			addErrorMessage("- Please agree to the terms and conditions.");
		}
		if (!isEmailValid || confirmedEmail !== email || !isCheckboxChecked)  {
			return;	
		}

		
		try {
			const response = await axios.post(
				`${env.VITE_BACKEND_API_URL}/checkExistingEmail`,
				{ email }
			);

			if (response.data.exists) {
				// Email already exists
				setExistingEmail(true);
			} else {
				// Email does not exist, proceed with the form submission
				setExistingEmail(false);
				createAccount(e);
			}
		} catch (error) {
			console.error("Error checking existing email:", error);
			addErrorMessage("- An error occurred while trying to connect to the server. Please check your internet connection and try again.");
		}
	};

	const checkNameAndPassword = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessages([]);

		const isNameValid = validateName(accountName);
		const isPasswordValid = validatePassword(password);

		if (!isNameValid) {
			document.getElementById("accountname")?.classList.add("error");
			addErrorMessage("- Please enter an account name that is at least 3 characters long and uses only a-z, A-Z, 0-9 or _ characters.");
		}
		if (!isPasswordValid) {
			document.getElementById("password")?.classList.add("error");
			document.getElementById("reenter-password")?.classList.add("error");
			addErrorMessage("- Password must contain at least one digit, one letter, and one special character.");
		}
		if (password !== confirmPassword) {
			document.getElementById("reenter-password")?.classList.add("error");
			addErrorMessage("- Please enter the same address in both email address fields.");
		}
		if (!isNameValid || !isPasswordValid || password !== confirmPassword) {
			return;
		}

		try {
			const response = await axios.post(
				`${env.VITE_BACKEND_API_URL}/checkExistingEmail`,
				{ email }
			);

			if (response.data.exists) {
				// Email already exists
				setExistingEmail(true);
			} else {
				// Email does not exist, proceed with the form submission
				setExistingEmail(false);
				submitSecondStep(e);
			}
		} catch (error) {
			console.error("Error checking existing email:", error);
			addErrorMessage("- Internal server error while checking account existence. Please try again later.");
		}
	};

	// handle existing account button
  const handleExistingBtn = () => {
    navigate("/reset-password");
  };
  // handle existing account button
  const makeNewAccount = () => {
    setExistingEmail(false);
		setErrorMessages([]);
		setFirstStep(true);
  };
	
	// Check name availability
	useEffect(() => {
		const checkAvailability = async () => {
			if (accountName.length === 0) {
				return;
			} else {
				try {
					const response = await axios.post(
						`${env.VITE_BACKEND_API_URL}/checkAccountAvailability`,
						{ accountName }
					);
			
					if (response.data.available) {
						setNameAvailable(true);
						setErrorMessages([]);
					} else {
						setNameAvailable(false);
						setErrorMessages([]);
					}
				} catch (error) {
					console.error("Error checking account availability:", error);
					setErrorMessages([]);
					addErrorMessage("- Internal server error while checking account availability. Please try again later.");
				}
			}
		};
		checkAvailability();
	}, [accountName]);

	// check password criteria
	const checkPassword = (
		event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
	) => {
		const enteredPassword = (event.target as HTMLInputElement).value;

		// Reset previous states
		setPasswordError(false);
		setPasswordWarning(false);

		if (0 === enteredPassword.length) {
			setPasswordError(false);
		} else if (enteredPassword.length < 8  && 0 < enteredPassword.length) {
			setPasswordError(true);
		} else {
			// Check for more complex password criteria
			if (
				!/\d/.test(enteredPassword) ||
				!/[a-zA-Z]/.test(enteredPassword) ||
				!/[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword)
			) {
				setPasswordWarning(true);
			}
		}
	};

	// chack password confirmation matching
	useEffect(() => {
		const confirmPasswordCheck = () => {
			if (confirmPassword.length === 0) {
				setNoMatch(false);
			} else {
				setNoMatch(password !== confirmPassword);
			}
		};
		confirmPasswordCheck();
	}, [confirmPassword, password]);

	// submit first form
	const createAccount = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessages([]);

		const formData = {
			email,
			country: selectedCountry,
		};

		// Display the verification modal
		setShowVerificationModal(true);
		const verificationStartTime = Date.now();

		// Function to close the modal and show an error if it takes too long
		const closeVerificationModal = () => {
			setShowVerificationModal(false);
			console.error("Email verification took too long. Please try again later.");
			addErrorMessage("- You've waited too long to verify your email. Please try creating your account and verifying your email again.");
		};

		// Use recaptchaValue along with other form data for submission
		if (recaptchaValue) {
			try {
				// Perform your form submission logic here
				console.log("Form data:", formData);

				// Simulate the email verification process (replace this with actual logic)
				const verificationResult = await simulateEmailVerification();

				if (verificationResult === "success") {
					console.log("Email verification successful!");

					setShowVerificationModal(false);
					setFirstStep(false);
				} else {
					// Verification failed
					console.error("Email verification failed.");
					addErrorMessage("- An error occurred while verifying your email, Please try again later.");
				}
			} catch (error) {
				console.error("Error during form submission:", error);
				addErrorMessage("- An error occurred while verifying your email, Please try again later.");
			}
		} else {
			addErrorMessage("- You must verify your humanity before you can create a Steam account.");
			console.error("reCAPTCHA not solved");
			// Optionally, display an error message to the user
		}

		// Check if the modal has been open for too long
		const verifyModalTimeout = 30 * 60 * 1000;
		const elapsedTime = Date.now() - verificationStartTime;
			
		// Add a backend request for waiting time
		try {
			const waitingTimeResponse = await axios.get(
				`${env.VITE_BACKEND_API_URL}/waitingTime`
			);
			
			const waitingTime = waitingTimeResponse.data.time; // Adjust this based on your backend response structure
			
			// Close the modal if either the waiting time has ended or the modal has been open for too long
			if (waitingTime <= 0 || elapsedTime > verifyModalTimeout) {
				closeVerificationModal();
			}
		} catch (error) {
			console.error("Error fetching waiting time:", error);
			// Handle the error, show an error message, etc.
			// Optionally, close the modal in case of an error (adjust based on your requirements)
			closeVerificationModal();
		}
	};

	// Simulate email verification (replace this with actual logic)
	const simulateEmailVerification = async (): Promise<"success" | "failure"> => {
		// Simulate a delay for email verification
		await new Promise((resolve) => setTimeout(resolve, 5000));

		// Simulate a 50% chance of success
		return Math.random() < 0.5 ? "success" : "failure";
	};


	// submit second form
	const submitSecondStep = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const secondStepFormData = {
			accountName,
			password,
		};

		try {
			// Perform your second-step account creation logic here
			const response = await axios.post(
				`${env.VITE_BACKEND_API_URL}/createAccountStep2`,
				secondStepFormData
			);

			if (response.data.success) {
				console.log("Account created successfully!");
				// You might want to redirect the user to another page or perform additional actions after the second step is completed.
				// Example: Redirect to a success page
				navigate("/");
			} else {
				console.error("Account creation failed:", response.data.error);
				// Handle the error, show an error message, etc.
			}
		} catch (error) {
			console.error("Error creating account:", error);
			// Handle the error, show an error message, etc.
		}
	};

	return (
		<>
			<Header />
			<div className="page-content-sign" style={{ width: "940px" }}>
				<div className="joinsteam-content">
					<animated.div className="error-display" style={{...springProps, display: errorMessages.length !== 0 ? "block" : "none" }}>
					{errorMessages.map((message, index) => (
						<div key={index}>{message}</div>
					))} 
					</animated.div>
					{!existingEmail ? (<div className="create-account-container">
						<form action="" onSubmit={firstStep ? checkExistingEmail : checkNameAndPassword}>
							<div className="join-form">
								<div className="section-title">Create Your Account</div>
								{firstStep ? (
									<>
										<div className="form-row-flex">
											<div className="form-area">
												<label htmlFor="email">Email Address</label>
												<input
													type="text"
													maxLength={225}
													name="email"
													id="email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
										</div>
										<div className="form-row-flex">
											<div className="form-area">
												<label className="reenter" htmlFor="reenter-email">
													Confirm your Address
												</label>
												<input 
												type="text" 
												className="reenter-email" 
												name="reenter-email" 
												id="reenter-email" 
												value={confirmedEmail}
												onChange={(e) => setConfirmedEmail(e.target.value)}/>
											</div>
										</div>
										<div className="form-row-flex">
											<div className="form-area">
												<label className="country-select" htmlFor="country">
													Country of Residence
												</label>
												<select
													name="country"
													id="country"
													className="country-selector"
													onChange={OnCountryChange}
													value={selectedCountry}
												>
													{countries.map(([countryCode, countryName]) => (
														<option key={countryCode} value={countryCode}>
															{countryName}
														</option>
													))}
												</select>
											</div>
										</div>
										<div className="form-row">
											<div className="g-recaptcha" data-sitekey={env.VITE_RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
										</div>
										<div className="form-row">
											<label htmlFor="i-agree-check" id="agree-label" className="agree-label">
												<input type="checkbox" name="i-agree-check" id="i-agree-check" />
												&nbsp; I am 13 years of age or older and agree to the terms of the &nbsp;
												<a href="#" target="_blank">
													<s>Steam Subscriber Agreement</s>
												</a>
												&nbsp; and the &nbsp;
												<a href="#" target="_blank">
													<s>Valve Privacy Policy</s>
												</a>
												.
											</label>
											<button className="joinsteam-btn" type="submit">
												<span>Continue</span>
											</button>
										</div>
									</>
								) : (
									<>
										<div className="form-row-flex">
											<div className="form-area">
												<label htmlFor="accountname">Steam Account Name</label>
												<input
													type="text"
													maxLength={64}
													id="accountname"
													name="accountname"
													onChange={(e) => setAccountName(e.target.value)}
												/>
											</div>
											<div className="availability-container" style={{display: accountName !== "" ? "block" : "none"}}>
													<div
														className="availability"
														style={{
															background: nameAvailable
																? "rgb(92, 126, 16)"
																: "rgb(160, 56, 43)",
															display: accountName !== "" ? "inline-block" : "none",
														}}
													>
														{nameAvailable ? (
															<>
																<img className="green-check" src="/images/icon_check.png" />
																&nbsp;Available
															</>
														) : (
															"Not Available"
														)}
													</div>
												</div>
										</div>
										<div className="form-row-flex">
											<div className="form-area">
												<label htmlFor="password">Choose Password</label>
												<input
													type="password"
													id="password"
													name="password"
													maxLength={64}
													onChange={(e) => {setPassword(e.target.value); checkPassword(e);}}
												/>
											</div>
											<div className="form-notes">
												<div
													className={`password-tag ${passwordError ? "error" : passwordWarning ? "warning" : ""}`}
													style={
														passwordWarning
															? { backgroundColor: "#b78124", opacity: "1" }
															: passwordError
															? { backgroundColor: "#a0382b", opacity: "1" }
															: { opacity: "0", display: "none" }
													}
												>
													{passwordWarning
														? "Include lowercase and uppercase letters, numbers and symbols for a stronger password"
														: passwordError && "Password must be at least 8 characters long"}
												</div>
											</div>
										</div>
										<div
											className="form-row-flex row-flex-end"
											style={{ clear: "left" }}
										>
											<div className="form-area">
												<label htmlFor="reenter-password">Confirm Password</label>
												<input
													type="password"
													id="reenter-password"
													maxLength={64}
													onChange={(e) => {setConfirmPassword(e.target.value);}}
												/>
											</div>
											<div className="form-notes">
												<div
													className={`password-tag ${noMatch ? "error" : ""}`}
													style={
														noMatch
															? { backgroundColor: "#a0382b", opacity: "1" }
															: { opacity: "0", display: "none" }
													}
												>
													{noMatch && "Passwords do not match"}
												</div>
											</div>
										</div>
										<div className="form-row" style={{ clear: "left" }}>
											<div className="submit-btn-container">
												<button className="joinsteam-btn" type="submit">
													<span>Done</span>
												</button>
											</div>
										</div>
									</>
								)}
							</div>
						</form>
					</div>) : (
					<div className="existing-account">
						<div className="section-title">Email in use</div>
						<div className="existing-account-text">
							&nbsp;Looks like your email address is already associated with another Steam account.
							<br />
							<br />
							You can use your existing account or recover it if you've forgotten your login.
						</div>
						<div className="use-existing-account">
							<button className="use-existing-btn" onClick={handleExistingBtn}>
								<span>Use existing account</span>
							</button>
							<a href="#">Recover my account</a>
						</div>
						<div className="existingacc-ruler" />
						<div className="create-newaccount-instead">If you prefer, you can make a new, separate Steam account.</div>
						<button className="use-existing-btn" onClick={makeNewAccount}><span>Continue</span></button>
					</div>)}
				</div>
			</div>
			{showVerificationModal && <VerifyModal storedEmailAddress={email} /> }
			<Footer />
		</>
	);
};

export default SignUp;
