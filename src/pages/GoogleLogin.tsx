import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "472395873254-3j8uaurnpfu3t0gcp1ec65u4ckj4lu7p.apps.googleusercontent.com";

function GoogleAuth() {
    const handleLoginSuccess = async (credentialResponse: any) => {
      try {
        // Send the one-time authorization code to backend
        const res = await axios.post(
          "http://localhost:4000/api/v1/users/auth", // Your backend route
          { code: credentialResponse.credential },  // Pass code in the body
        );
        console.log("Backend response:", res.data);
      } catch (err: any) {
        console.error("Login failed:", err.response?.data || err.message);
      }
    };
  
    const handleLoginError = () => {
      console.error("Google login failed");
    };
  
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-4 mt-4">Login with Google</h2>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
            //@ts-ignore
            flow="auth-code"
          />
        </div>
      </GoogleOAuthProvider>
    );
  }
  
export default GoogleAuth;
