$(function () {
  AOS.init()

  // gsap
  var mvTL = gsap.timeline({
    defaults: {
      duration: .3,
      ease: "Back.easeout"
    }
  })
  var mvCatchMain = $(".mv_catch__main span")
  var mvCatchSub = $(".mv_catch__sub span")
  console.log(mvCatchMain[1]);
  mvTL.to(mvCatchMain[0], { delay: 1, x: 0, y: 0, scale: 1 })
    .to(mvCatchMain[1], { delay: 0.01, x: 0, y: 0, scale: 1 })
    .to(mvCatchMain[2], { delay: 0.01, x: 0, y: 0, scale: 1 })
    .to(mvCatchSub, { delay: 0.5, x: 0, y: 0, scale: 1, alpha: 1 })
//   // スムーズスクロール（１）ページ遷移してスクロールのある場合
  
//   // URLのハッシュ値を取得して、ハッシュ値があればページ内スクロールを1番上からする。
//   var urltarget = location.hash;
//   // スマホかPCによって、移動距離を調節してます。 :の前がPC後がスマホ。ヘッダーの高さ　PC：100、スマホ：なし
//   var adjust = (navigator.userAgent.indexOf('iPhone') < 0 && navigator.userAgent.indexOf('iPod') < 0 && navigator.userAgent.indexOf('Android') < 0) ? 100 : 10;
//   if(urlHash){
//     $("body, html").stop().scrollTop(0);
//     setTimeout(function(){
//       scrollToAnker(urlHash, adjust);
//     }, 100);
//   }

//   $(".header_nav a").on("click", function () {
//     $("header").removeClass("open_nav");
//     var href = $(this).attr("href");
//     clickAnker(href);
//   })

//   // 通常のクリック時
//   $('a[href*="#"]').on("click", function(){
//     var href = $(this).attr("href");
//     clickAnker(href);
//   });

//   function clickAnker(href){
//     if (href !== "#") {
//       var hash = href === "" ? 'html' : href;
//       var hash = "#" + hash.split("#")[1];
//       scrollToAnker(hash, adjust)
//     }
//   }

//   // 関数：スムーススクロール
//   function scrollToAnker(hash, adjust){
//     var speed = 800;
//     var target = $(hash);
//     var position = target.offset().top - adjust;
//     $("html, body").stop().animate({scrollTop: position}, speed, "swing");
//     return false;
//   }

//   // （１）ここまで

//   // ページ内スクロールのみ（２）
//   // スマホかPCによって、移動距離を調節してます。 :の前がPC後がスマホ。ヘッダーの高さ　PC：100、スマホ：なし
//   var adjust = (navigator.userAgent.indexOf('iPhone') < 0 && navigator.userAgent.indexOf('iPod') < 0 && navigator.userAgent.indexOf('Android') < 0) ? 100 : 10;
//   // 通常のクリック時
//   $('a[href^="#"]').on("click", function () {
//     var href = $(this).attr("href");
//     scrollToAnker(href, adjust);
//   });

//   // 関数：スムーススクロール
//   function scrollToAnker(href, adjust) {
//     if (href !== "#") {
//       var target = $(href === "" || href == "#top" ? 'html' : href);
//       var speed = 800;
//       var position = target.offset().top - adjust;
//       $("html, body").stop().animate({ scrollTop: position }, speed, "swing");
//     }
//     return false;
//   }

//   // （２）ここまで


//   // スマホメニュー設定
//   $(".gnav_toggle").on("click", function(){
//     $("header").toggleClass("open_nav");
//   });
//   // アニメの設定


})
