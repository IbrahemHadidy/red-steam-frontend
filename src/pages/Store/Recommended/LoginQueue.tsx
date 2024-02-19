import "./Queue.scss"
const LoginQueue = () => {
    return (
        <div className="home-section">
            <div className="home-contents login-queue-content">
                <div className="login-queue">
                    <p>Sign in to view personalized recommendations</p>
                    <div className="signin-btn-ctn">
                        <a className="signin-btn" href="/login"><span>Sign in</span></a>
                        <br /><br />
                        &nbsp;or&nbsp;
                        <a href="/join">sign up</a>
                        &nbsp;and join Steam for free
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginQueue;