import { showMessage } from "../utils/dom.js";
import { STORE } from "../services/storage.js";

export function initContact() {
    const form = document.querySelector('#contact-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const data = Object.fromEntries(new FormData(form));
        const records = STORE.read('messages');

        records.push({
            ...data,
            id: Date.now(),
            createdAt: new Date().toLocaleString('pt-BR')
        });

        STORE.write('messages', records);

        form.reset();

        showMessage(
            '#form-feedback',
            'Mensagem registrada neste navegador! Obrigado pelo contato.'
        );
    });
}
