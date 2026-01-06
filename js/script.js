document.addEventListener("DOMContentLoaded", function() {

    const navMenu = document.getElementById('main-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    window.toggleMenu = function(event) {
        if (event) event.stopPropagation();
        
        const isOpen = navMenu.classList.contains('active');

        if (!isOpen) {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        } else {
            fecharTudo();
        }
    };

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.stopPropagation();
                
                const content = this.querySelector('.dropdown-content');
                const isOpened = content.classList.contains('show');

                document.querySelectorAll('.dropdown-content').forEach(c => {
                    c.classList.remove('show');
                });

                if (!isOpened) {
                    content.classList.add('show');
                }
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                fecharTudo();
            }
        }
    });

    function fecharTudo() {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; 
        document.querySelectorAll('.dropdown-content').forEach(c => {
            c.classList.remove('show');
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            fecharTudo();
        }
    });
});

const dadosCambio = {
    hoje: {
        path: "polygon(0% 100%, 0% 75%, 15% 60%, 25% 50%, 40% 85%, 55% 55%, 65% 35%, 75% 0%, 85% 15%, 92% 20%, 100% 25%, 100% 100%)",
        variacao: "▲ 1.48%",
        legendas: ["08:00", "11:00", "14:00", "17:00", "20:00"],
        preços: ["A$ 1.35", "A$ 1.36", "A$ 1.34", "A$ 1.38", "A$ 1.37"]
    },
    semana: {
        path: "polygon(0% 100%, 0% 100%, 10% 85%, 25% 66%, 40% 80%, 55% 50%, 65% 70%, 75% 33%, 85% 45%, 92% 15%, 100% 0%, 100% 100%)",
        variacao: "▲ 4.58%",
        legendas: ["Domingo", "Terça", "Quarta", "Quinta", "Sábado"],
        preços: ["A$ 1.31", "A$ 1.33", "A$ 1.32", "A$ 1.35", "A$ 1.37"]
    },
    mes: {
        path: "polygon(0% 100%, 0% 36%, 10% 55%, 25% 80%, 35% 50%, 50% 20%, 65% 35%, 75% 28%, 85% 40%, 92% 15%, 100% 0%, 100% 100%)",
        variacao: "▲ 7.03%",
        legendas: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
        preços: ["A$ 1.28", "A$ 1.17", "A$ 1.32", "A$ 1.30", "A$ 1.37"]
    },
    ano: {
        path: "polygon(0% 100%, 0% 100%, 12% 85%, 25% 92%, 35% 76%, 45% 82%, 55% 48%, 68% 55%, 80% 24%, 88% 35%, 100% 0%, 100% 100%)",
        variacao: "▲ 22.3%",
        legendas: ["Jan-Mar", "Abr-Maio", "Jun-Jul", "Ago-Set", "Out-Dez"],
        preços: ["A$ 1.12", "A$ 1.18", "A$ 1.25", "A$ 1.31", "A$ 1.37"]
    }
};

function atualizarGrafico(periodo, btn) {
    const info = dadosCambio[periodo];
    const grafico = document.getElementById('path-grafico');
    const overlay = document.getElementById('overlay-mouse');
    const legendasDiv = document.getElementById('legendas');
    const varTxt = document.getElementById('txt-variacao');
    if (!grafico || !overlay || !legendasDiv || !varTxt) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const btnInicial = document.querySelector(`.tab-btn[onclick*="${periodo}"]`) || document.querySelector('.tab-btn');
        if (btnInicial) btnInicial.classList.add('active');
    }
    grafico.style.clipPath = info.path;
    varTxt.innerText = info.variacao;
    overlay.innerHTML = '';
    info.preços.forEach(p => {
        const div = document.createElement('div');
        div.className = 'segmento-hover';
        div.setAttribute('data-preço', p);
        overlay.appendChild(div);
    });
    legendasDiv.innerHTML = '';
    info.legendas.forEach(l => {
        const span = document.createElement('span');
        span.innerText = l;
        legendasDiv.appendChild(span);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarGrafico('hoje', null);
});

