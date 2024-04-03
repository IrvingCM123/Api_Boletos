import { GoogleAuth } from "google-auth-library";
import * as google_credencial from '../../../Archive/google-credentiales.json';
import { generete_Class } from "./class.function";

export async function generate_response(issuerId: any) {

    let credenciales_google = google_credencial

    const classId = `${issuerId}.flecha`;
    const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

    const httpClient = new GoogleAuth({
        credentials: credenciales_google,
        scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
    });

    let response;

    let genericClass = generete_Class(classId);
    
    try {
        response = await httpClient.request({
            url: `${baseUrl}/genericClass/${classId}`,
            method: 'GET'
        });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            response = await httpClient.request({
                url: `${baseUrl}/genericClass`,
                method: 'POST',
                data: genericClass
            });
        } else {
            console.log(err);
            console.log('Something went wrong in class...check the console logs!');
        }
    }

}