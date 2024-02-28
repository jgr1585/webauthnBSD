import '../css/style.css';
import { fetchAllowRegistration } from './tools/Settings';
import { isWebAuthnSupported, login} from "./tools/Webauth";

if (!isWebAuthnSupported) {
    alert("WebAuthn is not supported");
}

export function loginButton() {
    login();
}


document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('registerPage');

    fetchAllowRegistration().then((allow) => {
        if (allow) {
            button?.classList.remove('hidden');
        }
    });
});