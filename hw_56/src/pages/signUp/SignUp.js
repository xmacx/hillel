import './signUp.scss'
import Component from "@/plugins/component";

export default class SignUp extends Component {

    render() {
        return `
            <div class="container">
                <div class="card">
                    <div class="card_title">
                        <h1>Create Account</h1>
                        <span>Already have an account? <a href="login">Sign In</a></span>
                    </div>
                    <div class="form">
                        <form>
                            <input type="text" name="username" id="username" placeholder="User name" />
                            <input type="email" name="email" placeholder="Email" id="email" />
                            <input type="password" name="password" placeholder="Password" id="password" />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div class="card_terms">
                        <input type="checkbox" name="" id="terms"> <span>I have read and agree to the <a href="">Terms of Service</a></span>
                    </div>
                </div>
            </div>
        `
    }
}