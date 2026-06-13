/* ============================================================
   Moteur : rendu, marquee drift, accordéon, clavier, swipe
   ============================================================ */
(function(){
  const DATA = window.PORTFOLIO;
  const app = document.getElementById('app');
  const stage = document.getElementById('stage');
  const rail = document.getElementById('rail');
  const hud = document.getElementById('hud');

  const dir = 'a';
  let mIdx = 0;
  let pIdx = 0;
  let openProject = null;

  // -------- icônes --------
  const icoUp = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  const icoDown = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  const icoLeft = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
  const icoRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
  const icoX = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';

  // -------- rendu --------
  function slot(id, ph, h){
    return `<image-slot id="${id}" shape="rounded" radius="5" fit="contain" placeholder="${ph}"${h?` style="height:${h}"`:''}></image-slot>`;
  }
  function cardHTML(m, p, i){
    const slug = p.slug + '_' + (p.gallery[0]||'hero');
    return `<button class="card" data-m="${m}" data-p="${i}">
      <div class="card3d">
        <div class="thumb-wrap">
          ${slot('slot_'+slug, p.nom)}
          <div class="fx fx-irid"></div>
          <div class="fx fx-noise"></div>
          <div class="fx fx-glow"></div>
        </div>
        <div class="card-x" aria-hidden="true">${icoX}</div>
      </div>
      <div class="cap"><b><span class="idx">${String(i+1).padStart(2,'0')}</span> ${p.nom}</b><span>${p.sub}</span></div>
    </button>`;
  }
  function metierHTML(me, mi){
    const cards = me.projets.map((p,i)=>cardHTML(mi,p,i)).join('');
    return `<section class="metier" data-idx="${mi}" data-metier="${me.id}">
      <div class="metier-bg" aria-hidden="true"></div>
      <div class="metier-info">
        <div class="metier-head">
          <span class="metier-num">${me.num} / 04</span>
          <h2 class="metier-title">${me.titre}</h2>
          <p class="metier-tagline">${me.tagline}</p>
        </div>
        <div class="metier-side">
          <p class="metier-body">${me.body}</p>
          <ul class="metier-meta">${me.meta.map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="marquee"><div class="track" data-m="${mi}">${cards}</div></div>
      <div class="metier-detail" data-detail="${mi}"></div>
    </section>`;
  }

  function build(){
    stage.innerHTML = DATA.metiers.map(metierHTML).join('');
    rail.innerHTML = '<div class="rail-head"><h3>Sommaire</h3></div>' +
      DATA.metiers.map((me,i)=>`<button class="rail-item" data-idx="${i}"><span class="rn">${me.num}</span><span class="rt">${me.titre}</span></button>`).join('');
    hud.innerHTML =
      `<button class="nav-btn" data-nav="up" aria-label="Métier précédent">${icoUp}</button>` +
      DATA.metiers.map((_,i)=>`<button class="dot" data-idx="${i}" aria-label="Métier ${i+1}"></button>`).join('') +
      `<button class="nav-btn" data-nav="down" aria-label="Métier suivant">${icoDown}</button>`;
    wire();
    setMetier(0, true);
  }

  // -------- navigation métier --------
  function tracks(){ return [...stage.querySelectorAll('.track')]; }
  function metierEls(){ return [...stage.querySelectorAll('.metier')]; }

  function tweenScrollTop(el, to, dur){
    if(el._scrollRaf) cancelAnimationFrame(el._scrollRaf);
    el.style.scrollSnapType='none';
    const from = el.scrollTop, t0 = performance.now();
    dur = dur||520;
    (function step(now){
      const t = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-t,3);
      el.scrollTop = from + (to-from)*e;
      if(t<1){ el._scrollRaf = requestAnimationFrame(step); }
      else { el._scrollRaf = 0; el.scrollTop = to; setTimeout(()=>{ el.style.scrollSnapType=''; }, 60); }
    })(t0);
  }

  function setMetier(i, instant){
    if(openProject) closeDetail();
    mIdx = Math.max(0, Math.min(DATA.metiers.length-1, i));
    pIdx = 0;
    metierEls().forEach((el,k)=> el.toggleAttribute('data-active', k===mIdx));
    rail.querySelectorAll('.rail-item').forEach((el,k)=> el.setAttribute('aria-current', k===mIdx));
    hud.querySelectorAll('.dot').forEach((el,k)=> el.setAttribute('aria-current', k===mIdx));
    const el = metierEls()[mIdx];
    if(el){
      if(instant){
        stage.style.scrollSnapType='none';
        stage.scrollTop = el.offsetTop - 4;
        setTimeout(()=>{ stage.style.scrollSnapType=''; }, 60);
      } else {
        tweenScrollTop(stage, el.offsetTop - 4);
      }
    }
    markFocus();
  }

  // -------- focus projet + scroll marquee --------
  function activeTrack(){
    return tracks()[visibleMetier()];
  }
  function visibleMetier(){
    const els = metierEls(); let best=0, bd=Infinity;
    els.forEach((el,k)=>{ const d=Math.abs(el.offsetTop - stage.scrollTop); if(d<bd){bd=d;best=k;} });
    return best;
  }
  function markFocus(){
    const t = activeTrack(); if(!t) return;
    [...t.children].forEach((c,k)=>{
      c.classList.toggle('is-focus', k===pIdx);
      flipCard(c, (openProject && k===openProject.p) ? 180 : 0);
    });
    recenter(t, pIdx);
  }
  function recenter(t, idx){
    const card = [...t.children][idx]; if(!card) return;
    t.scrollLeft = card.offsetLeft - t.clientWidth/2 + card.clientWidth/2;
  }
  function keepCentered(t, idx, ms){
    const t0 = performance.now();
    (function loop(now){
      recenter(t, idx);
      if(now - t0 < ms) requestAnimationFrame(loop);
    })(t0);
  }
  function moveProject(d){
    if(openProject){ stepDetail(d); return; }
    const me = DATA.metiers[visibleMetier()];
    const n = me.projets.length;
    pIdx = (pIdx + d + n) % n;
    markFocus();
  }

  // -------- marquee auto-drift --------
  let last = performance.now();
  function drift(now){
    const dt = (now-last)/1000; last=now;
    tracks().forEach(t=>{
      if(t.dataset.pause==='1') return;
      const max = t.scrollWidth - t.clientWidth;
      if(max<=0) return;
      if(t._dir===undefined) t._dir=1;
      let nl = t.scrollLeft + t._dir*(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--drift'))||36)*dt;
      if(nl>=max){ nl=max; t._dir=-1; }
      else if(nl<=0){ nl=0; t._dir=1; }
      t.scrollLeft = nl;
    });
    requestAnimationFrame(drift);
  }
  requestAnimationFrame(drift);

  // -------- détail projet inline --------
  let openTimer = 0;
  let closeTimers = [];

  const STRIP_GAP = 24;
  function stripStep(detail){ return detail.clientWidth*0.87 + STRIP_GAP; }
  function setStripX(strip, x){ strip.dataset.x = String(x); strip.style.transform = `translateX(${x}px)`; }
  function cancelStrip(strip){ if(strip._raf){ cancelAnimationFrame(strip._raf); strip._raf = 0; } }
  function tweenStrip(strip, toX, dur){
    cancelStrip(strip);
    const from = parseFloat(strip.dataset.x||'0'), t0 = performance.now();
    dur = dur || 480;
    (function step(now){
      const t = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-t,3);
      setStripX(strip, from+(toX-from)*e);
      strip._raf = t<1 ? requestAnimationFrame(step) : 0;
    })(t0);
  }

  function slideMarkup(me, p){
    const pr = me.projets[p];
    const gal = (pr.gallery||[]);
    const duo = [gal[1]||'sub1', gal[2]||'sub2'];
    const heroSlides = [gal[0]||'hero'].concat(gal.slice(3), ['xl1','xl2']);
    return `<div class="md-front">
      <div class="md-figure">
        <div class="md-hero">
          <div class="md-hview"><div class="md-htrack">
            ${heroSlides.map(g=>`<div class="md-hslide">${slot('slot_'+pr.slug+'_'+g, (g==='xl1'||g==='xl2')?'Ajouter un visuel':pr.nom)}</div>`).join('')}
          </div></div>
          <button class="md-harrow md-hprev" aria-label="Visuel précédent">${icoLeft}</button>
          <button class="md-harrow md-hnext" aria-label="Visuel suivant">${icoRight}</button>
          <div class="md-hdots">${heroSlides.map((_,i)=>`<button class="dot" data-h="${i}" aria-label="Visuel ${i+1}"></button>`).join('')}</div>
        </div>
      </div>
      <div class="md-meta">
        <p class="pclient">${pr.client}</p>
        <h3 class="ptitle">${pr.nom}</h3>
        <p class="psub">${pr.sub}</p>
        <p class="pdesc">${pr.desc}</p>
        <div class="md-duo">
          ${duo.map(g=>slot('slot_'+pr.slug+'_'+g, 'Visuel')).join('')}
        </div>
      </div>
    </div>`;
  }
  function buildSlide(me, p){
    const el = document.createElement('div');
    el.className = 'md-slide';
    el.innerHTML = slideMarkup(me, p);
    el.querySelectorAll('[data-d]').forEach(b=> b.onclick = ev=>{ ev.stopPropagation(); stepDetail(+b.dataset.d); });
    const hview = el.querySelector('.md-hview');
    const htrack = el.querySelector('.md-htrack');
    const hdots = [...el.querySelectorAll('.md-hdots .dot')];
    let hIdx = 0;
    function goH(i){
      const n = htrack.children.length;
      hIdx = Math.max(0, Math.min(n-1, i));
      tweenStrip(htrack, -hIdx*hview.clientWidth, 380);
      hdots.forEach((d,k)=> d.setAttribute('aria-current', k===hIdx));
    }
    el.querySelector('.md-hprev').onclick = ev=>{ ev.stopPropagation(); goH(hIdx-1); };
    el.querySelector('.md-hnext').onclick = ev=>{ ev.stopPropagation(); goH(hIdx+1); };
    hdots.forEach((d,k)=> d.onclick = ev=>{ ev.stopPropagation(); goH(k); });
    hdots[0].setAttribute('aria-current','true');
    return el;
  }

  function flipCard(card, to){
    const el = card.querySelector('.card3d'); if(!el) return;
    const from = parseFloat(card.dataset.flip||'0');
    if(from===to) return;
    card.dataset.flip = String(to);
    el.style.transition = 'none';
    el.style.transformStyle = 'preserve-3d';
    const t0 = performance.now(), dur = 460;
    (function step(now){
      const t = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-t,3);
      const v = from+(to-from)*e;
      el.style.transform = `rotateY(${v.toFixed(2)}deg)`;
      if(t<1){ requestAnimationFrame(step); }
      else if(to===0){ el.style.transform=''; el.style.transition=''; }
      else { el.style.transform = `rotateY(${to}deg)`; }
    })(t0);
  }

  function renderDetail(section, m, p){
    const me = DATA.metiers[m];
    const detail = section.querySelector('.metier-detail');
    detail.innerHTML = `<div class="md-strip"></div>`;
    const strip = detail.querySelector('.md-strip');
    me.projets.forEach((_,i)=> strip.appendChild(buildSlide(me, i)));
    wireStrip(detail, strip, m);
    requestAnimationFrame(()=> setStripX(strip, -p*stripStep(detail)));
  }

  function wireStrip(detail, strip, m){
    let down=false, dragging=false, sx=0, x0=0, pid=null;
    detail.addEventListener('pointerdown', e=>{
      if(e.target.closest('.nav-btn,.md-harrow,.md-hdots')) return;
      down=true; dragging=false; sx=e.clientX; x0=parseFloat(strip.dataset.x||'0'); pid=e.pointerId;
      cancelStrip(strip);
    });
    detail.addEventListener('pointermove', e=>{
      if(!down) return;
      const dx = e.clientX - sx;
      if(!dragging && Math.abs(dx)>8){ dragging=true; detail.dataset.drag='1'; try{ detail.setPointerCapture(pid); }catch(_){ } }
      if(dragging){
        const n = DATA.metiers[m].projets.length, step = stripStep(detail), min = -(n-1)*step;
        let x = x0 + dx;
        if(x>0) x = x/3;
        if(x<min) x = min + (x-min)/3;
        setStripX(strip, x);
      }
    });
    const up = e=>{
      if(!down) return; down=false;
      if(!dragging) return;
      const n = DATA.metiers[m].projets.length, step = stripStep(detail);
      const dx = e.clientX - sx;
      const threshold = Math.min(45, step*0.18);
      let idx;
      if(dx < -threshold) idx = openProject.p + 1;
      else if(dx >  threshold) idx = openProject.p - 1;
      else idx = openProject.p;
      goToProject(idx);
      setTimeout(()=>{ detail.dataset.drag='0'; }, 60);
    };
    detail.addEventListener('pointerup', up);
    detail.addEventListener('pointercancel', up);
  }

  function goToProject(np){
    if(!openProject) return;
    const me = DATA.metiers[openProject.m], n = me.projets.length;
    np = Math.max(0, Math.min(n-1, np));
    const section = metierEls()[openProject.m];
    const detail = section.querySelector('.metier-detail');
    const strip = detail.querySelector('.md-strip');
    openProject = {m:openProject.m, p:np}; pIdx = np;
    if(strip) tweenStrip(strip, -np*stripStep(detail));
    markFocus();
  }

  function openDetail(m, p){
    const me = DATA.metiers[m];
    p = ((p % me.projets.length) + me.projets.length) % me.projets.length;
    const section = metierEls()[m];
    const already = section.classList.contains('is-open') && openProject && openProject.m===m;
    if(already && openProject.p===p){ closeDetail(); return; }
    if(already && openProject.p!==p){
      stepDetail(p > openProject.p ? 1 : -1, p);
      return;
    }
    openProject = {m, p}; pIdx = p; mIdx = m;
    closeTimers.forEach(clearTimeout); closeTimers = [];
    section.classList.remove('is-closing');
    const t = section.querySelector('.track'); if(t) t.dataset.pause='1';
    renderDetail(section, m, p);
    if(already){ section.classList.add('is-detail'); markFocus(); return; }
    section.classList.add('is-open');
    app.classList.add('detail-open');
    tweenScrollTop(stage, section.offsetTop - 4);
    markFocus();
    clearTimeout(openTimer);
    openTimer = setTimeout(()=> section.classList.add('is-detail'), 430);
  }

  function stepDetail(d, target){
    if(!openProject) return;
    goToProject(target!=null ? target : openProject.p + d);
  }

  // Fermeture décomposée en 3 temps
  function closeDetail(){
    if(!openProject) return;
    const section = metierEls()[openProject.m];
    clearTimeout(openTimer);
    closeTimers.forEach(clearTimeout); closeTimers = [];
    const detail = section.querySelector('.metier-detail');
    const t = section.querySelector('.track');
    const fIdx = openProject.p;
    const focusCard = t ? [...t.children][fIdx] : null;

    section.classList.add('is-closing');
    section.classList.remove('is-detail');

    closeTimers.push(setTimeout(()=>{
      section.classList.remove('is-open','is-closing');
      app.classList.remove('detail-open');
      if(detail) detail.innerHTML = '';
      if(t) keepCentered(t, fIdx, 520);
    }, 420));

    closeTimers.push(setTimeout(()=>{
      if(t) recenter(t, fIdx);
      if(focusCard) flipCard(focusCard, 0);
      pIdx = fIdx;
      openProject = null;
      if(t) t.dataset.pause='0';
      closeTimers = [];
    }, 420 + 500));
  }

  // -------- wiring --------
  function wire(){
    stage.querySelectorAll('.card').forEach(c=>{
      const card3d = c.querySelector('.card3d');
      const wrap = c.querySelector('.thumb-wrap');
      function onMove(e){
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const tilt = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fx-tilt')) || 10;
        const sx = (px - .5) * 2, sy = (py - .5) * 2;
        // aimant inversé : la carte se dérobe au curseur
        const ry = -sx * tilt * 1.15, rx = sy * tilt * 1.15;
        const tx = (-sx * 8).toFixed(1)+'px', ty = (-sy * 8).toFixed(1)+'px';
        c.style.setProperty('--ry', ry.toFixed(2)+'deg');
        c.style.setProperty('--rx', rx.toFixed(2)+'deg');
        c.style.setProperty('--rz', '0deg');
        c.style.setProperty('--tx', tx);
        c.style.setProperty('--ty', ty);
        c.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        c.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        c.style.setProperty('--irid-shift', (px * 360).toFixed(0) + 'deg');
      }
      c.addEventListener('pointermove', onMove);
      c.addEventListener('pointerenter', ()=> c.classList.add('fx-on'));
      c.addEventListener('pointerleave', ()=>{
        c.classList.remove('fx-on');
        ['--ry','--rx','--rz','--tx','--ty'].forEach(v=> c.style.setProperty(v, v.includes('deg')?'0deg':'0px'));
        c.style.setProperty('--ry','0deg'); c.style.setProperty('--rx','0deg');
        c.style.setProperty('--rz','0deg'); c.style.setProperty('--tx','0px'); c.style.setProperty('--ty','0px');
      });
    });

    tracks().forEach(t=>{
      let down=false, sx=0, sl=0, dragging=false, pid=null;
      t.addEventListener('pointerenter', ()=> t.dataset.pause='1');
      t.addEventListener('pointerleave', ()=>{ if(!down) t.dataset.pause='0'; });
      t.addEventListener('pointerdown', e=>{
        down=true; dragging=false; sx=e.clientX; sl=t.scrollLeft; pid=e.pointerId;
        t.dataset.pause='1';
      });
      t.addEventListener('pointermove', e=>{
        if(!down) return;
        const dx=e.clientX-sx;
        if(!dragging && Math.abs(dx)>6){
          dragging=true; t.classList.add('dragging');
          try{ t.setPointerCapture(pid); }catch(_){}
        }
        if(dragging){ t.scrollLeft=sl-dx; }
      });
      const up=e=>{
        const wasDrag=dragging;
        down=false; dragging=false; t.classList.remove('dragging');
        if(!wasDrag && e.type==='pointerup'){
          const card=e.target.closest('.card');
          if(card){
            const m=+card.dataset.m, n=DATA.metiers[m].projets.length;
            openDetail(m, +card.dataset.p % n);
          }
        }
        setTimeout(()=>{ if(!t.matches(':hover')) t.dataset.pause='0'; },1200);
      };
      t.addEventListener('pointerup', up); t.addEventListener('pointercancel', up);
    });

    rail.querySelectorAll('.rail-item').forEach(b=> b.onclick = ()=> setMetier(+b.dataset.idx));
    hud.querySelectorAll('.dot').forEach(b=> b.onclick = ()=> setMetier(+b.dataset.idx));
    hud.querySelectorAll('[data-nav]').forEach(b=> b.onclick = ()=> setMetier(mIdx + (b.dataset.nav==='down'?1:-1)));
    stage.addEventListener('scroll', ()=>{
      const v=visibleMetier();
      if(v!==mIdx){
        mIdx=v;
        rail.querySelectorAll('.rail-item').forEach((el,k)=>el.setAttribute('aria-current',k===v));
        hud.querySelectorAll('.dot').forEach((el,k)=>el.setAttribute('aria-current',k===v));
      }
    }, {passive:true});
  }

  // -------- clavier --------
  window.addEventListener('keydown', e=>{
    if(openProject){
      if(e.key==='ArrowLeft'){ e.preventDefault(); stepDetail(-1); }
      else if(e.key==='ArrowRight'){ e.preventDefault(); stepDetail(1); }
      else if(e.key==='Escape'){ closeDetail(); }
      else if(e.key==='ArrowDown'){ e.preventDefault(); setMetier(mIdx+1); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); setMetier(mIdx-1); }
      return;
    }
    if(e.key==='ArrowDown'){ e.preventDefault(); setMetier(mIdx+1); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); setMetier(mIdx-1); }
    else if(e.key==='ArrowRight'){ e.preventDefault(); moveProject(1); }
    else if(e.key==='ArrowLeft'){ e.preventDefault(); moveProject(-1); }
    else if(e.key==='Enter'){ openDetail(visibleMetier(), pIdx); }
  });

  // -------- swipe tactile --------
  let ty=0, tx=0, tactile=false;
  window.addEventListener('touchstart', e=>{ if(e.target.closest('.track')||e.target.closest('.metier-detail')) return; ty=e.touches[0].clientY; tx=e.touches[0].clientX; tactile=true; }, {passive:true});
  window.addEventListener('touchend', e=>{
    if(!tactile) return; tactile=false;
    const dy=e.changedTouches[0].clientY-ty, dx=e.changedTouches[0].clientX-tx;
    if(Math.abs(dy)>60 && Math.abs(dy)>Math.abs(dx)){
      if(openProject){ closeDetail(); return; }
      setMetier(mIdx + (dy<0?1:-1));
    } else if(Math.abs(dx)>60){
      if(openProject){ stepDetail(dx<0?1:-1); } else { moveProject(dx<0?1:-1); }
    }
  }, {passive:true});

  build();
  app.dataset.dir = 'a';
})();