const categorias = {
    'identidade': [
        'historia.html', 
        'simbolos.html', 
        'cultura.html', 
        'partidos.html', 
        'governantes.html'
    ],
    'territorio': [
        'organizacao.html', 
        'mundo.html'
    ],
    'governo': [
        'ministerios.html', 
        'executivo.html',
        'legislativo.html',
        'judiciario.html'
    ],
    'legislacao': [
        'constituicao.html'
    ],
    'outros': [
        'ineg.html',
        'banco-central.html',
        'forcas_armadas.html',
        'educacao.html'
    ]
};

document.addEventListener("DOMContentLoaded", function() {
    const breadcrumbElement = document.getElementById('breadcrumb-lista');
    if (!breadcrumbElement) return;

    const urlAtual = window.location.pathname.split("/").pop();
    
    let tituloLimpo = document.title.split(' — ')[0].split(' | ')[0];
    let html = `<a href="index.html">Início</a>`;
    let categoriaPai = "";
    let nomePai = "";

    for (let chave in categorias) {
        if (categorias[chave].includes(urlAtual)) {
            categoriaPai = chave + ".html";
            const nomesExibicao = {
                'identidade': 'Identidade',
                'territorio': 'Território',
                'governo': 'Governo',
                'legislacao': 'Legislação',
                'outros': 'Outros'
            }
            nomePai = nomesExibicao[chave] || chave.charAt(0).toUpperCase() + chave.slice(1);
            break;
        }
    }

    if (urlAtual === "index.html" || urlAtual === "") {
        html = `<span class="current-page">Início</span>`;
    } else if (categoriaPai) {
        html += ` <span class="separator">/</span> <a href="${categoriaPai}">${nomePai}</a>`;
        html += ` <span class="separator">/</span> <span class="current-page">${tituloLimpo}</span>`;
    } else {
        html += ` <span class="separator">/</span> <span class="current-page">${tituloLimpo}</span>`;
    }

    breadcrumbElement.innerHTML = html;
});

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. CARREGAR CABEÇALHO ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch("cabecalho.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("header-placeholder").innerHTML = data;
                if (typeof ativarLogicaMenu === "function") ativarLogicaMenu();
                destacarLinkAtivo(); 
            });
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('rodape.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                const anoSpan = document.getElementById('ano-atual');
                if (anoSpan) {
                    anoSpan.textContent = new Date().getFullYear();
                }
            });
    }

    function ativarLogicaMenu() {
        const navMenu = document.getElementById('main-nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        window.toggleMenu = function(event) {
            if (event) event.stopPropagation();
            const isOpen = navMenu.classList.contains('active');
            if (!isOpen) {
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                fecharTudo();
            }
        };

        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(drop => {
            const linkPrincipal = drop.querySelector('.nav-link');

            drop.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    const content = this.querySelector('.dropdown-content');
                    const isOpened = content.classList.contains('show');
                    if (!isOpened) {
                        e.preventDefault();
                        e.stopPropagation();
                        document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
                        content.classList.add('show');
                    } 
                }
            });
        });

        function fecharTudo() {
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
        }

        document.addEventListener('click', function(event) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                    fecharTudo();
                }
            }
        });
    }

    const breadContainer = document.querySelector('.breadcrumb-container');
    const url = window.location.pathname.split("/").pop();
    
    if (url === "index.html" || url === "") {
        const breadContainer = document.querySelector('.breadcrumb-container');
        
        setTimeout(() => {
            if (breadContainer) {
                const alturaAtual = breadContainer.offsetHeight;
                breadContainer.style.height = alturaAtual + 'px';
                setTimeout(() => {
                    breadContainer.style.opacity = "0";
                    breadContainer.style.height = "0";
                    breadContainer.style.paddingTop = "0";
                    breadContainer.style.paddingBottom = "0";
                    breadContainer.style.borderBottomWidth = "0";
                }, 50);

                setTimeout(() => {
                    breadContainer.style.display = "none";
                }, 1050);
            }
        }, 2000);
    }
});

