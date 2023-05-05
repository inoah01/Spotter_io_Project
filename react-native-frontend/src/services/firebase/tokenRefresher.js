import {auth} from "../../hooks/useAuth";
import {storeToken} from "../deviceStorage";

export const refreshToken = async () => {
    const user = auth.currentUser;
    if (user) {
        const newToken = await user.getIdToken(true);
        await storeToken(newToken);
    } else {
        console.log("No user found to refresh the token.")
    }
}