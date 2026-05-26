/**
 * ╔══════════════════════════════════════════╗
 * ║   MotoGanhos Pro — Patch v2.0            ║
 * ║   Adiciona antes do </body>:             ║
 * ║   <script src="patch.js"></script>       ║
 * ╚══════════════════════════════════════════╝
 */
(function MotoGanhosPatch() {
    'use strict';

    // ══════════════════════════════════════════
    // 1. CSS NOVOS RECURSOS
    // ══════════════════════════════════════════
    const css = `
        /* ── FAB ── */
        .fab{position:fixed;bottom:1.5rem;right:1.5rem;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#00b894,#00cec9);color:#fff;border:none;cursor:pointer;font-size:1.4rem;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,184,148,.45);z-index:150;transition:all .25s;-webkit-tap-highlight-color:transparent;}
        .fab:hover{transform:scale(1.08);box-shadow:0 8px 30px rgba(0,184,148,.6);}
        .fab.open i{transform:rotate(45deg);}
        .fab i{transition:transform .25s;}
        @media(max-width:640px){.fab{bottom:5.5rem;right:1rem;}}

        /* ── CELEBRAÇÃO ── */
        .cel-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:900;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);}
        .cel-content{text-align:center;z-index:1;padding:2rem;animation:pFadeUp .4s ease;}
        .cel-icon{font-size:5rem;display:block;animation:pBounce 1s infinite;margin-bottom:1rem;}
        .cel-title{font-size:2rem;font-weight:800;color:#fff;margin-bottom:.5rem;}
        .cel-msg{font-size:1rem;color:rgba(255,255,255,.8);margin-bottom:1.5rem;}
        .confetti-wrap{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0;}
        .confetti-p{position:absolute;animation:pConfetti linear forwards;border-radius:2px;}
        @keyframes pConfetti{0%{transform:translateY(-100px) rotate(0deg);opacity:1;}100%{transform:translateY(100vh) rotate(720deg);opacity:0;}}
        @keyframes pBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);}}
        @keyframes pFadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

        /* ── SIMULADOR ── */
        .sim-row{display:flex;justify-content:space-between;align-items:center;padding:.85rem 0;border-bottom:1px solid var(--border);}
        .sim-row:last-of-type{border-bottom:none;}
        .sim-label{font-size:.83rem;color:var(--text);display:flex;align-items:center;gap:.5rem;}
        .sim-controls{display:flex;align-items:center;gap:.5rem;}
        .sim-btn{width:32px;height:32px;border-radius:8px;background:var(--bg);border:2px solid var(--border);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;font-size:.85rem;font-family:'Inter',sans-serif;}
        .sim-btn:hover{background:var(--secondary);color:#fff;border-color:var(--secondary);}
        .sim-val{min-width:90px;text-align:center;font-size:.85rem;font-weight:700;color:var(--text);}

        /* ── TEMA ── */
        .theme-dot{width:40px;height:40px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .2s;display:inline-block;}
        .theme-dot:hover{transform:scale(1.15);}
        .theme-dot.active{border-color:var(--text);box-shadow:0 0 0 3px rgba(0,0,0,.2);transform:scale(1.1);}
        .toggle-sw{position:relative;display:inline-block;width:48px;height:26px;flex-shrink:0;}
        .toggle-sw input{opacity:0;width:0;height:0;}
        .toggle-sl{position:absolute;cursor:pointer;inset:0;background:var(--border);border-radius:26px;transition:.3s;}
        .toggle-sl:before{position:absolute;content:"";height:20px;width:20px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s;}
        input:checked+.toggle-sl{background:var(--secondary);}
        input:checked+.toggle-sl:before{transform:translateX(22px);}

        /* ── VEÍCULO CARD ── */
        .v-card{background:var(--card);border-radius:14px;padding:1.1rem;box-shadow:var(--shadow);margin-bottom:.85rem;border-left:4px solid var(--secondary);}
        .v-card.ativo{background:rgba(0,184,148,.04);}

        /* ── BADGES ── */
        .p-nav-badge{position:absolute;top:4px;right:6px;background:var(--danger);color:#fff;font-size:.5rem;font-weight:800;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 3px;}
        .p-more-badge{position:absolute;top:6px;right:8px;background:var(--danger);color:#fff;font-size:.5rem;font-weight:800;min-width:14px;height:14px;border-radius:7px;display:flex;align-items:center;justify-content:center;}

        /* ── PULL INDICATOR ── */
        .pull-ind{position:fixed;top:62px;left:50%;transform:translateX(-50%) translateY(-100%);background:var(--secondary);color:#fff;padding:.5rem 1.25rem;border-radius:0 0 20px 20px;font-size:.78rem;font-weight:600;z-index:80;transition:transform .3s;display:flex;align-items:center;gap:.5rem;white-space:nowrap;}
        .pull-ind.show{transform:translateX(-50%) translateY(0);}
        .pull-ind i{animation:pSpin .8s linear infinite;}
        @keyframes pSpin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

        /* ── COMPARATIVO ── */
        #pCompCard{display:none;margin-bottom:1rem;}

        /* ── MANUTENÇÃO DATA ── */
        .maint-data{background:rgba(225,112,85,.1);border:1px solid rgba(225,112,85,.3);border-radius:12px;padding:.8rem 1rem;display:flex;align-items:center;gap:.7rem;margin-bottom:.65rem;}
    `;
    if (!document.getElementById('patch-css')) {
        const s = document.createElement('style');
        s.id = 'patch-css';
        s.textContent = css;
        document.head.appendChild(s);
    }

    // ══════════════════════════════════════════
    // 2. HELPERS (reutiliza do script principal)
    // ══════════════════════════════════════════
    const $ = id => document.getElementById(id);
    const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(v) || 0);
    const fmtData = s => { if (!s) return '--'; const [a, m, d] = s.split('-'); return `${d}/${m}/${a}`; };
    const hoje = () => new Date().toISOString().split('T')[0];
    const mesAtual = () => new Date().toISOString().slice(0, 7);
    const loadData = (k, fb) => { try { const d = localStorage.getItem(k); return d ? JSON.parse(d) : fb; } catch { return fb; } };
    const saveData = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };

    // ══════════════════════════════════════════
    // 3. VARIÁVEIS NOVAS
    // ══════════════════════════════════════════
    window.pVeiculos = loadData('p_veiculos', []);
    window.pBonus = loadData('p_bonus', []);
    window.pConfig = loadData('p_config', { tema: '', tema2: '', autoBackup: false, ultimoBackup: null });
    window.pAluguelPeriodoCusto = 'diario';
    window.pAluguelPeriodoEst = 'diario';
    window.pChartType = 'bar';
    window.pSimState = null;
    window.pSimBase = null;

    // ══════════════════════════════════════════
    // 4. HTML — FAB
    // ══════════════════════════════════════════
    if (!$('pFabBtn')) {
        const fab = document.createElement('button');
        fab.id = 'pFabBtn';
        fab.className = 'fab no-print';
        fab.title = 'Registro Rápido';
        fab.innerHTML = '<i class="fas fa-plus"></i>';
        fab.onclick = () => pAbrirFab();
        document.body.appendChild(fab);
    }

    // ══════════════════════════════════════════
    // 5. HTML — FAB MODAL (Registro Rápido)
    // ══════════════════════════════════════════
    if (!$('pFabModal')) {
        const m = document.createElement('div');
        m.id = 'pFabModal';
        m.className = 'modal-overlay';
        m.innerHTML = `
        <div class="modal-box" style="max-width:420px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem">
                <span style="font-size:1rem;font-weight:800;color:var(--text)">⚡ Registro Rápido</span>
                <button class="btn btn-ghost btn-sm" onclick="pFecharFab()"><i class="fas fa-times"></i></button>
            </div>
            <form id="pFabForm" onsubmit="event.preventDefault();pSalvarRapido()">
                <div class="fg"><label class="fl">Data</label><input type="date" id="pFabData" class="fi" required></div>
                <div class="fg"><label class="fl">Valor Ganho (R$)</label>
                    <div class="fi-icon"><span class="ic">R$</span><input type="number" id="pFabValor" step="0.01" min="0.01" class="fi" placeholder="0,00" required></div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem">
                    <div class="fg"><label class="fl">Início</label><input type="time" id="pFabInicio" class="fi" required></div>
                    <div class="fg"><label class="fl">Fim</label><input type="time" id="pFabFim" class="fi" required></div>
                </div>
                <div class="fg"><label class="fl">KM Rodado</label><input type="number" id="pFabKm" step="0.1" min="0.1" class="fi" placeholder="0.0" required></div>
                <div class="fg"><label class="fl">Plataforma</label>
                    <select id="pFabPlat" class="fi">
                        <option value="uber">🚗 Uber</option><option value="99">🟡 99</option>
                        <option value="indrive">🟢 InDrive</option><option value="bolt">⚡ Bolt</option><option value="outro">🔘 Outro</option>
                    </select>
                </div>
                <div class="alert alert-i"><i class="fas fa-info-circle"></i> Usa os últimos valores salvos de consumo, aluguel e combustível.</div>
                <button type="submit" class="btn btn-s btn-lg btn-full" style="margin-top:.5rem"><i class="fas fa-bolt"></i> Salvar Rápido</button>
            </form>
        </div>`;
        m.addEventListener('click', e => { if (e.target === m) pFecharFab(); });
        document.body.appendChild(m);
    }

    // ══════════════════════════════════════════
    // 6. HTML — CELEBRAÇÃO
    // ══════════════════════════════════════════
    if (!$('pCelOverlay')) {
        const c = document.createElement('div');
        c.id = 'pCelOverlay';
        c.className = 'cel-overlay';
        c.style.display = 'none';
        c.innerHTML = `
        <div class="confetti-wrap" id="pConfettiWrap"></div>
        <div class="cel-content">
            <span class="cel-icon">🎉</span>
            <div class="cel-title" id="pCelTitle">Meta Atingida!</div>
            <div class="cel-msg" id="pCelMsg">Parabéns motorista!</div>
            <button class="btn btn-s btn-lg" onclick="pFecharCel()" style="margin-top:1.5rem">Continuar 🚗</button>
        </div>`;
        document.body.appendChild(c);
    }

    // ══════════════════════════════════════════
    // 7. HTML — PULL INDICATOR
    // ══════════════════════════════════════════
    if (!$('pPullInd')) {
        const pi = document.createElement('div');
        pi.id = 'pPullInd';
        pi.className = 'pull-ind';
        pi.innerHTML = '<i class="fas fa-sync-alt"></i> Solte para atualizar';
        document.body.appendChild(pi);
    }

    // ══════════════════════════════════════════
    // 8. HTML — NOVAS ABAS (nav desktop)
    // ══════════════════════════════════════════
    const navTabs = document.querySelector('.nav-tabs');
    if (navTabs && !$('tab-veiculos')) {
        [
            { id: 'veiculos',  icon: 'fas fa-car-alt',             label: 'Veículos'  },
            { id: 'bonus',     icon: 'fas fa-gift',                 label: 'Bônus'     },
            { id: 'simulador', icon: 'fas fa-flask',                label: 'Simulador' },
            { id: 'pconfig',   icon: 'fas fa-cog',                  label: 'Config.'   }
        ].forEach(t => {
            const tab = document.createElement('div');
            tab.className = 'nav-tab';
            tab.id = `tab-${t.id}`;
            tab.onclick = () => pIr(t.id);
            tab.innerHTML = `<i class="${t.icon}"></i><span>${t.label}</span>`;
            navTabs.appendChild(tab);
        });
        // Badge manutenção
        const mt = $('tab-manutencao');
        if (mt && !$('pBadgeNav')) {
            mt.style.position = 'relative';
            const b = document.createElement('span');
            b.id = 'pBadgeNav'; b.className = 'p-nav-badge'; b.style.display = 'none';
            mt.appendChild(b);
        }
    }

    // ══════════════════════════════════════════
    // 9. HTML — NOVOS BOTÕES (more sheet)
    // ══════════════════════════════════════════
    const moreGrid = document.querySelector('.more-grid');
    if (moreGrid && !$('mbtn-veiculos')) {
        [
            { id: 'veiculos',  icon: 'fas fa-car-alt',  color: 'var(--secondary)', label: 'Veículos'  },
            { id: 'bonus',     icon: 'fas fa-gift',      color: 'var(--warning)',   label: 'Bônus'     },
            { id: 'simulador', icon: 'fas fa-flask',     color: 'var(--purple)',    label: 'Simulador' },
            { id: 'pconfig',   icon: 'fas fa-cog',       color: 'var(--text-sub)', label: 'Config.'   }
        ].forEach(b => {
            const btn = document.createElement('div');
            btn.className = 'more-btn'; btn.id = `mbtn-${b.id}`;
            btn.style.position = 'relative';
            btn.onclick = () => { fecharMais && fecharMais(); pIr(b.id); };
            btn.innerHTML = `<i class="${b.icon}" style="font-size:1.4rem;color:${b.color}"></i><span>${b.label}</span>`;
            moreGrid.appendChild(btn);
        });
        // Badge manutenção no more sheet
        const mm = $('mbtn-manutencao');
        if (mm && !$('pBadgeMore')) {
            mm.style.position = 'relative';
            const b = document.createElement('span');
            b.id = 'pBadgeMore'; b.className = 'p-more-badge'; b.style.display = 'none';
            mm.appendChild(b);
        }
    }

    // ══════════════════════════════════════════
    // 10. HTML — COMPARATIVO SEMANAL NO DASHBOARD
    // ══════════════════════════════════════════
    const greeting = document.querySelector('.greeting.fade-up, .greeting');
    if (greeting && !$('pCompCard')) {
        const card = document.createElement('div');
        card.id = 'pCompCard';
        card.className = 'card';
        card.innerHTML = `
        <div class="card-body" style="padding:.85rem 1.25rem">
            <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;color:var(--text-sub);letter-spacing:.06em;margin-bottom:.65rem">
                📊 Esta Semana vs Semana Passada
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem">
                <div>
                    <div style="font-size:.7rem;color:var(--text-sub)">Esta semana</div>
                    <div style="font-size:1.1rem;font-weight:800;color:var(--text)" id="pCompAtual">--</div>
                    <div style="font-size:.72rem;color:var(--text-sub)" id="pCompAtualDias"></div>
                </div>
                <div style="text-align:right">
                    <div style="font-size:.7rem;color:var(--text-sub)">Semana passada</div>
                    <div style="font-size:1.1rem;font-weight:800;color:var(--text)" id="pCompAnt">--</div>
                    <div style="font-size:.72rem" id="pCompDiff"></div>
                </div>
            </div>
        </div>`;
        greeting.insertAdjacentElement('afterend', card);
    }

    // ══════════════════════════════════════════
    // 11. HTML — NOVOS CAMPOS NA CALCULADORA
    // ══════════════════════════════════════════
    (function adicionarCamposCalc() {
        // Bônus do dia
        if ($('valorGanho') && !$('pBonusDia')) {
            const fg = $('valorGanho').closest('.fg');
            if (fg) {
                const div = document.createElement('div');
                div.className = 'fg';
                div.innerHTML = `
                <label class="fl"><i class="fas fa-gift"></i> Bônus/Promoção do dia (R$)
                    <span style="font-weight:400;font-size:.7rem;color:var(--text-sub)">(opcional)</span>
                </label>
                <div class="fi-icon"><span class="ic">R$</span>
                    <input type="number" id="pBonusDia" step="0.01" min="0" class="fi" placeholder="0,00">
                </div>`;
                fg.insertAdjacentElement('afterend', div);
            }
        }
        // KM Vazio
        if ($('kmRodado') && !$('pKmVazio')) {
            const fg = $('kmRodado').closest('.fg');
            if (fg) {
                const div = document.createElement('div');
                div.className = 'fg';
                div.innerHTML = `
                <label class="fl"><i class="fas fa-road" style="opacity:.4"></i> KM sem passageiro
                    <span style="font-weight:400;font-size:.7rem;color:var(--text-sub)">(opcional)</span>
                </label>
                <input type="number" id="pKmVazio" step="0.1" min="0" class="fi" placeholder="0.0">`;
                fg.insertAdjacentElement('afterend', div);
            }
        }
        // Região
        if ($('consumoCarro') && !$('pRegiao')) {
            const fg = $('consumoCarro').closest('.fg');
            if (fg) {
                const div = document.createElement('div');
                div.className = 'fg';
                div.innerHTML = `
                <label class="fl"><i class="fas fa-map-marker-alt"></i> Região/Bairro
                    <span style="font-weight:400;font-size:.7rem;color:var(--text-sub)">(opcional)</span>
                </label>
                <input type="text" id="pRegiao" class="fi" placeholder="Ex: Centro, Zona Sul...">`;
                fg.insertAdjacentElement('afterend', div);
            }
        }
    })();

    // ══════════════════════════════════════════
    // 12. HTML — PERIOD TOGGLE NO CUSTO KM
    // ══════════════════════════════════════════
    (function adicionarPeriodoCusto() {
        const input = $('aluguelCarroCusto');
        if (!input || $('periodDiarioCusto')) return;
        const fg = input.closest('.fg');
        if (!fg) return;
        const toggle = document.createElement('div');
        toggle.className = 'period-toggle';
        toggle.style.marginBottom = '.5rem';
        toggle.innerHTML = `
            <button type="button" class="period-btn active" id="periodDiarioCusto"  onclick="pSetPeriodoCusto('diario')">📅 Diário</button>
            <button type="button" class="period-btn"        id="periodSemanalCusto" onclick="pSetPeriodoCusto('semanal')">📆 Semanal</button>
            <button type="button" class="period-btn"        id="periodMensalCusto"  onclick="pSetPeriodoCusto('mensal')">🗓️ Mensal</button>`;
        const hint = document.createElement('div');
        hint.className = 'aluguel-hint';
        hint.id = 'pHintCusto';
        input.addEventListener('input', () => pAtualizarHintCusto());
        fg.querySelector('label').insertAdjacentElement('afterend', toggle);
        const fiIcon = input.closest('.fi-icon');
        if (fiIcon) fiIcon.insertAdjacentElement('afterend', hint);
        // Campo dias semana p/ custo km
        const kmFg = $('kmRodadoCusto')?.closest('.fg');
        if (kmFg && !$('pDiasSemCusto')) {
            const div = document.createElement('div');
            div.className = 'fg';
            div.innerHTML = `<label class="fl">Dias trabalhados por semana</label>
                <input type="number" id="pDiasSemCusto" min="1" max="7" value="6" class="fi" oninput="pAtualizarHintCusto()">`;
            kmFg.insertAdjacentElement('afterend', div);
        }
    })();

    // ══════════════════════════════════════════
    // 13. HTML — PERIOD TOGGLE NO ESTIMATIVAS
    // ══════════════════════════════════════════
    (function adicionarPeriodoEst() {
        const input = $('aluguelDiario');
        if (!input || $('periodDiarioEst')) return;
        const fg = input.closest('.fg');
        if (!fg) return;
        const toggle = document.createElement('div');
        toggle.className = 'period-toggle';
        toggle.style.marginBottom = '.5rem';
        toggle.innerHTML = `
            <button type="button" class="period-btn active" id="periodDiarioEst"  onclick="pSetPeriodoEst('diario')">📅 Diário</button>
            <button type="button" class="period-btn"        id="periodSemanalEst" onclick="pSetPeriodoEst('semanal')">📆 Semanal</button>
            <button type="button" class="period-btn"        id="periodMensalEst"  onclick="pSetPeriodoEst('mensal')">🗓️ Mensal</button>`;
        const hint = document.createElement('div');
        hint.className = 'aluguel-hint';
        hint.id = 'pHintEst';
        input.addEventListener('input', () => pAtualizarHintEst());
        fg.querySelector('label').insertAdjacentElement('afterend', toggle);
        const fiIcon = input.closest('.fi-icon');
        if (fiIcon) fiIcon.insertAdjacentElement('afterend', hint);
    })();

    // ══════════════════════════════════════════
    // 14. HTML — CAMPO DATA MANUTENÇÃO
    // ══════════════════════════════════════════
    if ($('manutProxKm') && !$('pManutProxData')) {
        const fg = $('manutProxKm').closest('.fg');
        if (fg) {
            const div = document.createElement('div');
            div.className = 'fg';
            div.innerHTML = `<label class="fl">Próxima revisão por data</label>
                <input type="date" id="pManutProxData" class="fi">`;
            fg.insertAdjacentElement('afterend', div);
        }
    }

    // ══════════════════════════════════════════
    // 15. HTML — BOTÕES EXTRAS (CSV Import, PDF, Chart types)
    // ══════════════════════════════════════════
    // Import CSV no Histórico
    const histActions = document.querySelector('#sec-historico .no-print');
    if (histActions && !$('pImportCsvBtn')) {
        const lbl = document.createElement('label');
        lbl.id = 'pImportCsvBtn';
        lbl.className = 'btn btn-i btn-sm';
        lbl.style.cursor = 'pointer';
        lbl.innerHTML = `<i class="fas fa-file-import"></i> Importar CSV
            <input type="file" accept=".csv" style="display:none" onchange="pImportarCSV(this)">`;
        histActions.appendChild(lbl);
    }
    // Chart type buttons
    const graficoHdr = document.querySelector('#graficoContainer .card-hdr');
    if (graficoHdr && !$('pChartBar')) {
        graficoHdr.style.justifyContent = 'space-between';
        const div = document.createElement('div');
        div.style.cssText = 'display:flex;gap:.35rem';
        div.innerHTML = `
            <button onclick="pSetChartType('bar')"  class="btn btn-ghost btn-sm" id="pChartBar"  title="Barras"><i class="fas fa-chart-bar"></i></button>
            <button onclick="pSetChartType('line')" class="btn btn-ghost btn-sm" id="pChartLine" title="Linha"><i class="fas fa-chart-line"></i></button>
            <button onclick="pSetChartType('pie')"  class="btn btn-ghost btn-sm" id="pChartPie"  title="Pizza"><i class="fas fa-chart-pie"></i></button>`;
        graficoHdr.appendChild(div);
    }
    // PDF no Relatório
    const relDiv = document.querySelector('#sec-relatorio .card-body div');
    if (relDiv && !$('pPdfBtn')) {
        const btn = document.createElement('button');
        btn.id = 'pPdfBtn';
        btn.className = 'btn btn-i no-print';
        btn.style.height = '40px';
        btn.innerHTML = '<i class="fas fa-file-pdf"></i> PDF';
        btn.onclick = pExportarPDF;
        relDiv.appendChild(btn);
    }
    // Meta dias semana no Metas
    const metaBtn = document.querySelector('#sec-metas .card-body > button');
    if (metaBtn && !$('pMetaDiasSemana')) {
        const div = document.createElement('div');
        div.className = 'fg';
        div.innerHTML = `<label class="fl"><i class="fas fa-calendar-check"></i> Meta de dias trabalhados por semana</label>
            <input type="number" id="pMetaDiasSemana" min="1" max="7" class="fi" placeholder="Ex: 5">`;
        metaBtn.insertAdjacentElement('beforebegin', div);
    }

    // ══════════════════════════════════════════
    // 16. HTML — NOVAS SEÇÕES
    // ══════════════════════════════════════════
    const main = document.querySelector('main');
    if (main) {
        // VEÍCULOS
        if (!$('sec-veiculos')) {
            main.insertAdjacentHTML('beforeend', `
            <section id="sec-veiculos" class="section">
                <div class="stitle">Meus Veículos</div>
                <div class="ssub">Gerencie seus veículos e acompanhe o odômetro</div>
                <div class="card" style="margin-bottom:1rem">
                    <div class="card-hdr"><i class="fas fa-plus-circle" style="color:var(--secondary)"></i><span class="card-hdr-title">Adicionar Veículo</span></div>
                    <div class="card-body">
                        <form id="pVeiculoForm" onsubmit="event.preventDefault();pSalvarVeiculo()">
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem">
                                <div class="fg"><label class="fl">Nome / Apelido</label><input type="text" id="pVNome" class="fi" placeholder="Ex: Meu HB20" required></div>
                                <div class="fg"><label class="fl">Modelo</label><input type="text" id="pVModelo" class="fi" placeholder="Ex: HB20"></div>
                                <div class="fg"><label class="fl">Ano</label><input type="number" id="pVAno" min="2000" max="2030" class="fi" placeholder="Ex: 2022"></div>
                                <div class="fg"><label class="fl">KM Atual</label><input type="number" id="pVKm" step="1" min="0" class="fi" placeholder="Ex: 45000" required></div>
                                <div class="fg"><label class="fl">Combustível</label>
                                    <select id="pVComb" class="fi">
                                        <option value="gasolina">⛽ Gasolina</option><option value="etanol">🌿 Etanol</option>
                                        <option value="flex">🔄 Flex</option><option value="gnv">💧 GNV</option><option value="diesel">🔵 Diesel</option>
                                    </select>
                                </div>
                                <div class="fg"><label class="fl">Consumo médio (km/L)</label><input type="number" id="pVConsumo" step="0.1" min="1" class="fi" placeholder="Ex: 12.5"></div>
                            </div>
                            <button type="submit" class="btn btn-s btn-lg btn-full"><i class="fas fa-plus"></i> Adicionar</button>
                        </form>
                    </div>
                </div>
                <div id="pVeiculosList"></div>
            </section>`);
        }

        // BÔNUS
        if (!$('sec-bonus')) {
            main.insertAdjacentHTML('beforeend', `
            <section id="sec-bonus" class="section">
                <div class="stitle">Bônus e Promoções</div>
                <div class="ssub">Registre bônus das plataformas separados dos ganhos com corridas</div>
                <div class="card" style="margin-bottom:1rem">
                    <div class="card-hdr"><i class="fas fa-plus-circle" style="color:var(--secondary)"></i><span class="card-hdr-title">Registrar Bônus</span></div>
                    <div class="card-body">
                        <form id="pBonusForm" onsubmit="event.preventDefault();pSalvarBonus()">
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem">
                                <div class="fg"><label class="fl">Data</label><input type="date" id="pBonusData" class="fi" required></div>
                                <div class="fg"><label class="fl">Plataforma</label>
                                    <select id="pBonusPlat" class="fi">
                                        <option value="uber">🚗 Uber</option><option value="99">🟡 99</option>
                                        <option value="indrive">🟢 InDrive</option><option value="bolt">⚡ Bolt</option><option value="outro">🔘 Outro</option>
                                    </select>
                                </div>
                                <div class="fg"><label class="fl">Tipo</label>
                                    <select id="pBonusTipo" class="fi">
                                        <option value="fds">🎯 Bônus Final de Semana</option>
                                        <option value="corridas">🏁 Meta de Corridas</option>
                                        <option value="pico">🌙 Horário de Pico</option>
                                        <option value="indicacao">👥 Indicação</option>
                                        <option value="outro">💰 Outro</option>
                                    </select>
                                </div>
                                <div class="fg"><label class="fl">Valor (R$)</label>
                                    <div class="fi-icon"><span class="ic">R$</span><input type="number" id="pBonusValor" step="0.01" min="0.01" class="fi" placeholder="0,00" required></div>
                                </div>
                                <div class="fg" style="grid-column:1/-1"><label class="fl">Descrição (opcional)</label><input type="text" id="pBonusDesc" class="fi" placeholder="Detalhe o bônus..."></div>
                            </div>
                            <button type="submit" class="btn btn-s btn-lg btn-full"><i class="fas fa-plus"></i> Registrar Bônus</button>
                        </form>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1rem" id="pBonusResumo"></div>
                <div class="card">
                    <div class="card-hdr" style="justify-content:space-between">
                        <div style="display:flex;align-items:center;gap:.65rem"><i class="fas fa-list" style="color:var(--info)"></i><span class="card-hdr-title">Histórico de Bônus</span></div>
                        <select id="pBonusFiltroMes" class="fi" style="width:auto;padding:.3rem .65rem;font-size:.78rem" onchange="pRenderBonus()"><option value="">Todos os meses</option></select>
                    </div>
                    <div style="overflow-x:auto">
                        <table class="dtable">
                            <thead><tr><th>Data</th><th>Plataforma</th><th>Tipo</th><th>Valor</th><th>Descrição</th><th>Ações</th></tr></thead>
                            <tbody id="pBonusCorpo"></tbody>
                        </table>
                    </div>
                </div>
            </section>`);
        }

        // SIMULADOR
        if (!$('sec-simulador')) {
            main.insertAdjacentHTML('beforeend', `
            <section id="sec-simulador" class="section">
                <div class="stitle">Simulador "E se...?"</div>
                <div class="ssub">Simule cenários e veja o impacto no seu lucro mensal</div>
                <div class="card" style="margin-bottom:1rem">
                    <div class="card-hdr"><i class="fas fa-flask" style="color:var(--purple)"></i><span class="card-hdr-title">Ajustar Parâmetros</span></div>
                    <div class="card-body">
                        <div class="alert alert-i" style="margin-bottom:1rem"><i class="fas fa-info-circle"></i> Valores base calculados do seu histórico. Ajuste para simular cenários.</div>
                        <div class="sim-row"><div class="sim-label"><i class="fas fa-calendar-check" style="color:var(--secondary)"></i> Dias por semana</div><div class="sim-controls"><button class="sim-btn" onclick="pSimAj('dias',-1)"><i class="fas fa-minus"></i></button><div class="sim-val" id="pSimDias">6</div><button class="sim-btn" onclick="pSimAj('dias',1)"><i class="fas fa-plus"></i></button></div></div>
                        <div class="sim-row"><div class="sim-label"><i class="fas fa-gas-pump" style="color:var(--danger)"></i> Combustível (R$/L)</div><div class="sim-controls"><button class="sim-btn" onclick="pSimAj('comb',-0.1)"><i class="fas fa-minus"></i></button><div class="sim-val" id="pSimComb">R$ 6,00</div><button class="sim-btn" onclick="pSimAj('comb',0.1)"><i class="fas fa-plus"></i></button></div></div>
                        <div class="sim-row"><div class="sim-label"><i class="fas fa-key" style="color:var(--warning)"></i> Aluguel diário (R$)</div><div class="sim-controls"><button class="sim-btn" onclick="pSimAj('alug',-5)"><i class="fas fa-minus"></i></button><div class="sim-val" id="pSimAlug">R$ 60</div><button class="sim-btn" onclick="pSimAj('alug',5)"><i class="fas fa-plus"></i></button></div></div>
                        <div class="sim-row"><div class="sim-label"><i class="fas fa-road" style="color:var(--info)"></i> KM por dia</div><div class="sim-controls"><button class="sim-btn" onclick="pSimAj('km',-10)"><i class="fas fa-minus"></i></button><div class="sim-val" id="pSimKm">150 km</div><button class="sim-btn" onclick="pSimAj('km',10)"><i class="fas fa-plus"></i></button></div></div>
                        <div class="sim-row" style="border-bottom:none"><div class="sim-label"><i class="fas fa-dollar-sign" style="color:var(--secondary)"></i> Ganho médio por dia</div><div class="sim-controls"><button class="sim-btn" onclick="pSimAj('ganho',-10)"><i class="fas fa-minus"></i></button><div class="sim-val" id="pSimGanho">R$ 200</div><button class="sim-btn" onclick="pSimAj('ganho',10)"><i class="fas fa-plus"></i></button></div></div>
                        <button onclick="pResetSim()" class="btn btn-ghost btn-full" style="margin-top:.75rem"><i class="fas fa-undo"></i> Resetar valores do histórico</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
                    <div class="card" style="padding:1.1rem"><div style="font-size:.7rem;font-weight:700;text-transform:uppercase;color:var(--text-sub);margin-bottom:.5rem">📊 Situação Atual</div><div style="font-size:1.4rem;font-weight:800;color:var(--text)" id="pSimAtual">--</div><div style="font-size:.75rem;color:var(--text-sub)">lucro/mês estimado</div></div>
                    <div class="card" style="padding:1.1rem;background:linear-gradient(135deg,#00b894,#00cec9)"><div style="font-size:.7rem;font-weight:700;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:.5rem">🎯 Simulado</div><div style="font-size:1.4rem;font-weight:800;color:#fff" id="pSimNovo">--</div><div style="font-size:.75rem;color:rgba(255,255,255,.7)">lucro/mês simulado</div></div>
                </div>
                <div class="card"><div class="card-body" id="pSimDetalhes"></div></div>
            </section>`);
        }

        // CONFIG
        if (!$('sec-pconfig')) {
            main.insertAdjacentHTML('beforeend', `
            <section id="sec-pconfig" class="section">
                <div class="stitle">Configurações</div>
                <div class="ssub">Personalize o app ao seu gosto</div>
                <div class="card" style="margin-bottom:1rem">
                    <div class="card-hdr"><i class="fas fa-palette" style="color:var(--secondary)"></i><span class="card-hdr-title">Tema de Cores</span></div>
                    <div class="card-body">
                        <div style="font-size:.78rem;color:var(--text-sub);margin-bottom:.85rem">Escolha a cor primária:</div>
                        <div style="display:flex;flex-wrap:wrap;gap:.65rem;margin-bottom:1rem">
                            <div class="theme-dot active" data-c="#1e3a5f" style="background:#1e3a5f" onclick="pSetTema('#1e3a5f','#2d5a8e')" title="Azul Marinho"></div>
                            <div class="theme-dot" data-c="#6c5ce7" style="background:#6c5ce7" onclick="pSetTema('#6c5ce7','#a29bfe')" title="Roxo"></div>
                            <div class="theme-dot" data-c="#d63031" style="background:#d63031" onclick="pSetTema('#d63031','#e17055')" title="Vermelho"></div>
                            <div class="theme-dot" data-c="#00b894" style="background:#00b894" onclick="pSetTema('#00b894','#00cec9')" title="Verde"></div>
                            <div class="theme-dot" data-c="#e17055" style="background:#e17055" onclick="pSetTema('#e17055','#fdcb6e')" title="Laranja"></div>
                            <div class="theme-dot" data-c="#0984e3" style="background:#0984e3" onclick="pSetTema('#0984e3','#74b9ff')" title="Azul Claro"></div>
                            <div class="theme-dot" data-c="#2d3436" style="background:#2d3436" onclick="pSetTema('#2d3436','#636e72')" title="Carvão"></div>
                        </div>
                        <div class="fg"><label class="fl">Cor personalizada</label>
                            <input type="color" id="pCustomColor" class="fi" style="height:44px;padding:.3rem" onchange="pSetTema(this.value,this.value)">
                        </div>
                    </div>
                </div>
                <div class="card" style="margin-bottom:1rem">
                    <div class="card-hdr"><i class="fas fa-shield-alt" style="color:var(--secondary)"></i><span class="card-hdr-title">Backup Automático</span></div>
                    <div class="card-body">
                        <div class="mrow">
                            <div><div style="font-size:.85rem;font-weight:600;color:var(--text)">Lembrete semanal de backup</div><div style="font-size:.72rem;color:var(--text-sub)">Avisa quando faz mais de 7 dias sem backup</div></div>
                            <label class="toggle-sw"><input type="checkbox" id="pAutoBackupToggle" onchange="pToggleAutoBackup()"><span class="toggle-sl"></span></label>
                        </div>
                        <div class="mrow"><span class="ml">Último backup</span><span class="mv" id="pUltimoBackup" style="color:var(--secondary)">--</span></div>
                        <button onclick="exportarBackup && exportarBackup()" class="btn btn-i btn-full" style="margin-top:.75rem"><i class="fas fa-download"></i> Fazer Backup Agora</button>
                    </div>
                </div>
                <div class="card" style="margin-bottom:1rem">
                    <div class="card-hdr"><i class="fas fa-database" style="color:var(--info)"></i><span class="card-hdr-title">Dados Armazenados</span></div>
                    <div class="card-body">
                        <div class="mrow"><span class="ml">Registros de ganho</span><span class="mv" id="pCfgHist">0</span></div>
                        <div class="mrow"><span class="ml">Abastecimentos</span><span class="mv" id="pCfgAbast">0</span></div>
                        <div class="mrow"><span class="ml">Manutenções</span><span class="mv" id="pCfgManut">0</span></div>
                        <div class="mrow"><span class="ml">Despesas extras</span><span class="mv" id="pCfgDesp">0</span></div>
                        <div class="mrow"><span class="ml">Bônus registrados</span><span class="mv" id="pCfgBonus">0</span></div>
                        <div class="mrow"><span class="ml">Veículos</span><span class="mv" id="pCfgVeic">0</span></div>
                        <hr class="div">
                        <button onclick="pLimparTudo()" class="btn btn-d btn-full"><i class="fas fa-trash"></i> Apagar Todos os Dados</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-hdr"><i class="fas fa-info-circle" style="color:var(--text-sub)"></i><span class="card-hdr-title">Sobre o App</span></div>
                    <div class="card-body">
                        <div class="mrow"><span class="ml">Versão</span><span class="mv">2.0 (Patch)</span></div>
                        <div class="mrow"><span class="ml">Para</span><span class="mv">Motoristas de Aplicativo 🚗</span></div>
                    </div>
                </div>
            </section>`);
        }
    } // fim if(main)

    // ══════════════════════════════════════════
    // 17. FUNÇÕES JAVASCRIPT — FAB
    // ══════════════════════════════════════════
    window.pAbrirFab = function() {
        const m = $('pFabModal'); if (!m) return;
        m.classList.add('open');
        $('pFabData').value = hoje();
        $('pFabBtn').classList.add('open');
    };
    window.pFecharFab = function() {
        $('pFabModal')?.classList.remove('open');
        $('pFabBtn')?.classList.remove('open');
    };
    window.pSalvarRapido = function() {
        const ult = loadData('ultimos_valores', null);
        if (!ult) { toast && toast('Faça pelo menos 1 registro completo primeiro.', 'warning'); return; }
        const data = $('pFabData').value, vg = parseFloat($('pFabValor').value);
        const hi = $('pFabInicio').value, hf = $('pFabFim').value;
        const km = parseFloat($('pFabKm').value), plat = $('pFabPlat').value;
        const cons = parseFloat(ult.consumoCarro) || 10;
        const comb = parseFloat(ult.valorCombustivel) || 0;
        const alug = parseFloat(ult.aluguelCarro) || 0;
        const ds = parseInt(ult.diasSemana) || 6;
        const alugD = alug; // já é diário nos últimos valores
        const lit = km / cons, cc = lit * comb, ct = cc + alugD, luc = vg - ct;
        const ts = new Date(data).getTime();
        const hist = loadData('historico', []);
        if (hist.some(r => r.timestamp === ts)) { toast && toast('Já existe registro para esta data.', 'error'); return; }
        const reg = { data, plataforma: plat, turno: (function(h){const n=parseInt(h.split(':')[0]);return n>=6&&n<12?'manha':n>=12&&n<18?'tarde':'noite';})(hi), valorGanho: vg.toFixed(2), bonusDia: '0.00', horaInicio: hi, horaFim: hf, kmRodado: km.toFixed(1), kmVazio: '0.0', regiao: '', consumoCarro: cons.toFixed(1), aluguelCarro: alugD.toFixed(2), aluguelValorOriginal: alug.toFixed(2), aluguelPeriodo: 'diario', valorCombustivel: comb.toFixed(2), custoCombustivel: cc.toFixed(2), custoTotal: ct.toFixed(2), lucroLiquido: luc.toFixed(2), estimativaSemanal: (luc * ds).toFixed(2), timestamp: ts };
        hist.push(reg); hist.sort((a, b) => b.timestamp - a.timestamp);
        saveData('historico', hist);
        if (window.historico) window.historico = hist;
        pFecharFab(); $('pFabForm').reset(); $('pFabData').value = hoje();
        toast && toast('Registro rápido salvo! 🎉', 'success');
        pAtualizarBadges();
    };

    // ══════════════════════════════════════════
    // 18. FUNÇÕES JAVASCRIPT — CELEBRAÇÃO
    // ══════════════════════════════════════════
    window.pMostrarCel = function(titulo, msg) {
        $('pCelTitle').textContent = titulo;
        $('pCelMsg').textContent = msg;
        $('pCelOverlay').style.display = 'flex';
        const wrap = $('pConfettiWrap'); if (!wrap) return;
        wrap.innerHTML = '';
        const cores = ['#00b894','#fdcb6e','#e17055','#74b9ff','#a29bfe','#fff'];
        for (let i = 0; i < 80; i++) {
            const p = document.createElement('div');
            p.className = 'confetti-p';
            p.style.cssText = `left:${Math.random()*100}%;background:${cores[Math.floor(Math.random()*cores.length)]};width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;animation-duration:${2+Math.random()*3}s;animation-delay:${Math.random()*2}s;border-radius:${Math.random()>.5?'50%':'2px'}`;
            wrap.appendChild(p);
        }
    };
    window.pFecharCel = function() { $('pCelOverlay').style.display = 'none'; };

    // ══════════════════════════════════════════
    // 19. FUNÇÕES JAVASCRIPT — PERÍODO CUSTO KM
    // ══════════════════════════════════════════
    window.pSetPeriodoCusto = function(p) {
        window.pAluguelPeriodoCusto = p;
        ['diario','semanal','mensal'].forEach(x => {
            const btn = $(`period${x.charAt(0).toUpperCase()+x.slice(1)}Custo`);
            if (btn) btn.classList.toggle('active', x === p);
        });
        pAtualizarHintCusto();
    };
    window.pAtualizarHintCusto = function() {
        const val = parseFloat($('aluguelCarroCusto')?.value) || 0;
        const dias = parseInt($('pDiasSemCusto')?.value) || 6;
        const hint = $('pHintCusto'); if (!hint) return;
        if (!val || window.pAluguelPeriodoCusto === 'diario') { hint.classList.remove('show'); return; }
        const d = window.pAluguelPeriodoCusto === 'semanal' ? val/dias : val/30;
        const t = window.pAluguelPeriodoCusto === 'semanal' ? `= ${fmt(d)}/dia (${fmt(val)}/sem ÷ ${dias} dias)` : `= ${fmt(d)}/dia (${fmt(val)}/mês ÷ 30 dias)`;
        hint.textContent = '💡 ' + t; hint.classList.add('show');
    };

    // ══════════════════════════════════════════
    // 20. FUNÇÕES JAVASCRIPT — PERÍODO ESTIMATIVAS
    // ══════════════════════════════════════════
    window.pSetPeriodoEst = function(p) {
        window.pAluguelPeriodoEst = p;
        ['diario','semanal','mensal'].forEach(x => {
            const btn = $(`period${x.charAt(0).toUpperCase()+x.slice(1)}Est`);
            if (btn) btn.classList.toggle('active', x === p);
        });
        pAtualizarHintEst();
    };
    window.pAtualizarHintEst = function() {
        const val = parseFloat($('aluguelDiario')?.value) || 0;
        const dias = parseInt($('diasSemana')?.value) || 6;
        const hint = $('pHintEst'); if (!hint) return;
        if (!val || window.pAluguelPeriodoEst === 'diario') { hint.classList.remove('show'); return; }
        const d = window.pAluguelPeriodoEst === 'semanal' ? val/dias : val/30;
        const t = window.pAluguelPeriodoEst === 'semanal' ? `= ${fmt(d)}/dia (${fmt(val)}/sem ÷ ${dias} dias)` : `= ${fmt(d)}/dia (${fmt(val)}/mês ÷ 30 dias)`;
        hint.textContent = '💡 ' + t; hint.classList.add('show');
    };

    // ══════════════════════════════════════════
    // 21. FUNÇÕES — BADGES MANUTENÇÃO
    // ══════════════════════════════════════════
    window.pAtualizarBadges = function() {
        const manut = loadData('manutencoes', []);
        const hist  = loadData('historico', []);
        const kma   = hist.length ? parseFloat(hist[0].kmRodado) || 0 : 0;
        const n7 = new Date(); n7.setDate(n7.getDate() + 7);
        const alertas = manut.filter(m => {
            const km  = m.proxKm  && kma > 0 && (parseFloat(m.proxKm) - kma) <= 1000;
            const dat = m.proxData && new Date(m.proxData) <= n7;
            return km || dat;
        });
        const show = alertas.length > 0, n = alertas.length > 9 ? '9+' : String(alertas.length);
        [$('pBadgeNav'), $('pBadgeMore')].forEach(el => { if (el) { el.style.display = show ? 'flex' : 'none'; el.textContent = n; } });
    };

    // ══════════════════════════════════════════
    // 22. FUNÇÕES — COMPARATIVO SEMANAL
    // ══════════════════════════════════════════
    window.pRenderComparativo = function() {
        const hist = loadData('historico', []);
        const card = $('pCompCard');
        if (!card || hist.length < 2) { if (card) card.style.display = 'none'; return; }
        card.style.display = 'block';
        const n = new Date();
        const sa  = new Date(n); sa.setDate(sa.getDate()-6);
        const sa2 = new Date(n); sa2.setDate(sa2.getDate()-13);
        const sa3 = new Date(n); sa3.setDate(sa3.getDate()-7);
        const pD = s => { const[a,m,d]=s.split('-').map(Number); return new Date(a,m-1,d); };
        const semA = hist.filter(r => pD(r.data) >= sa);
        const semP = hist.filter(r => { const d = pD(r.data); return d >= sa2 && d < sa3; });
        const ga = semA.reduce((a,r)=>a+parseFloat(r.lucroLiquido),0);
        const gp = semP.reduce((a,r)=>a+parseFloat(r.lucroLiquido),0);
        if ($('pCompAtual'))    $('pCompAtual').textContent = fmt(ga);
        if ($('pCompAtualDias')) $('pCompAtualDias').textContent = `${semA.length} dias`;
        if ($('pCompAnt'))     $('pCompAnt').textContent = fmt(gp);
        if ($('pCompDiff') && gp > 0) {
            const d = ((ga - gp) / gp) * 100;
            $('pCompDiff').innerHTML = `<span style="color:${d>=0?'var(--secondary)':'var(--danger)'};font-weight:700"><i class="fas fa-arrow-${d>=0?'up':'down'}"></i> ${d>=0?'+':''}${d.toFixed(1)}%</span>`;
        }
    };

    // ══════════════════════════════════════════
    // 23. FUNÇÕES — CHART TYPE
    // ══════════════════════════════════════════
    window.pSetChartType = function(type) {
        window.pChartType = type;
        ['bar','line','pie'].forEach(t => {
            const btn = $(`pChart${t.charAt(0).toUpperCase()+t.slice(1)}`);
            if (btn) { btn.classList.toggle('btn-s', t === type); btn.classList.toggle('btn-ghost', t !== type); }
        });
        if (window.atualizarHistorico) atualizarHistorico();
    };

    // ══════════════════════════════════════════
    // 24. FUNÇÕES — IMPORT CSV
    // ══════════════════════════════════════════
    window.pImportarCSV = function(input) {
        const f = input.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = e => {
            try {
                const lines = e.target.result.split('\n').filter(l => l.trim());
                let ok = 0, skip = 0;
                for (let i = 1; i < lines.length; i++) {
                    const c = lines[i].split(';');
                    if (c.length < 4) { skip++; continue; }
                    const data = c[0]?.trim(), vg = parseFloat(c[1] || c[3]);
                    const hi = c[2]?.trim() || '08:00', hf = c[3]?.trim() || '17:00';
                    const km = parseFloat(c[4] || c[6] || 100);
                    if (!data || !vg) { skip++; continue; }
                    const ts = new Date(data).getTime();
                    if (isNaN(ts)) { skip++; continue; }
                    const hist = loadData('historico', []);
                    if (hist.some(x => x.timestamp === ts)) { skip++; continue; }
                    hist.push({ data, valorGanho: vg.toFixed(2), horaInicio: hi, horaFim: hf, kmRodado: km.toFixed(1), consumoCarro: '10.0', aluguelCarro: '0.00', valorCombustivel: '0.00', custoCombustivel: '0.00', custoTotal: '0.00', lucroLiquido: vg.toFixed(2), timestamp: ts, plataforma: 'outro', turno: 'tarde', bonusDia: '0.00' });
                    hist.sort((a,b) => b.timestamp - a.timestamp);
                    saveData('historico', hist);
                    if (window.historico) window.historico = hist;
                    ok++;
                }
                if (window.atualizarHistorico) atualizarHistorico();
                toast && toast(`${ok} importados, ${skip} ignorados.`, ok > 0 ? 'success' : 'warning');
            } catch { toast && toast('Erro ao importar CSV.', 'error'); }
        };
        r.readAsText(f, 'UTF-8'); input.value = '';
    };

    // ══════════════════════════════════════════
    // 25. FUNÇÕES — EXPORT PDF
    // ══════════════════════════════════════════
    window.pExportarPDF = function() {
        const mes = $('relMes')?.value;
        const conteudo = $('resultadoRelatorio')?.innerHTML;
        if (!conteudo || !mes) { toast && toast('Gere o relatório primeiro.', 'warning'); return; }
        const w = window.open('', '_blank');
        w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Relatório ${mes}</title>
        <style>body{font-family:Arial,sans-serif;padding:2rem;color:#1e3a5f;max-width:900px;margin:0 auto}
        .card{border:1px solid #ddd;border-radius:8px;padding:1rem;margin-bottom:1rem;break-inside:avoid}
        .scard{display:inline-block;border:1px solid #ddd;border-radius:8px;padding:.75rem;margin:.25rem;min-width:110px;vertical-align:top}
        .scard.g{border-left:4px solid #00b894}.scard.b{border-left:4px solid #2d5a8e}.scard.r{border-left:4px solid #e17055}.scard.y{border-left:4px solid #fdcb6e}
        .mrow{display:flex;justify-content:space-between;padding:.4rem 0;border-bottom:1px solid #eee}
        .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
        h1{color:#1e3a5f;margin-bottom:1rem}table{width:100%;border-collapse:collapse;font-size:.85rem}
        th,td{border:1px solid #ddd;padding:.4rem .7rem;text-align:left}th{background:#f5f5f5}
        .pbadge{display:inline-block;padding:.15rem .45rem;border-radius:12px;font-size:.75rem;font-weight:700}
        .shift-badge{display:inline-block;padding:.15rem .45rem;border-radius:12px;font-size:.75rem}
        .no-print{display:none}@media print{.no-print{display:none!important}}</style>
        </head><body>
        <h1>📊 Relatório MotoGanhos Pro — ${mes}</h1>
        ${conteudo}
        <div class="no-print" style="margin-top:1.5rem">
            <button onclick="window.print()" style="padding:.75rem 1.5rem;background:#00b894;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;margin-right:.5rem">🖨️ Imprimir / Salvar PDF</button>
            <button onclick="window.close()" style="padding:.75rem 1.5rem;background:#636e72;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem">✕ Fechar</button>
        </div>
        </body></html>`);
        w.document.close();
    };

    // ══════════════════════════════════════════
    // 26. FUNÇÕES — TEMA
    // ══════════════════════════════════════════
    window.pSetTema = function(c1, c2) {
        window.pConfig.tema = c1; window.pConfig.tema2 = c2 || c1;
        saveData('p_config', window.pConfig);
        document.documentElement.style.setProperty('--primary', c1);
        document.documentElement.style.setProperty('--primary-l', c2 || c1);
        const hdr = document.querySelector('.app-header');
        if (hdr) hdr.style.background = `linear-gradient(135deg,${c1} 0%,${c2||c1} 60%,#1a6b5a 100%)`;
        document.querySelectorAll('.theme-dot').forEach(d => d.classList.toggle('active', d.dataset.c === c1));
        toast && toast('Tema atualizado!', 'success');
    };

    // ══════════════════════════════════════════
    // 27. FUNÇÕES — AUTO BACKUP
    // ══════════════════════════════════════════
    window.pToggleAutoBackup = function() {
        const t = $('pAutoBackupToggle'); if (!t) return;
        window.pConfig.autoBackup = t.checked;
        saveData('p_config', window.pConfig);
        toast && toast(t.checked ? 'Lembrete semanal ativado!' : 'Lembrete desativado.', 'success');
    };
    window.pVerificarAutoBackup = function() {
        if (!window.pConfig.autoBackup || !window.pConfig.ultimoBackup) return;
        const diff = (Date.now() - window.pConfig.ultimoBackup) / (1000*60*60*24);
        if (diff >= 7) toast && toast('📦 Já faz 1 semana sem backup! Vá em Config. para fazer backup.', 'warning');
    };

    // ══════════════════════════════════════════
    // 28. FUNÇÕES — CONFIG
    // ══════════════════════════════════════════
    window.pRenderConfig = function() {
        const hist  = loadData('historico', []);
        const abast = loadData('abastecimentos', []);
        const manut = loadData('manutencoes', []);
        const desp  = loadData('despesas', []);
        const bonus = loadData('p_bonus', []);
        const veic  = loadData('p_veiculos', []);
        const cfg   = loadData('p_config', {});
        [['pCfgHist',hist.length],['pCfgAbast',abast.length],['pCfgManut',manut.length],['pCfgDesp',desp.length],['pCfgBonus',bonus.length],['pCfgVeic',veic.length]].forEach(([id,v]) => { const el=$(id); if(el)el.textContent=v; });
        if ($('pUltimoBackup')) $('pUltimoBackup').textContent = cfg.ultimoBackup ? new Date(cfg.ultimoBackup).toLocaleDateString('pt-BR') : '--';
        if ($('pAutoBackupToggle')) $('pAutoBackupToggle').checked = cfg.autoBackup || false;
        if (cfg.tema) { document.querySelectorAll('.theme-dot').forEach(d => d.classList.toggle('active', d.dataset.c === cfg.tema)); }
    };
    window.pLimparTudo = function() {
        showModal && showModal('Apagar Todos os Dados','Isso apagará TODOS os registros permanentemente. Tem certeza?','danger','Apagar Tudo').then(ok => {
            if (!ok) return;
            ['historico','abastecimentos','manutencoes','despesas','timerHistorico','agenda','p_veiculos','p_bonus','rascunho'].forEach(k => localStorage.removeItem(k));
            if (window.historico) window.historico = [];
            toast && toast('Todos os dados foram apagados.', 'success');
            initDashboard && initDashboard();
        });
    };

    // ══════════════════════════════════════════
    // 29. FUNÇÕES — VEÍCULOS
    // ══════════════════════════════════════════
    window.pSalvarVeiculo = function() {
        const nome = $('pVNome')?.value.trim();
        const km   = parseFloat($('pVKm')?.value);
        if (!nome || isNaN(km)) { toast && toast('Preencha nome e KM atual.','error'); return; }
        const v = { id: Date.now(), nome, modelo: $('pVModelo')?.value||'', ano: $('pVAno')?.value||'', kmAtual: km, combustivel: $('pVComb')?.value||'gasolina', consumo: parseFloat($('pVConsumo')?.value)||0, ativo: window.pVeiculos.length===0 };
        window.pVeiculos.push(v); saveData('p_veiculos', window.pVeiculos);
        $('pVeiculoForm').reset(); pRenderVeiculos(); toast && toast('Veículo adicionado!','success');
    };
    window.pRenderVeiculos = function() {
        const list = $('pVeiculosList'); if (!list) return;
        if (!window.pVeiculos.length) { list.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-sub)"><i class="fas fa-car-alt" style="font-size:2rem;display:block;margin-bottom:.5rem"></i>Nenhum veículo cadastrado</div>`; return; }
        list.innerHTML = window.pVeiculos.map(v => `
        <div class="v-card${v.ativo?' ativo':''}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
                <div>
                    <div style="font-size:.95rem;font-weight:700;color:var(--text)">${v.nome}${v.ativo?` <span style="background:var(--secondary);color:#fff;font-size:.65rem;padding:.15rem .5rem;border-radius:20px;font-weight:700">ATIVO</span>`:''}</div>
                    <div style="font-size:.78rem;color:var(--text-sub);margin-top:.2rem">${v.modelo||''} ${v.ano||''} ${v.combustivel?'• '+v.combustivel:''} ${v.consumo?'• '+v.consumo+' km/L':''}</div>
                    <div style="font-size:.85rem;font-weight:600;color:var(--text);margin-top:.35rem">🔢 ${Number(v.kmAtual).toLocaleString('pt-BR')} km</div>
                </div>
                <div style="display:flex;gap:.35rem;flex-wrap:wrap">
                    ${!v.ativo?`<button class="btn btn-s btn-sm" onclick="pAtivarVeiculo(${v.id})"><i class="fas fa-check"></i> Ativar</button>`:''}
                    <button class="btn btn-d btn-sm" onclick="pApagarVeiculo(${v.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>`).join('');
    };
    window.pAtivarVeiculo = function(id) {
        window.pVeiculos.forEach(v => v.ativo = v.id === id);
        saveData('p_veiculos', window.pVeiculos); pRenderVeiculos(); toast && toast('Veículo ativado!','success');
    };
    window.pApagarVeiculo = function(id) {
        showModal && showModal('Apagar Veículo','Deseja apagar este veículo?','danger','Apagar').then(ok => {
            if (!ok) return;
            window.pVeiculos = window.pVeiculos.filter(v => v.id !== id);
            saveData('p_veiculos', window.pVeiculos); pRenderVeiculos(); toast && toast('Veículo apagado.','success');
        });
    };

    // ══════════════════════════════════════════
    // 30. FUNÇÕES — BÔNUS
    // ══════════════════════════════════════════
    const bonusTiposLabel = { fds:'🎯 Final de Semana', corridas:'🏁 Meta Corridas', pico:'🌙 Horário Pico', indicacao:'👥 Indicação', outro:'💰 Outro' };
    window.pSalvarBonus = function() {
        const data = $('pBonusData')?.value;
        const val  = parseFloat($('pBonusValor')?.value);
        if (!data || isNaN(val) || val <= 0) { toast && toast('Preencha todos os campos.','error'); return; }
        const b = { id: Date.now(), data, plataforma: $('pBonusPlat')?.value||'outro', tipo: $('pBonusTipo')?.value||'outro', valor: val.toFixed(2), desc: $('pBonusDesc')?.value||'' };
        window.pBonus.push(b); saveData('p_bonus', window.pBonus);
        $('pBonusForm').reset(); $('pBonusData').value = hoje();
        pRenderBonus(); toast && toast('Bônus registrado!','success');
    };
    window.pRenderBonus = function() {
        const fm = $('pBonusFiltroMes')?.value;
        const filtrado = fm ? window.pBonus.filter(b => b.data.startsWith(fm)) : window.pBonus;
        const corpo = $('pBonusCorpo');
        if (corpo) {
            if (!filtrado.length) {
                corpo.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-sub)"><i class="fas fa-gift" style="font-size:2rem;display:block;margin-bottom:.5rem"></i>Nenhum bônus registrado</td></tr>`;
            } else {
                const plBadge = p => { const m={uber:'background:#000;color:#fff',99:'background:#f9a825;color:#000',indrive:'background:#1dd760;color:#000',bolt:'background:#34d058;color:#000',outro:'background:#636e72;color:#fff'}; const l={uber:'🚗 Uber',99:'🟡 99',indrive:'🟢 InDrive',bolt:'⚡ Bolt',outro:'🔘 Outro'}; return`<span class="pbadge" style="${m[p]||m.outro}">${l[p]||l.outro}</span>`; };
                corpo.innerHTML = [...filtrado].sort((a,b)=>new Date(b.data)-new Date(a.data)).map(b => `<tr><td>${fmtData(b.data)}</td><td>${plBadge(b.plataforma)}</td><td style="font-size:.78rem">${bonusTiposLabel[b.tipo]||b.tipo}</td><td style="color:var(--warning);font-weight:600">${fmt(b.valor)}</td><td style="color:var(--text-sub);font-size:.78rem">${b.desc||'--'}</td><td><button class="btn btn-d btn-sm" onclick="pApagarBonus(${b.id})"><i class="fas fa-trash"></i></button></td></tr>`).join('');
            }
        }
        // Resumo
        const resumo = $('pBonusResumo');
        if (resumo) {
            const total = window.pBonus.reduce((a,b)=>a+parseFloat(b.valor),0);
            const mes = mesAtual();
            const totalMes = window.pBonus.filter(b=>b.data.startsWith(mes)).reduce((a,b)=>a+parseFloat(b.valor),0);
            resumo.innerHTML = window.pBonus.length ? `
                <div class="scard y"><div class="si" style="background:rgba(253,203,110,.12);color:var(--danger);width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:.65rem"><i class="fas fa-gift"></i></div><div class="sl">Total Bônus</div><div class="sv">${fmt(total)}</div></div>
                <div class="scard g"><div class="si" style="background:rgba(0,184,148,.12);color:var(--secondary);width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:.65rem"><i class="fas fa-calendar-alt"></i></div><div class="sl">Este Mês</div><div class="sv">${fmt(totalMes)}</div></div>
                <div class="scard b"><div class="si" style="background:rgba(45,90,142,.1);color:var(--primary-l);width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:.65rem"><i class="fas fa-list"></i></div><div class="sl">Registros</div><div class="sv">${window.pBonus.length}</div></div>` : '';
        }
        // Filtro meses
        const sel = $('pBonusFiltroMes');
        if (sel) {
            const meses = [...new Set(window.pBonus.map(b=>b.data.slice(0,7)))].sort().reverse();
            const cur = sel.value;
            sel.innerHTML = '<option value="">Todos os meses</option>' + meses.map(m=>`<option value="${m}">${m}</option>`).join('');
            sel.value = cur || '';
        }
    };
    window.pApagarBonus = function(id) {
        showModal && showModal('Apagar Bônus','Deseja apagar este registro?','danger','Apagar').then(ok => {
            if (!ok) return;
            window.pBonus = window.pBonus.filter(b=>b.id!==id);
            saveData('p_bonus', window.pBonus); pRenderBonus(); toast && toast('Bônus apagado.','success');
        });
    };

    // ══════════════════════════════════════════
    // 31. FUNÇÕES — SIMULADOR
    // ══════════════════════════════════════════
    window.pIniciarSim = function() {
        const hist = loadData('historico', []);
        if (!hist.length) {
            $('pSimAtual').textContent = '--'; $('pSimNovo').textContent = '--';
            $('pSimDetalhes').innerHTML = '<div class="alert alert-i"><i class="fas fa-info-circle"></i> Registre pelo menos 1 dia para usar o simulador.</div>';
            return;
        }
        const ult = hist.slice(0, 30);
        const aG = ult.reduce((a,r)=>a+parseFloat(r.valorGanho),0) / ult.length;
        const aC = ult.reduce((a,r)=>a+parseFloat(r.valorCombustivel||0),0) / ult.length || 6;
        const aA = ult.reduce((a,r)=>a+parseFloat(r.aluguelCarro||0),0) / ult.length;
        const aK = ult.reduce((a,r)=>a+parseFloat(r.kmRodado),0) / ult.length;
        const aD = 6;
        window.pSimBase  = { dias: aD, comb: aC, alug: aA, km: aK, ganho: aG };
        window.pSimState = { ...window.pSimBase };
        pAtualizarSim();
    };
    window.pSimAj = function(campo, delta) {
        if (!window.pSimState) return;
        if (campo === 'dias') { window.pSimState.dias = Math.min(7, Math.max(1, window.pSimState.dias + delta)); }
        else { window.pSimState[campo] = Math.max(0, +(window.pSimState[campo] + delta).toFixed(2)); }
        pAtualizarSim();
    };
    window.pResetSim = function() { if (window.pSimBase) { window.pSimState = { ...window.pSimBase }; pAtualizarSim(); } };
    window.pAtualizarSim = function() {
        const s = window.pSimState; const b = window.pSimBase; if (!s || !b) return;
        $('pSimDias').textContent = s.dias;
        $('pSimComb').textContent = fmt(s.comb);
        $('pSimAlug').textContent = fmt(s.alug);
        $('pSimKm').textContent = `${s.km.toFixed(0)} km`;
        $('pSimGanho').textContent = fmt(s.ganho);
        const hist = loadData('historico', []);
        const avgCons = hist.length ? hist.reduce((a,r)=>a+parseFloat(r.consumoCarro||10),0)/hist.length : 10;
        const calcMensal = st => { const dm = st.dias * 4.3; const lit = st.km / avgCons; const ct = (lit * st.comb) + st.alug; return (st.ganho - ct) * dm; };
        const lA = calcMensal(b), lN = calcMensal(s), diff = lN - lA;
        $('pSimAtual').textContent = fmt(lA); $('pSimNovo').textContent = fmt(lN);
        const cor = diff >= 0 ? 'var(--secondary)' : 'var(--danger)';
        const ic  = diff >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        $('pSimDetalhes').innerHTML = `
            <div class="mrow"><span class="ml">Dias/semana</span><span class="mv">${b.dias} → <b>${s.dias}</b></span></div>
            <div class="mrow"><span class="ml">Combustível</span><span class="mv">${fmt(b.comb)}/L → <b>${fmt(s.comb)}/L</b></span></div>
            <div class="mrow"><span class="ml">Aluguel/dia</span><span class="mv">${fmt(b.alug)} → <b>${fmt(s.alug)}</b></span></div>
            <div class="mrow"><span class="ml">KM/dia</span><span class="mv">${b.km.toFixed(0)} → <b>${s.km.toFixed(0)}</b> km</span></div>
            <div class="mrow"><span class="ml">Ganho/dia</span><span class="mv">${fmt(b.ganho)} → <b>${fmt(s.ganho)}</b></span></div>
            <div class="mrow" style="padding-top:.65rem"><span class="ml"><b>Impacto mensal</b></span><span class="mv" style="color:${cor};font-size:1.05rem;font-weight:800"><i class="fas ${ic}"></i> ${diff>=0?'+':''}${fmt(diff)}</span></div>`;
    };

    // ══════════════════════════════════════════
    // 32. NAVEGAÇÃO — pIr (novas seções)
    // ══════════════════════════════════════════
    window.pIr = function(sec) {
        const novas = ['veiculos','bonus','simulador','pconfig'];
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        const el = $(`sec-${sec}`); if (el) el.classList.add('active');
        const tb = $(`tab-${sec}`); if (tb) tb.classList.add('active');
        document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
        const mais = $('bnav-mais'); if (mais) mais.classList.add('active');
        if (sec === 'veiculos')  pRenderVeiculos();
        if (sec === 'bonus')     pRenderBonus();
        if (sec === 'simulador') pIniciarSim();
        if (sec === 'pconfig')   pRenderConfig();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ══════════════════════════════════════════
    // 33. PULL TO REFRESH
    // ══════════════════════════════════════════
    (function() {
        let sy = 0, pulling = false;
        document.addEventListener('touchstart', e => { if (window.scrollY === 0) sy = e.touches[0].clientY; }, { passive: true });
        document.addEventListener('touchmove', e => {
            if (e.touches[0].clientY - sy > 70 && window.scrollY === 0) {
                pulling = true; $('pPullInd')?.classList.add('show');
            }
        }, { passive: true });
        document.addEventListener('touchend', () => {
            if (pulling) {
                pulling = false; $('pPullInd')?.classList.remove('show');
                initDashboard && initDashboard();
                toast && toast('Atualizado!', 'info');
            }
        }, { passive: true });
    })();

    // ══════════════════════════════════════════
    // 34. SWIPE ENTRE ABAS
    // ══════════════════════════════════════════
    (function() {
        let sx = 0;
        const tabs = ['dashboard','timer','calculadora','historico'];
        const mainEl = document.querySelector('main');
        if (!mainEl) return;
        mainEl.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
        mainEl.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - sx;
            if (Math.abs(dx) < 80) return;
            const cur = document.querySelector('.section.active');
            if (!cur) return;
            const id = cur.id.replace('sec-','');
            const idx = tabs.indexOf(id); if (idx === -1) return;
            if (dx < 0 && idx < tabs.length-1 && window.ir) ir(tabs[idx+1]);
            if (dx > 0 && idx > 0 && window.ir) ir(tabs[idx-1]);
        }, { passive: true });
    })();

    // ══════════════════════════════════════════
    // 35. OVERRIDE initDashboard — celebração + comparativo
    // ══════════════════════════════════════════
    const _origDash = window.initDashboard;
    window.initDashboard = function() {
        if (_origDash) _origDash.apply(this, arguments);
        pRenderComparativo();
        pAtualizarBadges();
        pVerificarAutoBackup();
        // Verificar celebração meta diária
        const metas = loadData('metas', {});
        const md = parseFloat(metas.diaria) || 0;
        const hs = hoje();
        const hist = loadData('historico', []);
        const rh = hist.find(r => r.data === hs);
        const lh = rh ? parseFloat(rh.lucroLiquido) : 0;
        if (md > 0 && lh >= md && !loadData(`p_cel_${hs}`, false)) {
            saveData(`p_cel_${hs}`, true);
            setTimeout(() => pMostrarCel('🎯 Meta Diária Atingida!', `Parabéns! Você atingiu ${fmt(lh)} hoje! 🎉`), 800);
        }
    };

    // ══════════════════════════════════════════
    // 36. OVERRIDE salvarDados — salva últimos valores
    // ══════════════════════════════════════════
    const _origSalvar = window.salvarDados;
    window.salvarDados = function() {
        const r = _origSalvar ? _origSalvar.apply(this, arguments) : false;
        if (r !== false) {
            const cons = parseFloat($('consumoCarro')?.value) || 10;
            const alug = parseFloat($('aluguelCarro')?.value) || 0;
            const comb = parseFloat($('valorCombustivel')?.value) || 0;
            const ds   = parseInt($('diasSemanaCalc')?.value) || 6;
            const per  = window.aluguelPeriodo || 'diario';
            const alugD = per === 'semanal' ? alug/ds : per === 'mensal' ? alug/30 : alug;
            saveData('ultimos_valores', { consumoCarro: cons.toFixed(1), aluguelCarro: alugD.toFixed(2), aluguelValorOriginal: alug.toFixed(2), aluguelPeriodo: per, valorCombustivel: comb.toFixed(2), diasSemana: ds });
        }
        return r;
    };

    // ══════════════════════════════════════════
    // 37. OVERRIDE renderManutencoes — alertas por data
    // ══════════════════════════════════════════
    const _origManut = window.renderManutencoes;
    window.renderManutencoes = function() {
        if (_origManut) _origManut.apply(this, arguments);
        // Alertas por data
        const manut = loadData('manutencoes', []);
        const n7 = new Date(); n7.setDate(n7.getDate() + 7);
        const hoje2 = new Date();
        const alertasData = manut.filter(m => m.proxData && new Date(m.proxData) <= n7);
        const alertasEl = $('manutAlertas');
        if (alertasEl && alertasData.length) {
            alertasData.forEach(m => {
                const d = new Date(m.proxData);
                const diff = Math.ceil((d - hoje2) / (1000*60*60*24));
                const venceu = diff <= 0;
                const alerta = document.createElement('div');
                alerta.className = 'maint-data';
                alerta.innerHTML = `<i class="fas fa-calendar-exclamation" style="color:${venceu?'var(--danger)':'var(--warning)'}"></i><div style="font-size:.82rem"><strong>${m.tipo}</strong>: ${venceu ? `<span style="color:var(--danger)">Revisão vencida! (${d.toLocaleDateString('pt-BR')})</span>` : `Próxima revisão em <strong>${diff} dia(s)</strong> — ${d.toLocaleDateString('pt-BR')}`}</div>`;
                alertasEl.appendChild(alerta);
            });
        }
        pAtualizarBadges();
    };

    // ══════════════════════════════════════════
    // 38. OVERRIDE salvarManutencao — campo data
    // ══════════════════════════════════════════
    const _origSalvarManut = window.salvarManutencao;
    window.salvarManutencao = function() {
        const proxData = $('pManutProxData')?.value || null;
        if (_origSalvarManut) _origSalvarManut.apply(this, arguments);
        if (proxData) {
            const manut = loadData('manutencoes', []);
            if (manut.length > 0) {
                manut[manut.length - 1].proxData = proxData;
                saveData('manutencoes', manut);
                if (window.manutencoes) window.manutencoes = manut;
            }
        }
    };

    // ══════════════════════════════════════════
    // 39. OVERRIDE gerarRelatorio — adiciona bônus
    // ══════════════════════════════════════════
    const _origRel = window.gerarRelatorio;
    window.gerarRelatorio = function() {
        if (_origRel) _origRel.apply(this, arguments);
        // Adicionar seção de bônus ao relatório
        setTimeout(() => {
            const mes = $('relMes')?.value; if (!mes) return;
            const bonusMes = window.pBonus.filter(b => b.data.startsWith(mes));
            const relDiv = $('resultadoRelatorio');
            if (relDiv && bonusMes.length > 0 && !$('pRelBonusSection')) {
                const totalBonus = bonusMes.reduce((a,b)=>a+parseFloat(b.valor),0);
                relDiv.insertAdjacentHTML('beforeend', `
                <div class="card" id="pRelBonusSection" style="margin-top:1rem">
                    <div class="card-hdr"><i class="fas fa-gift" style="color:var(--warning)"></i><span class="card-hdr-title">Bônus do Mês — ${fmt(totalBonus)}</span></div>
                    <div style="overflow-x:auto"><table class="dtable">
                        <thead><tr><th>Data</th><th>Tipo</th><th>Valor</th><th>Descrição</th></tr></thead>
                        <tbody>${bonusMes.map(b=>`<tr><td>${fmtData(b.data)}</td><td style="font-size:.78rem">${bonusTiposLabel[b.tipo]||b.tipo}</td><td style="color:var(--warning);font-weight:600">${fmt(b.valor)}</td><td style="color:var(--text-sub)">${b.desc||'--'}</td></tr>`).join('')}</tbody>
                    </table></div>
                </div>`);
            }
        }, 300);
    };

    // ══════════════════════════════════════════
    // 40. APLICAR TEMA SALVO
    // ══════════════════════════════════════════
    if (window.pConfig.tema) {
        document.documentElement.style.setProperty('--primary', window.pConfig.tema);
        document.documentElement.style.setProperty('--primary-l', window.pConfig.tema2 || window.pConfig.tema);
        const hdr = document.querySelector('.app-header');
        if (hdr) hdr.style.background = `linear-gradient(135deg,${window.pConfig.tema} 0%,${window.pConfig.tema2||window.pConfig.tema} 60%,#1a6b5a 100%)`;
    }

    // ══════════════════════════════════════════
    // 41. INICIALIZAÇÃO FINAL
    // ══════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
        $('pFabData') && ($('pFabData').value = hoje());
        $('pBonusData') && ($('pBonusData').value = hoje());
        pRenderComparativo();
        pAtualizarBadges();
        pVerificarAutoBackup();
    });

    // Se o DOM já carregou
    if (document.readyState !== 'loading') {
        $('pFabData') && ($('pFabData').value = hoje());
        $('pBonusData') && ($('pBonusData').value = hoje());
        setTimeout(() => {
            pRenderComparativo();
            pAtualizarBadges();
            pVerificarAutoBackup();
            console.log('%c✅ MotoGanhos Patch v2.0 aplicado!', 'color:#00b894;font-weight:bold;font-size:14px');
            console.log('%c📋 Novos recursos:', 'color:#74b9ff', 'FAB • Celebração • Comparativo Semanal • Veículos • Bônus • Simulador • Config/Tema • Gráfico Pizza • Import CSV • Export PDF • Pull-to-Refresh • Swipe Abas • Period Toggle (Custo KM & Estimativas) • Badges Manutenção • Alertas por Data');
        }, 600);
    }

})(); // fim do patch