function destacarLinkAtivo() {
    // 1. Pega o final da URL
    let path = window.location.pathname.split("/").pop();
    
    // 2. Se a URL for vazia, ou terminar em "/", ou for index.html, assume que é HOME
    const ehHome = (path === "" || path === "index.html" || path === "index.php");

    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // REGRA PARA O INÍCIO (HOME)
        if (ehHome && (href === "index.html" || href === "./" || href === "index")) {
            link.classList.add('active');
        } 
        // REGRA PARA PÁGINAS NORMAIS
        else if (path !== "" && href === path) {
            link.classList.add('active');
        }

        // REGRA PARA SUBPÁGINAS
        if (typeof categorias !== 'undefined') {
            for (let pai in categorias) {
                if (categorias[pai].includes(path)) {
                    // Se o link atual do menu for o "pai" da subpágina
                    if (href.includes(pai)) {
                        link.classList.add('active');
                    }
                }
            }
        }
    });
}

function toggleTabela() {
    const rows = document.querySelectorAll('.row-hidden');
    const texto = document.getElementById('btnTexto');
    const seta = document.getElementById('btnSeta');
    const estaEscondido = (rows[0].style.display === 'none' || rows[0].style.display === '');

    rows.forEach(r => {
        r.style.display = estaEscondido ? 'table-row' : 'none';
    });

    if (estaEscondido) {
        texto.innerText = 'Ver Principais';
        seta.classList.remove('seta-baixo');
        seta.classList.add('seta-cima');
    } else {
        texto.innerText = 'Ver Cronologia Completa';
        seta.classList.remove('seta-cima');
        seta.classList.add('seta-baixo');
    }
}

function abrirConst(evt, idAlvo) {
    const conteudos = document.querySelectorAll('.const-content');
    conteudos.forEach(c => c.classList.remove('active'));
    const botoes = document.querySelectorAll('.btn-lei');
    botoes.forEach(b => b.classList.remove('active'));
    document.getElementById(idAlvo).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function abrirMapa(caminhoImg, titulo) {
    var modal = document.getElementById("modalMapa");
    var img = document.getElementById("imgNoModal");
    var caption = document.getElementById("caption-modal");
    
    modal.style.display = "flex"; 
    img.src = caminhoImg; 
    caption.innerHTML = titulo; 
}

function fecharMapa() {
    var modal = document.getElementById("modalMapa");
    modal.style.display = "none"; 
}

window.onclick = function(event) {
    var modal = document.getElementById("modalMapa");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function abrirMapa(url, titulo) {
    document.getElementById('imgDinamica').src = url;
    document.getElementById('tituloMapa').innerText = titulo;
    document.getElementById('janelaMapa').style.display = 'flex';
}

function fecharMapa() {
    document.getElementById('janelaMapa').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('cookie-overlay');
    if (!localStorage.getItem('cookiesFederacao')) { 
        setTimeout(() => {
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.classList.add('active');
            }, 100); 
        }, 5000);
    }
});

function fecharCookie() {
    const overlay = document.getElementById('cookie-overlay');
    localStorage.setItem('cookiesFederacao', 'true');
    overlay.classList.remove('active');
    overlay.classList.add('leaving');
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.classList.remove('leaving');
    }, 1500); 
}

function toggleAbaAcess() {
    const aba = document.getElementById('acess-aba');
    aba.classList.toggle('open');
}

let fontSize = 100;
function alterarFonte(acao) {
    if (acao === 'aumentar' && fontSize < 120) fontSize += 5;
    else if (acao === 'diminuir' && fontSize > 85) fontSize -= 5;
    document.documentElement.style.fontSize = fontSize + "%";
}

function toggleContraste() {
    document.body.classList.toggle('alto-contraste');
    localStorage.setItem('altoContraste', document.body.classList.contains('alto-contraste') ? 'ativado' : 'desativado');
}

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('altoContraste') === 'ativado') document.body.classList.add('alto-contraste');
});