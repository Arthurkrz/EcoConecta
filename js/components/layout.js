import { pages } from "../data/pages.js";

export function layout() {
    let current = location.pathname.split('/').pop() || 'index.html';

    const h = document.querySelector('#site-header');
    const f = document.querySelector('#site-footer');

    if (h) {
        h.innerHTML = `
            <div class="container nav-wrap">
                <a href="index.html" class="brand" id="brand-header"
                    aria-label="EcoConecta, início">
                    <span class="brand-icon">✳</span>
                    <span>Eco<em>Conecta</em></span>
                </a>

                <button class="nav-toggle" type="button"
                    aria-label="Abrir menu" aria-expanded="false">
                    ☰
                </button>

                <nav class="nav-links" id="primary-navigation"
                    aria-label="Navegação principal">
                    ${pages.map(([url, label]) => `
                        <a href="${url}" class="${url === current ? 'active' : ''} 
                            ${url === 'cadastro.html' ? 'nav-cta' : ''}"
                            ${url === current ? 'aria-current="page"' : ''}>
                            ${label}
                        </a>
                    `).join('')}

                    <a href="https://www.un.org/sustainabledevelopment/" 
                        target="_blank" rel="noopener noreferrer"
                        title="Objetivos de Desenvolvimento Sustentável - site externo">
                        ONU ↗
                    </a>
                </nav>
            </div>
        `;
    }

    if (f) {
        f.innerHTML = `
            <div class="container footer-grid">
                <div>
                    <a href="index.html" id="brandFooter" class="brand">
                        <span class="brand-icon">✳</span>
                        EcoConecta
                    </a>

                    <p style="margin-top:15px;max-width:350px">
                        Pequenas atitudes, grandes transformações.
                        Um portal educativo para hábitos mais sustentáveis.
                    </p>
                </div>

                <div class="footer-column">
                    <strong>Explorar</strong>
                    <div class="footer-links">
                        <a href="dicas.html">Dicas práticas</a>
                        <a href="projetos.html">Projetos</a>
                        <a href="eventos.html">Eventos</a>
                        <a href="galeria.html">Galeria</a>
                    </div>
                </div>

                <div class="footer-column">
                    <strong>Comunidade</strong>
                    <div class="footer-links">
                        <a href="cadastro.html">Participe</a>
                        <a href="contato.html">Contato</a>
                        <a href="painel.html">Meu painel</a>

                        <a href="https://brasil.un.org/pt-br/sdgs"
                            target="_blank" rel="noopener noreferrer">
                            ODS Brasil ↗
                        </a>
                    </div>
                </div>
            </div>

            <div class="container footer-bottom">
                © ${new Date().getFullYear()}
                EcoConecta
            </div>
        `;
    }

    const toggle = document.querySelector('.nav-toggle');

    toggle?.addEventListener('click', () => {
        let n = document.querySelector('.nav-links');

        const open = n.classList.toggle('open');

        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? '✕' : '☰';
    });
}
