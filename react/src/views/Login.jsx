import { useStateContext } from "../contexts/ContextProvider";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";

const Login = () => { 
    const navigate = useNavigate();
    const { token, setToken, setUser } = useStateContext();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const [user, setUserInput] = useState({
        email: "",
        password: "",
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const handleChange = (e) => {
        setUserInput({ ...user, [e.target.name]: e.target.value });
        if (e.target.name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(
                emailRegex.test(e.target.value) ? "" : "Invalid email address"
            );
        }

        // Validate password
        if (e.target.name === 'password') {
            setPasswordError(e.target.value.trim() !== '' ? '' : 'Password is required');
        }
    };

    const login = async (e) => {
        e.preventDefault();
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
                "http://localhost:8000/login",
                body,
                config
            );
            setUser(res.data.user);
            setToken(res.data.token);
        } catch (err) {
            setEmailError(' ');
            setPasswordError('Wrong password or email');
        }
    };

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray-bg py-12 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn font-montserrat">
                <h2 className="mb-10 text-5xl font-semibold   text-text-login-sign">
                    Tasker
                </h2>
                <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-2xl ">
                    <div>
                        <h2 className="mt-6 text-left text-xl font-semibold  text-text-login-sign ">
                            Sign In
                        </h2>
                        <hr className="my-4 border-t border-gray-300 " />
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={login}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <p className="text-near-placeholder mb-1 font-medium">
                                    Email
                                </p>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        emailError
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm mb-6`}
                                    onChange={handleChange}
                                />
                                {emailError && (
                                    <p className="text-red-500 text-sm -mt-5">
                                        {emailError}
                                    </p>
                                )}
                            </div>
                            <div>

                                <p className="mb-1 text-near-placeholder font-medium">
                                    Password
                                </p>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        passwordError
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm`}
                                    onChange={handleChange}
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-btn-login hover:bg-yellow-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
                                transition-all ease-linear
                                "
                            >
                                Login
                            </button>
                        </div>
                        <div>
                            <p className="text-center text-login-redirect hover:text-login-redirect-hover font-semibold underline transition-all ease-linear">
                                <Link to="/signup">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
};

export default Login;