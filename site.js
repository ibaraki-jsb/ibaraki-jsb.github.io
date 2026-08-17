// 共通の触感スクリプト(全ページで読み込む)
// 1) クリック波紋: data-ripple を持つ要素に、押した位置から若葉色の波紋を出す
// 2) 初回rise: .rise-group の直下要素に順番のdelayを振ってふわっと立ち上げる
(function(){
  document.addEventListener('pointerdown', function(e){
    const el = e.target.closest('[data-ripple]');
    if (!el) { return; }
    const cs = getComputedStyle(el);
    if (cs.position === 'static') { el.style.position = 'relative'; }
    if (cs.overflow !== 'hidden') { el.style.overflow = 'hidden'; }
    const r = el.getBoundingClientRect();
    const s = Math.max(r.width, r.height) * .6;
    const rip = document.createElement('span');
    rip.className = 'ripple';
    rip.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s/2) +
                        'px;top:' + (e.clientY - r.top - s/2) + 'px';
    el.appendChild(rip);
    setTimeout(function(){ rip.remove(); }, 600);
  });

  document.querySelectorAll('.rise-group').forEach(function(g){
    Array.prototype.forEach.call(g.children, function(c, i){
      c.classList.add('rise');
      c.style.animationDelay = (i * 60) + 'ms';
    });
  });
})();
