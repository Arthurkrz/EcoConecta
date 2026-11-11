import { projects } from "../data/projects.js";
import { tips } from "../data/tips.js";

export function initGallery() {
    const entries = [...tips, ...projects.slice(0, 3)];
    const target = document.querySelector('#gallery');

    if (!target) {
        return;
    }

    const render = (cat = 'Todos') => {
        target.innerHTML = entries
            .filter(x => cat === 'Todos' || x.category === cat)
            .map(x => `
                <figure class="gallery-card">
                    <div class="gallery-media">
                        <img loading="lazy" src="${x.img}" 
                            alt="${x.title}">
                        <span class="tag tag-overlay">
                            ${x.category}
                        </span>
                    </div>

                    <figcaption class="gallery-caption">
                        ${x.title}
                    </figcaption>
                </figure>
            `)
            .join('');
    };

    render();

    document.querySelectorAll('.gallery-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gallery-filter').forEach(x => {
                x.classList.toggle('selected', x === btn);
            });

            render(btn.dataset.filter);
        });
    });
}