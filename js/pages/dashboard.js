import { events } from "../data/events.js";
import { projects } from "../data/projects.js";
import { tips } from "../data/tips.js";
import { showMessage, escapeHtml } from "../utils/dom.js";
import { STORE } from "../services/storage.js";

export function initDashboard() {
    const node = document.querySelector('#dashboard');

    if (!node) {
        return;
    }

    const members = STORE.read('members');
    const messages = STORE.read('messages');
    const favorites = STORE.read('favorites');
    const savedProjects = STORE.read('savedProjects');
    const registeredEvents = STORE.read('events');

    document.querySelector('#count-members').textContent = members.length;
    document.querySelector('#count-messages').textContent = messages.length;
    document.querySelector('#count-favorites').textContent = favorites.length;

    const list = (items, format) => items.length
        ? `<ul>${items.map(format).join('')}</ul>`
        : '<p>Nenhum registro ainda.</p>';

    document.querySelector('#members-list').innerHTML = list(
        members,
        x => `
            <li>
                <strong>${escapeHtml(x.name)}</strong> ·
                ${escapeHtml(x.email)} ·
                ${escapeHtml(x.interest)}
            </li>
        `
    );

    document.querySelector('#messages-list').innerHTML = list(
        messages,
        x => `
            <li>
                <strong>${escapeHtml(x.name)}</strong>:
                ${escapeHtml(x.subject)} —
                ${escapeHtml(x.message.slice(0, 90))}
            </li>
        `
    );

    document.querySelector('#favorites-list').innerHTML = list(
        tips.filter(x => favorites.includes(x.id)),
        x => `<li>${escapeHtml(x.title)}</li>`
    );

    document.querySelector('#projects-list').innerHTML = list(
        projects.filter(x => savedProjects.includes(x.id)),
        x => `<li>${escapeHtml(x.title)}</li>`
    );

    document.querySelector('#events-list').innerHTML = list(
        events.filter(x => registeredEvents.includes(x.id)),
        x => `<li>${escapeHtml(x.title)}</li>`
    );

    document.querySelector('#clear-data').addEventListener(
        'click',
        () => {
            if (!confirm('Apagar TODOS os dados do EcoConecta salvos neste navegador?')) {
                return;
            }

            [
                'members',
                'messages',
                'favorites',
                'savedProjects',
                'events'
            ].forEach(k => {
                localStorage.removeItem('ecoconecta_' + k);
            });

            initDashboard();

            showMessage('#panel-feedback', 'Dados locais apagados.');
        },
        { once: true }
    );
}