import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface Auth0ProviderWithConfigProps {
    children: ReactNode;    // Has props of type ReactNode
}

export const Auth0ProviderWithConfig = ({ children } : Auth0ProviderWithConfigProps) => {
    const domain = "dev-nv4345c1szg142mz.us.auth0.com";
    const clientId = "RjSqk3XLutH7jGJ2mdvyBRk7Jyjuo3vY";
    const redirect_uri = "http://localhost:5173/todos";

    return(
        <Auth0Provider
            domain= {domain}
            clientId= {clientId}
            authorizationParams= {{
                redirect_uri: redirect_uri,
            }}
        >
            {children}
        </Auth0Provider>
    );
};