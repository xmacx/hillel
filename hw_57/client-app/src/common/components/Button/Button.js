import './button.scss';
import Component from "@/plugins/component";
import { AsNode } from "@/common/decorators";
import { router } from "@/router/router";


class Button extends Component {
    constructor(...props) {
        super(...props);
    }

    #handlers = {
        tosignup: () => router.go('/sign-up'),
        tosignin: () => router.go('/sign-in')
    }

    @AsNode
    getTemplate() {
        return `
            <button 
                type="button" 
                id="${this.props.id}"
                class="${this.props.class}"
                >${this.props.title}
            </button>
        `;

    }

    bindEvent(node) {
        if (node.id === 'tosignup' || node.id === 'tosignin') {
            node.addEventListener('click', this.#handlers[node.id])
        }
        return node;
    }

    render() {
        return this.bindEvent(this.getTemplate());
    }
}
export default Button;