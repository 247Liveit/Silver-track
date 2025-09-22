import { BackendTokens } from "@/types/types";
import { useAuthHook } from "../../../providers/authContext";
import axios from "./axios";

export default function useRefreshToken(): () => Promise<null | BackendTokens> {
    const auth = useAuthHook();
    const refresh = async (): Promise<null | BackendTokens> => {
        try {
            const response = await axios.post('/auth/refresh', {}, {
                withCredentials: true, headers: {
                    Authorization: `Bearer ${auth.tokens?.refresh_token}`
                }
            });

            if (response.data.access_token) {
                auth.setAuthData(auth.user, response.data);
                return response.data;
            }
            return null;
        } catch (err) {
            return null;
        }
    }
    return refresh;
}