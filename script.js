(() => {
      const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

          // Navegação suave
            document.querySelectorAll('a[href^="#"]').forEach(a => {
                a.addEventListener('click', (e) => {
                      const id = a.getAttribute('href');
                            if (!id || id === '#') return;
                                  const target = document.querySelector(id);
                                        if (!target) return;
                                              e.preventDefault();
                                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                        });
                                                          });

                                                            /* =========================
                                                                 Filtros + Pesquisa
                                                                   ========================= */
                                                                     const grid = document.getElementById('menuGrid');
                                                                       const chips = document.querySelectorAll('.chip');
                                                                         const searchInput = document.getElementById('searchInput');

                                                                           let currentFilter = 'all';
                                                                             function applyFilters() {
                                                                                 const q = (searchInput.value || '').trim().toLowerCase();
                                                                                     const cards = grid.querySelectorAll('.card');
                                                                                         cards.forEach(card => {
                                                                                               const inCategory = currentFilter === 'all' || card.classList.contains(currentFilter);
                                                                                                     const hay = (card.textContent + ' ' + (card.dataset.tags || '')).toLowerCase();
                                                                                                           const matches = !q || hay.includes(q);
                                                                                                                 card.style.display = (inCategory && matches) ? '' : 'none';
                                                                                                                     });
                                                                                                                       }

                                                                                                                         chips.forEach(chip => {
                                                                                                                             chip.addEventListener('click', () => {
                                                                                                                                   chips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected','false'); });
                                                                                                                                         chip.classList.add('active'); chip.setAttribute('aria-selected','true');
                                                                                                                                               currentFilter = chip.dataset.filter || 'all';
                                                                                                                                                     applyFilters();
                                                                                                                                                         });
                                                                                                                                                           });

                                                                                                                                                             searchInput.addEventListener('input', applyFilters);
                                                                                                                                                               // Atalho "/"
                                                                                                                                                                 document.addEventListener('keydown', (e) => {
                                                                                                                                                                     if (e.key === '/' && document.activeElement !== searchInput) {
                                                                                                                                                                           e.preventDefault();
                                                                                                                                                                                 searchInput.focus();
                                                                                                                                                                                     }
                                                                                                                                                                                       });

                                                                                                                                                                                         /* =========================
                                                                                                                                                                                              Efeito Halloween (abóboras)
                                                                                                                                                                                                ========================= */
                                                                                                                                                                                                  const pumpkinLayer = document.getElementById('pumpkin-layer');
                                                                                                                                                                                                    const toggleBtn = document.getElementById('toggleHalloween');
                                                                                                                                                                                                      let halloweenOn = false;
                                                                                                                                                                                                        let spawnTimer = null;

                                                                                                                                                                                                          function spawnPumpkin() {
                                                                                                                                                                                                              if (!pumpkinLayer) return;
                                                                                                                                                                                                                  const el = document.createElement('div');
                                                                                                                                                                                                                      el.className = 'pumpkin';
                                                                                                                                                                                                                          el.textContent = Math.random() < 0.15 ? '👻' : '🎃'; // mistura algumas “assombrações”
                                                                                                                                                                                                                              // posição e animações variáveis
                                                                                                                                                                                                                                  el.style.left = Math.round(Math.random() * 100) + 'vw';
                                                                                                                                                                                                                                      el.style.setProperty('--dur', (6 + Math.random() * 6) + 's');
                                                                                                                                                                                                                                          el.style.setProperty('--sway-dur', (2.5 + Math.random() * 2.5) + 's');
                                                                                                                                                                                                                                              pumpkinLayer.appendChild(el);
                                                                                                                                                                                                                                                  // remover no fim
                                                                                                                                                                                                                                                      const removeAfter = 12000;
                                                                                                                                                                                                                                                          setTimeout(() => el.remove(), removeAfter);
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                              function startHalloween() {
                                                                                                                                                                                                                                                                  if (halloweenOn) return;
                                                                                                                                                                                                                                                                      halloweenOn = true;
                                                                                                                                                                                                                                                                          toggleBtn?.setAttribute('aria-pressed', 'true');
                                                                                                                                                                                                                                                                              // rajada inicial
                                                                                                                                                                                                                                                                                  for (let i = 0; i < 10; i++) spawnPumpkin();
                                                                                                                                                                                                                                                                                      spawnTimer = setInterval(() => spawnPumpkin(), 600);
                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                          function stopHalloween() {
                                                                                                                                                                                                                                                                                              halloweenOn = false;
                                                                                                                                                                                                                                                                                                  toggleBtn?.setAttribute('aria-pressed', 'false');
                                                                                                                                                                                                                                                                                                      if (spawnTimer) clearInterval(spawnTimer);
                                                                                                                                                                                                                                                                                                          spawnTimer = null;
                                                                                                                                                                                                                                                                                                              // limpar elementos
                                                                                                                                                                                                                                                                                                                  pumpkinLayer?.querySelectorAll('.pumpkin').forEach(p => p.remove());
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                      toggleBtn?.addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                                          halloweenOn ? stopHalloween() : startHalloween();
                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                              // Ativar automaticamente em Outubro
                                                                                                                                                                                                                                                                                                                                const now = new Date();
                                                                                                                                                                                                                                                                                                                                  if (now.getMonth() === 9) { // 0=Jan ... 9=Out
                                                                                                                                                                                                                                                                                                                                      startHalloween();
                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                          // Primeira aplicação de filtros
                                                                                                                                                                                                                                                                                                                                            applyFilters();
                                                                                                                                                                                                                                                                                                                                            })();
})