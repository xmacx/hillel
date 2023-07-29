import './signin.scss'
import Component from "@/plugins/component";
import Input from "@/common/components/Input/Input";
import Button from "@/common/components/Button/Button";
import { AsNode } from "@/common/decorators";

export default class SignIn extends Component {
    updateTemplate(template) {
        const LoginInput = new Input({
            type: 'text',
            name: 'login',
            id: 'login',
            label: 'Login',
            placeholder: 'Your login',
        });

        const PasswordInput = new Input({
            type: 'password',
            name: 'password',
            id: 'password',
            label: 'Password',
            placeholder: 'Password',
        });

        const signInButton = new Button({
            id: 'signip',
            class: 'btn btn-lg btn-success w-100',
            title: 'Sign In'
        });

        const toSignUpButton = new Button({
            id: 'tosignup',
            class: 'btn btn-lg btn-primary w-100',
            title: 'Sign up'
        });

        return this.replaceSlot(
            template,
            { key: 'slot[name="login"]', replacer: () => LoginInput.render() },
            { key: 'slot[name="password"]', replacer: () => PasswordInput.render() },
            { key: 'slot[name="signip"]', replacer: () => signInButton.render() },
            { key: 'slot[name="tosignup"]', replacer: () => toSignUpButton.render() }
        );
    }

    @AsNode
    getTemplate() {
           return `
            <div class="sign-in d-flex justify-content-center align-items-center">
                <div class="card col-11 col-md-6 col-lg-4">
                    <div class="card-body">
                      <h5 class="card-title text-center mb-3"> Sign In </h5>
                       <slot name="login"></slot>
                       <slot name="password"></slot>
                       <div class="row">
                        <div class="col-6">
                            <slot name="signip"></slot>
                        </div>
                        <div class="col-6">
                            <slot name="tosignup"></slot>
                        </div>
                       </div>
                       
                    </div>
                </div>
            </div>
        `
    }
    render() {
        return this.updateTemplate(
            this.getTemplate()
        );
    }
}
