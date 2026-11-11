import { showMessage } from "../utils/dom.js";
import { STORE } from "../services/storage.js";

export function initRegister() {
    const form = document.querySelector('#register-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const data = Object.fromEntries(new FormData(form));
        const users = STORE.read('members');

        if (users.some(x => x.email.toLowerCase() === data.email.toLowerCase())) {
            return showMessage(
                '#form-feedback',
                'Este e-mail já está cadastrado neste navegador.',
                true
            );
        }

        users.push({
            ...data,
            id: Date.now()
        });

        STORE.write('members', users);

        form.reset();

        showMessage(
            '#form-feedback',
            'Cadastro realizado localmente! Confira seus dados no Meu painel.'
        );
    });
}