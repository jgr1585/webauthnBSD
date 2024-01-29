import { helper } from "./helper";

export function register(username: string, dispalyName: string) {
    helper.ajax("api/register.php", {
        phase: "a",
        username: username,
        displayName: dispalyName
    }, (data) => {
        try {
            let res = JSON.parse(data);
            helper.bta(res);
            navigator.credentials.create(res).then((newCredentialInfo) => {
                if (newCredentialInfo !== null) {
                    sendRegisterCredentials(newCredentialInfo);
                }
            });
        } catch (e) {
            console.log(e);
        }
    });
}

export function login() {

    helper.ajax("api/login.php", {
        phase: "a"
    }, (data) => {
        let req = JSON.parse(data);
        helper.bta(req);
        console.log(req);
        navigator.credentials.get(req).then((newCredentialInfo) => {
            if (newCredentialInfo !== null) {
                sendLoginCredentials(newCredentialInfo);
            }
        });
    });
}

export const isWebAuthnSupported = (window.PublicKeyCredential !== undefined && typeof(PublicKeyCredential) !== 'undefined');


function sendRegisterCredentials(cred: any) {
    helper.ajax("api/register.php", {
        phase: "b",
        id : cred.rawId ? helper.atb(cred.rawId) : null,
        transport : cred.response.getTransports ? cred.response.getTransports() : null,
        client : cred.response.clientDataJSON ? helper.atb(cred.response.clientDataJSON) : null,
        attest : cred.response.attestationObject ? helper.atb(cred.response.attestationObject) : null
    }, res => alert(res))
}

function sendLoginCredentials(cred: any) {
    helper.ajax("api/login.php", {
        phase : "b",
        id : cred.rawId ? helper.atb(cred.rawId) : null,
        client : cred.response.clientDataJSON ? helper.atb(cred.response.clientDataJSON) : null,
        auth : cred.response.authenticatorData ? helper.atb(cred.response.authenticatorData) : null,
        sig : cred.response.signature ? helper.atb(cred.response.signature) : null,
        user : cred.response.userHandle ? helper.atb(cred.response.userHandle) : null
      }, res => alert(res))
}