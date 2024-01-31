import { useState } from "react";
import { isWebAuthnSupported, register } from "../tools/Webauth";

export default function Register() {
    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const [username, setUsername] = useState("jon.doe#" + randomNumber);
    const [displayName, setDisplayName] = useState("Jon Doe #" + randomNumber);

    if (!isWebAuthnSupported) {
        alert("WebAuthn is not supported");
    }

    function registerButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        register(username, displayName);
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Register
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="JonDoe"
                                required={true}
                                onChange={(e) => setUsername(e.target.value)}
                                defaultValue={username}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Displayname</label>
                            <input
                                type="text"
                                name="displayName"
                                id="displayName"
                                placeholder="Jon Doe"
                                required={true}
                                onChange={(e) => setDisplayName(e.target.value)}
                                defaultValue={displayName}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <button
                            onClick={registerButton}
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}