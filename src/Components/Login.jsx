export const Login = () => {
    return (
        <>
        <div className="login-form">
            <form >
                <h1>Glume Chat</h1>
                <div className="login-form-input">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username"/>
                </div>
                <div className="login-form-input">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password"/>
                </div>
                <button className="login-form-button">Login</button>
                <div className="login-form-footer">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Create Account</a>
                </div>
            </form>
        </div>
        </>

    )
}