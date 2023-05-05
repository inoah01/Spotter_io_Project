import {useEffect} from "react";
import {onIdTokenChanged} from "@firebase/auth";
import {auth} from "./useAuth";
import {storeToken} from "../services/deviceStorage";

export const useFirebaseTokenRefresher = () => {
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const newIdToken = await user.getIdToken();
                await storeToken(newIdToken);
            }
        });

        // Clean up subscription when component mounts
        return () => {
            unsubscribe();
        };
    }, []);
};