var getBrowser = function() {
    if (getBrowser.prototype._cachedResult) return getBrowser.prototype._cachedResult;

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;// Chrome 1+
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

    return (getBrowser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        '');
};

var blendmodeSupported = function()
{
    if('CSS' in window && 'supports' in window.CSS) 
    {
        return window.CSS.supports('mix-blend-mode','overlay');
    }
}

var canvasSupported = function()
{
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}