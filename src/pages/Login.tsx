import { isWebAuthnSupported, login } from "../tools/Webauth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    if (!isWebAuthnSupported) {
        alert("WebAuthn is not supported");
    }
    
    function loginButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        login();
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login
                    </h1>
                    <button
                        onClick={loginButton}
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Login</button>
                </div>
            </div>
        </div>
        </div>
    );
}