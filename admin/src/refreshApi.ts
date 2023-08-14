import { createRefresh } from "react-auth-kit";
import axios from "axios";
const refreshApi = createRefresh({
  interval: 60,
  refreshApiCallback: async ({ authToken, refreshToken }) => {
    try {
      const url = process.env.REACT_APP_BACKEND_API as string;
      const response = await axios.post(
        `${url}/auth/refresh`,
        { token: refreshToken },
        {
          headers: { authorization: `Bearer ${authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
      };
    } catch (err) {
      return { isSuccess: true, newAuthToken: "" };
    }
  },
});

export default refreshApi;
