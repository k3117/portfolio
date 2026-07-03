// ===================================================
// KELLY CARVALHO — INTERAÇÕES
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    const prefereReduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- MENU MOBILE ---------- */
    const btnMenu = document.getElementById('btnMenu');
    const linksPop = document.getElementById('linksPop');

    if (btnMenu && linksPop) {
        btnMenu.addEventListener('click', () => {
            const aberto = linksPop.classList.toggle('aberto');
            btnMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        });

        linksPop.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                linksPop.classList.remove('aberto');
                btnMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- SCROLLSPY ---------- */
    const linksNav = document.querySelectorAll('[data-nav]');
    const secoesObservadas = document.querySelectorAll('main section, main aside, header .hero-secao');

    if ('IntersectionObserver' in window && linksNav.length) {
        const observadorNav = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const id = entrada.target.getAttribute('id');
                    linksNav.forEach((link) => {
                        link.classList.toggle('link-ativo', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px' });

        secoesObservadas.forEach((secao) => observadorNav.observe(secao));
    }

    /* ---------- REVELAR SEÇÕES AO ROLAR ---------- */
    const secoesRevelar = document.querySelectorAll('.secao-revelar');
    if ('IntersectionObserver' in window && secoesRevelar.length && !prefereReduzirMovimento) {
        const observadorRevelar = new IntersectionObserver((entradas, observador) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('em-vista');
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15 });

        secoesRevelar.forEach((secao) => observadorRevelar.observe(secao));
    } else {
        secoesRevelar.forEach((secao) => secao.classList.add('em-vista'));
    }

    /* ---------- CARGOS ROTATIVOS (crossfade) ---------- */
    const cargoRotativo = document.getElementById('cargoRotativo');
    const cargos = [
        'Analista de Suporte Técnico N1',
        'Ouvidoria, Qualidade & Retenção',
        'Estudante de ADS'
    ];

    if (cargoRotativo && !prefereReduzirMovimento) {
        let indice = 0;
        setInterval(() => {
            cargoRotativo.style.opacity = '0';
            setTimeout(() => {
                indice = (indice + 1) % cargos.length;
                cargoRotativo.textContent = cargos[indice];
                cargoRotativo.style.opacity = '1';
            }, 400);
        }, 3200);
    }

    /* ---------- ABAS DE HABILIDADES ---------- */
    const abasBotoes = document.querySelectorAll('.aba-btn');
    const paineis = document.querySelectorAll('[data-painel]');

    abasBotoes.forEach((botao) => {
        botao.addEventListener('click', () => {
            const categoria = botao.dataset.categoria;

            abasBotoes.forEach((b) => {
                b.classList.toggle('is-ativa', b === botao);
                b.setAttribute('aria-selected', b === botao ? 'true' : 'false');
            });

            paineis.forEach((painel) => {
                painel.hidden = painel.dataset.painel !== categoria;
            });
        });
    });

    /* ---------- COPIAR E-MAIL ---------- */
    const btnCopiarEmail = document.getElementById('btnCopiarEmail');
    const feedbackCopiar = document.getElementById('feedbackCopiar');

    if (btnCopiarEmail && feedbackCopiar) {
        btnCopiarEmail.addEventListener('click', async () => {
            const email = btnCopiarEmail.dataset.email;
            try {
                await navigator.clipboard.writeText(email);
                feedbackCopiar.textContent = 'E-mail copiado!';
            } catch (erro) {
                feedbackCopiar.textContent = 'Copie manualmente: ' + email;
            }
            feedbackCopiar.classList.add('visivel');
            setTimeout(() => feedbackCopiar.classList.remove('visivel'), 2200);
        });
    }
});
