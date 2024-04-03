import { GoogleAuth } from "google-auth-library";
import * as google_credencial from '../../../Archive/google-credentiales.json';

export async function generate_response(issuerId: any, genericClass: any) {

    let credenciales_google = google_credencial

    const classId = `${issuerId}.flecha`;
    const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

    const httpClient = new GoogleAuth({
        credentials: credenciales_google,
        scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
    });

    let response;

    try {
        response = await httpClient.request({
            url: `${baseUrl}/genericClass/${classId}`,
            method: 'GET'
        });

        console.log('Class already exists');

    } catch (err) {
        if (err.response && err.response.status === 404) {
            // Class does not exist
            // Create it now
            response = await httpClient.request({
                url: `${baseUrl}/genericClass`,
                method: 'POST',
                data: genericClass
            });

            console.log('Class insert response');

        } else {
            // Something else went wrong
            console.log(err);
            console.log('Something went wrong in class...check the console logs!');
        }
    }

}