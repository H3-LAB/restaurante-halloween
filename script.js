(() => {
  // Ano no rodapé
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Efeitos automáticos, sem interação
  const layer = document.getElementById('fx-layer');
  if (!layer) return;

  const ENTITIES = ['🎃','🎃','🎃','🕷️','🕸️','🦇','👻']; // predominância de abóbora
  const ACTIVE_WINDOW_MS = [5000, 9000];     // duração de cada “rajada” de efeitos
  const IDLE_WINDOW_MS   = [20000, 45000];   // espera entre rajadas (página “normal”)
  const SPAWN_EVERY_MS   = [250, 550];       // frequência de spawns durante a rajada
  const MAX_ON_SCREEN    = 40;               // teto para não poluir

  let burstTimer = null;
  let spawnTimer = null;

  function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function randf(min, max){ return Math.random()*(max-min)+min; }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function spawnOne(){
    if (layer.children.length > MAX_ON_SCREEN) return;

    const el = document.createElement('div');
    el.className = 'fx-entity';
    el.textContent = pick(ENTITIES);

    // posição/tempo variáveis
    el.style.left = Math.round(Math.random()*100) + 'vw';
    el.style.setProperty('--dur', (6 + Math.random()*7) + 's');
    el.style.setProperty('--sway', (2.5 + Math.random()*2.5) + 's');

    layer.appendChild(el);

    // limpeza defensiva
    const ttl = 14000;
    setTimeout(() => el.remove(), ttl);
  }

  function flash(){
    const f = document.createElement('div');
    f.className = 'fx-flash';
    layer.appendChild(f);
    setTimeout(() => f.remove(), 900);
  }

  function startBurst(){
    // flash inicial discreto
    flash();

    // ciclo de spawn
    const spawn = () => spawnOne();
    spawn(); // imediato
    const step = () => {
      spawn();
      const next = rand(SPAWN_EVERY_MS[0], SPAWN_EVERY_MS[1]);
      spawnTimer = setTimeout(step, next);
    };
    step();

    // parar a rajada passado X ms
    const activeMs = rand(ACTIVE_WINDOW_MS[0], ACTIVE_WINDOW_MS[1]);
    burstTimer = setTimeout(stopBurst, activeMs);
  }

  function stopBurst(){
    if (spawnTimer) { clearTimeout(spawnTimer); spawnTimer = null; }
    // deixar as entidades terminar a animação; limpeza “soft”
    setTimeout(() => {
      [...layer.querySelectorAll('.fx-entity')].forEach(n => n.remove());
    }, 3000);

    // agenda próxima rajada
    const idle = rand(IDLE_WINDOW_MS[0], IDLE_WINDOW_MS[1]);
    setTimeout(startBurst, idle);
  }

  // Começa com um pequeno atraso para a página assentar
  setTimeout(startBurst, rand(2000, 5000));
})();
