import { Users }  from "../../DataBase/Users";
// import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router";
import axios from "axios";
import { API } from "../../DataBase/API";
import { Link } from "react-router-dom";


export const RegisterForm = () => {
        //function to get the time
    const navigate = useNavigate();
    const getTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const hour = hours % 12;
        const minute = minutes < 10 ? '0' + minutes : minutes;
        const time = hour + ':' + minute + ' ' + ampm;
        return time;
    }
    const AddUser = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const id = uuidv4();
        //validate email
        if(!name){
            alert("Please enter your name");
            return;
        }
        if(!email){
            alert("Please enter your email");
            return;
        }
        if(!password){
            alert("Please enter your password");
            return;
        }


        const user = {
            name:name,
            email:email,
            password:password,
            id:id,
        }
        
        axios.post(`${API}api/users/register`,user).then((res) => {
            if(res.data.message === "user registered successfully"){
                navigate("/");
            } else{
                alert(res.data.message);
            }
            
        }).catch((err) => {
            console.log(err);
        });

        // console.log()
        // window.sessionStorage.setItem("user",JSON.stringify(user));
        // console.log(Users);
        // navigate("/chat");

    }
    return (
        <>
        <div className="enter-name">
            <form onSubmit={AddUser}>
            <h1>
                <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="logo" className="logo"/>
                Gchat
            </h1>
            <h3>Register</h3>
            <input type="name" placeholder="Enter your name" name="name" id="name"/>
            <input type="email" placeholder="Enter your email" name="email" id="email"/>
            <input type="password" placeholder="Enter your password" name="password" id="password" />
            <button>Login</button>
            <p>New User? <Link to="/">register</Link></p>
            </form>
        </div>
        </>
    )
}