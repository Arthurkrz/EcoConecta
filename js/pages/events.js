import { events } from "../data/events.js";
import { STORE } from "../services/storage.js";

export function initEvents() {
    const root = document.querySelector('#event-list');

    if (!root) {
        return;
    }

    function render() {
        const selected = STORE.read('events');

        root.innerHTML = events
            .map(e => `
                <article class="event-item">
                    <div class="event-date">
                        <strong>${e.day}</strong>
                        ${e.month}
                    </div>

                    <div class="event-content">
                        <h3>${e.title}</h3>
                        <p>${e.location} · ${e.description}</p>
                    </div>

                    <button class="btn-eco ${selected.includes(e.id) ? 'outline' : ''}"
                        data-event="${e.id}" type="button">
                        ${selected.includes(e.id) ? '✓ Inscrito' : 'Tenho interesse'}
                    </button>
                </article>
            `)
            .join('');

        root.querySelectorAll('[data-event]').forEach(btn => {
            btn.addEventListener('click', () => {
                let list = STORE.read('events');

                list = list.includes(btn.dataset.event)
                    ? list.filter(id => id !== btn.dataset.event)
                    : [...list, btn.dataset.event];

                STORE.write('events', list);

                render();
            });
        });
    }

    render();
}
