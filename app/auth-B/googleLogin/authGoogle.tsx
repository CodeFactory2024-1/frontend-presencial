"use client";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { setAuthToken } from 'app/api/apiClient';
import { googleLogin } from 'app/api/userService';

export default function AuthWithGoogle(){
    function handleSuccess(credentialResponse: CredentialResponse): void {
        const decoded = credentialResponse.credential ? jwtDecode(credentialResponse.credential) : undefined;
        console.log("credentialResponse", credentialResponse, "JWT :", decoded);
        setAuthToken(credentialResponse.credential);
        googleLogin(credentialResponse.credential)
    }

    function handleError(): void {
        console.log("Error en el login");
    }

    return(
        <div>
            <GoogleLogin onError={handleError} onSuccess={handleSuccess} />
        </div>
    )
}