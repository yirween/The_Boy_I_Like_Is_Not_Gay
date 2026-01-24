(function(){
  var scrollBar = document.getElementById('scrollBar');
  var scrollLine = document.getElementById('scrollLine');
  var scrollBall = document.getElementById('scrollBall');
  var lastView = document.getElementById('lastView');
  if(!scrollBar || !scrollLine || !scrollBall || !lastView) return;

  var pageHeight = document.body.scrollHeight - window.innerHeight;
  var nowScroll = 0;
  var isDragging = false;
  var dragStartY = 0;
  var dragStartScroll = 0;
  var lastViewPosition = null;
  var activePointerId = null;
  var pointerDownTime = 0;
  var lastClientY = null; // 新增：记录最近一次 move 的 clientY

  function updatePageHeight(){ pageHeight = document.body.scrollHeight - window.innerHeight; }
  window.addEventListener('resize', updatePageHeight);

  document.addEventListener('scroll', function(){
    nowScroll = window.scrollY || window.pageYOffset || 0;
    if(pageHeight > 0){
      var shouldY = (nowScroll / pageHeight) * 85 - 140;
      scrollLine.style.top = shouldY + 'vh';
    }
  });

  function onPointerDown(e){
    activePointerId = e.pointerId;
    pointerDownTime = Date.now();
    isDragging = true;
    dragStartY = e.clientY;
    dragStartScroll = window.scrollY || window.pageYOffset || 0;
    lastClientY = e.clientY;
    try{ scrollBall.setPointerCapture(activePointerId); }catch(err){}
    scrollBall.classList.add('dragging');
    e.preventDefault();
  }

  function onPointerMove(e){
    if(!isDragging || e.pointerId !== activePointerId) return;
    lastClientY = e.clientY; // 更新最后位置
    var deltaY = (e.clientY - dragStartY) * 1.1764;
    var scrollDelta = (deltaY / window.innerHeight) * pageHeight;
    var newScroll = dragStartScroll + scrollDelta;
    newScroll = Math.max(0, Math.min(pageHeight, newScroll));
    window.scrollTo(0, newScroll);
    e.preventDefault();
  }

  function onPointerUp(e){
    if(e.pointerId !== activePointerId) return;
    try{ scrollBall.releasePointerCapture(activePointerId); }catch(err){}
    scrollBall.classList.remove('dragging');
    isDragging = false;

    var pressDuration = Date.now() - pointerDownTime;
    // 只有在短按且移动距离很小的时候才视为点击（触发 lastView + 滚到顶部）
    var moved = Math.abs((lastClientY !== null ? lastClientY : e.clientY) - dragStartY);
    var MOVE_THRESHOLD = 8; // 像素阈值，可调
    if(pressDuration < 700 && moved < MOVE_THRESHOLD){
      lastViewPosition = window.scrollY || window.pageYOffset || 0;
      showLastViewAtCurrentPosition();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    activePointerId = null;
    lastClientY = null;
    e.preventDefault();
  }

  scrollBall.addEventListener('pointerdown', onPointerDown, { passive: false });
  document.addEventListener('pointermove', onPointerMove, { passive: false });
  document.addEventListener('pointerup', onPointerUp, { passive: false });
  document.addEventListener('pointercancel', onPointerUp, { passive: false });

  function showLastViewAtCurrentPosition(){
    var scrollLineRect = scrollLine.getBoundingClientRect();
    var scrollBarRect = scrollBar.getBoundingClientRect();
    var lastViewTop = scrollLineRect.top - scrollBarRect.top + (scrollBall ? scrollBall.offsetTop : 0);
    lastView.style.top = (lastViewTop - 8) + 'px';
    lastView.style.display = 'block';
  }

  lastView.addEventListener('click', function(e){
    e.stopPropagation();
    if(lastViewPosition !== null){
      window.scrollTo({ top: lastViewPosition, behavior: 'smooth' });
      lastView.style.display = 'none';
    }
  });

  scrollBar.addEventListener('click', function(e){ e.stopPropagation(); });

  updatePageHeight();
})();
