import '../css/style.css';
import { isWebAuthnSupported, register} from "./tools/Webauth";

if (!isWebAuthnSupported) {
    alert("WebAuthn is not supported");
}

function registerButton(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData((e.submitter as HTMLInputElement)?.form as HTMLFormElement);
    let data: any = {};
    formData.forEach((value: FormDataEntryValue, key: string) => {
        data[key] = value;
    });

    register(data.username, data.displayName)
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm') as HTMLFormElement;

    form.addEventListener('submit', registerButton);
});