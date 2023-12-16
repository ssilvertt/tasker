import { useStateContext } from "../contexts/ContextProvider";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../axios-instance";

const Register = () => {
    const navigate = useNavigate();
    const { token, setToken, setUser } = useStateContext();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] =
        useState("");
    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password should be at least 8 characters long
        const isLengthValid = password.trim().length >= 8;

        // Password should only contain Latin characters
        const latinRegex = /^[A-Za-z0-9]*$/;
        const isLatinCharactersOnly = latinRegex.test(password);

        return isLengthValid && isLatinCharactersOnly;
    };

    const validatePasswordConfirmation = (passwordConfirmation) => {
        return user.password === passwordConfirmation;
    };

    const validateForm = () => {
        const isEmailValid = validateEmail(user.email);
        const isPasswordValid = validatePassword(user.password);
        const isPasswordsMatch = validatePasswordConfirmation(
            user.password,
            user.password_confirmation
        );

        setEmailError(isEmailValid ? "" : "Invalid email address");
        setPasswordError(
            isPasswordValid
                ? ""
                : "Password must be at least 8 latin characters long and consist of Latin characters only"
        );
        setPasswordConfirmationError(
            isPasswordsMatch ? "" : "Passwords do not match"
        );

        return isEmailValid && isPasswordValid && isPasswordsMatch;
    };

    const [user, setUserInput] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setUserInput({ ...user, [e.target.name]: e.target.value });

        if (e.target.name === "email") {
            const isEmailValid = validateEmail(e.target.value);
            setEmailError(isEmailValid ? "" : "Invalid email address");
        }

        // Validate password
        if (e.target.name === "password") {
            const isPasswordValid = validatePassword(e.target.value);
            setPasswordError(
                isPasswordValid
                    ? ""
                    : "Password must be at least 8 latin characters"
            );
        }

        if (e.target.name === "password_confirmation") {
            const isPasswordsMatch = validatePasswordConfirmation(
                e.target.value
            );
            setPasswordConfirmationError(
                isPasswordsMatch ? "" : "Password do not match"
            );
        }
    };

    const register = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            };
            const body = JSON.stringify(user);

            await axiosInstance.get(
                "http://localhost:8000/sanctum/csrf-cookie"
            );

            const res = await axiosInstance.post(
                "http://localhost:8000/register",
                body,
                config
            );
            setUser(res.data.user);
            setToken(res.data.token);
        } catch (err) {
            console.error(err.response);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray-bg py-12 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn  font-montserrat">
            <h2 className="mb-10 font-semibold  text-5xl text-text-login-sign">
                Tasker
            </h2>
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-2xl mb-8">
                <div>
                    <h2 className="mt-6 text-left text-xl font-semibold text-text-login-sign">
                        Sign Up
                    </h2>
                    <hr className="my-4 border-t border-gray-300 " />
                </div>
                <form className="mt-8 space-y-6" onSubmit={register}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <p className="text-near-placeholder mb-1 font-medium">
                                Name
                            </p>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                 border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm mb-6"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email Address
                            </label>
                            <p className="text-near-placeholder mb-1 font-medium">
                                Email
                            </p>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    emailError
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm mb-6`}
                                onChange={handleChange}
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm -mt-5">
                                    {emailError}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <p className="mb-1 text-near-placeholder font-medium">
                                Password
                            </p>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    passwordError
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm mb-6`}
                                onChange={handleChange}
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm -mt-5">
                                    {passwordError}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="sr-only"
                            >
                                Confirm Password
                            </label>
                            <p className="mb-1 text-near-placeholder font-">
                                Confirm Password
                            </p>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    passwordConfirmationError
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm mb-4`}
                                onChange={handleChange}
                            />
                            {passwordConfirmationError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {passwordConfirmationError}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-btn-login hover:bg-yellow-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ease-linear"
                        >
                            Register
                        </button>
                    </div>
                    <div>
                <p className="text-center font-light transition-all ease-linear">
                    Already have an account?<br /> 
                    <Link
                        className="text-login-redirect hover:text-login-redirect-hover  underline font-semibold"
                        to="/login"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
                </form>
            </div>
            
        </div>
    );
};

export default Register;
