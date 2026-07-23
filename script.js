// ハンバーガーのトグル
(function(){
  const header = document.querySelector('.header');
  const btn = document.querySelector('.hamburger');
  const navLinks = document.querySelectorAll('.nav a');
  if(btn && header){
    btn.addEventListener('click', ()=>{
      const open = header.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // ナビのリンクを押したら閉じる（モバイル）
    navLinks.forEach(a=> a.addEventListener('click', ()=>{
      if(header.classList.contains('nav-open')){
        header.classList.remove('nav-open');
        btn.setAttribute('aria-expanded','false');
      }
    }));
  }

  // IntersectionObserver を使った簡易スクロール発火（reveal）
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !prefersReduced){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          // 一度見えたら監視を切る
          obs.unobserve(entry.target);
        }
      });
    },{threshold: 0.12});

    document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));
  } else {
    // サポートしていない場合はすべてを表示状態に
    document.querySelectorAll('.reveal').forEach(el=> el.classList.add('in-view'));
  }
})();
