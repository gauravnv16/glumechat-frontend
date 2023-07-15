import { useInRouterContext, useNavigate } from "react-router";
import axios from "axios";
import { API } from "../../DataBase/API";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { redirect } from "react-router";
import { UserContext, userContext } from "./UserContext";

function Loading(){
    return(
        <div role="status">
            <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
export const Login = () => {
        //function to get the time
    const [login,setLogin] = useState(false);
    const [errmessage,setErrmessage] = useState("");
    const uc = useContext(userContext);

    const navigate = useNavigate();

    const AddUser = async (e) => {
        e.preventDefault();
        setLogin(true);
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        //validate email
        if(!email){
            alert("Please enter your email");
            return;
        }
        if(!password){
            alert("Please enter your password");
            return;
        }

        const user = {
            email:email,
            password:password,
        }
        
        axios.post(`${API}api/users/login`,user).then((res) => {
            if(res.data.message === "user logged in successfully"){
                window.sessionStorage.setItem("user",JSON.stringify(res.data.user));
                const myInterval = setInterval(() => {}, 1000);
                // console.log(res.data.user);
                // uc.setUser(res.data.user);
                // uc.setIsAuth(true);
                clearInterval(myInterval);
                navigate("/chat");

            }else{
                
                setErrmessage(res.data.message);
                setLogin(false);
            }
            
        }).catch((err) => {
            console.log(err);
            setErrmessage("SERVER ERROR");
            setLogin(false);
        });
    }
    return (
        <>
        <div className="enter-name">
            <form onSubmit={AddUser}>
            <h3>Login</h3>
            <p className="text-red-500">{errmessage}</p>
            <p className="text-gray-500">Email address</p>
            <input type="email" placeholder="Enter your email" name="email" id="email"/>
            <p className="text-sm text-gray-500 mb-2">We wont share your email with anyone</p>
            <p className="text-gray-500">Password</p>
            <input type="password" placeholder="Enter your password" name="password" id="password" />
            
            <button className="bg-blue-500">
                {(login) ? <Loading/> : "Login"}  
            </button>
            
            <p className="text-sm">New User? <Link to="/register" className="text-blue-500">register</Link></p>
            </form>
        </div>
        </>
    )
}