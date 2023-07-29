import './signUp.scss'
import Component from "@/plugins/component";
import Input from "@/common/components/Input/Input";
import Button from "@/common/components/Button/Button";
import { AsNode } from "@/common/decorators";

export default class SignUp extends Component {
    updateTemplate(template) {
        const EmailInput = new Input({
            type: 'email',
            name: 'email',
            id: 'email',
            label: 'Email',
            placeholder: 'Your Email'
        });
        const FirstNameInput = new Input({
            type: 'text',
            name: 'firstname',
            id: 'firstname',
            label: 'First name',
            placeholder: 'Your Name'
        });
        const LastNameInput = new Input({
            type: 'text',
            name: 'lastname',
            id: 'lastname',
            label: 'Last name',
            placeholder: 'Your Last name'
        });
        const PasswordInput = new Input({
            type: 'password',
            name: 'password',
            id: 'password',
            label: 'Password',
            placeholder: 'Enter password'
        });
        const PasswordConfirmInput = new Input({
            type: 'password',
            name: 'passwordconfirm',
            id: 'passwordconfirm',
            label: 'Password Confirm',
            placeholder: 'Confirm your password'
        });
        const signUpButton = new Button({
            id: 'signup',
            class: 'btn btn-lg btn-success w-100',
            title: 'Sign Up'
        });
        const toSignInButton = new Button({
            id: 'tosignin',
            class: 'btn btn-lg btn-primary w-100',
            title: 'Sign in'
        });
        

        return this.replaceSlot(
            template,
            { key: 'slot[name="email"]', replacer: () => EmailInput.render() },
            { key: 'slot[name="firstname"]', replacer: () => FirstNameInput.render() },
            { key: 'slot[name="lastname"]', replacer: () => LastNameInput.render() },
            { key: 'slot[name="password"]', replacer: () => PasswordInput.render() },
            { key: 'slot[name="passwordconfirm"]', replacer: () => PasswordConfirmInput.render() },
            { key: 'slot[name="signup"]', replacer: () => signUpButton.render() },
            { key: 'slot[name="tosignin"]', replacer: () => toSignInButton.render() }
        );
    }

    @AsNode
    getTemplate() {
           return `
            <div class="sign-up d-flex justify-content-center align-items-center">
                <div class="card col-11 col-md-6 col-lg-4">
                    <div class="card-body">
                      <h5 class="card-title text-center mb-3"> Sign Up </h5>
                       <slot name="email"></slot>
                       <slot name="firstname"></slot>
                       <slot name="lastname"></slot>
                       <slot name="password"></slot>
                       <slot name="passwordconfirm"></slot>
                       <div class="row">
                        <div class="col-6">
                            <slot name="signup"></slot>
                        </div>
                        <div class="col-6">
                            <slot name="tosignin"></slot>
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