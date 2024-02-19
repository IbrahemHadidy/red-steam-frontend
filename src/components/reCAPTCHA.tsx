import { useRef, useState, useEffect } from "react";

const useRecaptcha = () => {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const recaptchaRef = useRef<HTMLDivElement>(null);

	// Handle the reCAPTCHA response
	const handleRecaptchaChange = (value: string | null) => {
		setRecaptchaValue(value);
	};

	// Load reCAPTCHA script dynamically
	useEffect(() => {
		const script = document.createElement("script");
		script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${
    	  import.meta.env.RECAPTCHA_SITE_KEY
    	}`;
		script.async = true;
		document.head.appendChild(script);

		// Cleanup function to remove the script on hook unmount
		return () => {
			document.head.removeChild(script);
		};
	}, []);

	// Callback function to be executed when reCAPTCHA script is loaded
	useEffect(() => {
		const onRecaptchaScriptLoad = () => {
			// Initialize reCAPTCHA with your site key
			window.grecaptcha.ready(() => {
				if (recaptchaRef.current) {
					// Add a null check
					window.grecaptcha.render(recaptchaRef.current, {
						sitekey: import.meta.env.RECAPTCHA_SITE_KEY,
						callback: handleRecaptchaChange, // Your callback function for reCAPTCHA response
					});
				}
			});
		};

		// Check if the reCAPTCHA script is already loaded
		if (window.grecaptcha) {
			onRecaptchaScriptLoad();
		} else {
			// Load reCAPTCHA script dynamically
			const script = document.createElement("script");
			script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${
      		  import.meta.env.RECAPTCHA_SITE_KEY
      		}`;
			script.async = true;
			document.head.appendChild(script);

			// Cleanup function to remove the script on hook unmount
			return () => {
				document.head.removeChild(script);
			};
		}
	}, [recaptchaRef]);

	// Set the reCAPTCHA dark theme when the component mounts
	useEffect(() => {
		const setRecaptchaTheme = () => {
			if (recaptchaRef.current) {
				recaptchaRef.current.setAttribute('data-theme', 'dark');
			}
		};
		setRecaptchaTheme();
	}, [recaptchaRef]);

	return { recaptchaRef, recaptchaValue };
};

export default useRecaptcha;
