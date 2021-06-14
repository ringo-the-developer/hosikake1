var d = window.document;
var ua = navigator.userAgent;
var isSp = ((ua.indexOf('iPhone') > -1) || (ua.indexOf('iPod') > -1) || (ua.indexOf('Mobile') > -1) && (ua.indexOf('Android') > -1));
var isTab = (ua.indexOf('iPad') > -1 || (ua.indexOf('Mobile') <= -1) && (ua.indexOf('Android') > -1));
if(isSp){
  d.write('<meta name="viewport" content="width=360px">');
}else if(isTab){
  d.write('<meta name="viewport" content="width=1200px">');
}else {
  d.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
}