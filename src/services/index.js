import axios from "axios";

export const requestHandler = async (url, data, header, method) => {
    try {
        axios.defaults.withCredentials = true
        const token = localStorage.getItem("token");
        let response = await axios({
            method,
            url,
            data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.log(error)
        console.log("error utils", error.response);
        if(error.response?.status === 401 ) {
            console.log("401", 401);
            // let tokenURL = API_URL + "developer/token";
            // const tokenHeaders = { "Content-Type": "application/json" , "refresh-token": (typeof window !== 'undefined') ? localStorage.getItem("refresh_token") : "false"}

            try{
                // Exchange refresh_token for access_token
                // let res = await axios.post(tokenURL , data, {
                //     headers: tokenHeaders
                // })
                // if(res.data.status === "success") {
                //     localStorage.setItem("access_token", res.data.data.access_token);
                //     localStorage.setItem("refresh_token", res.data.data.refresh_token); 
                //     toast.error("Please try again."); 
                // }
            } catch (error){
                if (error.response.status === 401 || error.response.status === 403) { // This happens when refresh_token has expired
                    //  Redirect to login page
                    localStorage.setItem("isLoggedIn", "false");
                    localStorage.setItem("userData", "");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    // location.href = "/login";
                }
            }
        }
        if (error.response.status === 403) {
            localStorage.setItem("isLoggedIn", "false");
            localStorage.setItem("userData", "");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return "login"
        }
        return(error.response.data)
    }
}

export const isLoggedIn = () => {
    let token = (typeof window !== 'undefined') ? localStorage.getItem("access_token") : "false"
    if (token && token != null ) {
        return true;
    }
    return false;
}
