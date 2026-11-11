import { STORE } from "../services/storage.js";

export function initFilters(selector, container, items, type) {
    let active = 'Todos';

    renderCards(container, items, type);

    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', () => {
            active = btn.dataset.filter;

            document.querySelectorAll(selector).forEach(x => {
                x.classList.toggle('selected', x === btn);
                x.setAttribute('aria-pressed', String(x === btn));
            });

            renderCards(container, items, type, active);
        });
    });
}

function createCard(item, type = 'tip') {
    const saved = STORE.read(
        type === 'tip' ? 'favorites' : 'savedProjects'
    );

    const isSaved = saved.includes(item.id);

    return `
        <article class="card-eco" data-category="${item.category}">
            <div class="card-media">
                <img class="card-img" src="${item.img}" 
                    alt="Ilustração sobre ${item.title}" loading="lazy">
                <span class="tag tag-overlay">${item.category}</span>
            </div>
                    
            <div class="card-body-eco">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
                <div class="card-actions">
                    <button type="button" class="action-link save-action"
                        data-type="${type}" data-id="${item.id}"
                        aria-pressed="${isSaved}">
                        ${isSaved ? '♥ Salvo' : '♡ Salvar'}
                    </button>

                    <a class="card-link" href="
                        ${type === 'tip' ? 'painel.html' : 'cadastro.html'}">
                        ${type === 'tip' ? 'Ver favoritos' : 'Participar'} →
                    </a>
                </div>
            </div>
        </article>
    `;
}

function renderCards(container, items, type, category = 'Todos') {
    const el = document.querySelector(container);

    if (!el) {
        return;
    }

    const filtered = category === 'Todos'
        ? items
        : items.filter(x => x.category === category);

    el.innerHTML = filtered
        .map(x => createCard(x, type))
        .join('') || '<div class="empty-state">Nenhum resultado.</div>';

    el.querySelectorAll('.save-action').forEach(button => {
        button.addEventListener('click', () => {
            const key = type === 'tip'
                ? 'favorites'
                : 'savedProjects';

            let list = STORE.read(key);

            list = list.includes(button.dataset.id)
                ? list.filter(x => x !== button.dataset.id)
                : [...list, button.dataset.id];

            STORE.write(key, list);

            renderCards(container, items, type, category);
        });
    });
}