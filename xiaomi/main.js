var stopWatch;

function setInitialStates() {
    hideAll(['.frame_1','.frame_2','.end_1','.replay','.end_2']);
}

var preloadImages = [
    "assets/xiaomi.png",
    "assets/cta.png",
    "assets/circle_1.png",
    "assets/circle_2.png",
    "assets/circle_3.png",
    "assets/watch1.png",
    "assets/watch2.png",
    "assets/end_1.png",
    "assets/end_2.png",
];

function preload() {
    var lastLoadedImage = -1;
    loadNext();

    function loadNext() {
        lastLoadedImage++;
        if (lastLoadedImage >= preloadImages.length) {
            mainInit();
        } else {
            var img = new Image();
            img.onload = loadNext;
            img.src = preloadImages[lastLoadedImage];
        }
    }
}

function mainInit() {

    addListeners();
    setInitialStates();
    TweenMax.set('.watch1', { x: 0, y: 110, scale: 1 });
    TweenMax.set('.bg_static_1', { x: 0, y: 110, scale: 1.3 });
    $(".container").show();

    seq02();
}

function seq02() {
    var twnDelay = 0;

    $('.frame_1').show();
    TweenMax.set('.circle_1', { x: -120, y: 28 });
    TweenMax.set('.circle_2', { x: -120, y: 28});
    
    TweenMax.to($(".circle_1"), 0.5, {scale: 0.6, rotation: 15, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_2"), 0.5, {scale: 0.7, rotation: 0.01, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_1"), 0.5, {scale: 1, rotation: 10, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    TweenMax.to($(".circle_2"), 0.5, {scale: 1.1, rotation: 0.01, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_1"), 0.5, {scale: 0.6, rotation: 0, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_2"), 0.5, {scale: 0.7, rotation: 0.01, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_1"), 0.5, {scale: 0.8, rotation: 5, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    TweenMax.to($(".circle_2"), 0.5, {scale: 1, rotation: 0.01, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_1"), 0.5, {scale: 1, rotation: 0, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_2"), 0.5, {scale: 1, rotation: 0.01, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    // twnDelay += 0.25;
    TweenMax.to($(".watch1"), 0.25, {scale: 1.1, rotation: 0.01, force3D:true,  ease:Power1.easeIn, delay:twnDelay });


    twnDelay += 0.25;
    TweenMax.delayedCall(twnDelay, seq03);

}

function seq03() {
    var twnDelay = 0;
    $('.frame_2').show();
    TweenMax.set('.circle_3', { x: -120, y: 28});
    TweenMax.set('.circle_4', { x: -120, y: 28});
    TweenMax.set('.watch2', { x: 0, y: 110, scale: 1 });

    TweenMax.from($(".watch2"), 0.25, {scale: 1.1, rotation: 0.01, force3D:true,  ease:Power1.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_3"), 0.5, {scale: 0.6, rotation: 15, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_4"), 0.5, {scale: 0.7, rotation: 0.01, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_3"), 0.5, {scale: 1, rotation: 10, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    TweenMax.to($(".circle_4"), 0.5, {scale: 1.1, rotation: 0.01, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_3"), 0.5, {scale: 0.6, rotation: 0, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_4"), 0.5, {scale: 0.7, rotation: 0.01, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_3"), 0.5, {scale: 0.8, rotation: 5, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    TweenMax.to($(".circle_4"), 0.5, {scale: 1, rotation: 0.01, force3D:true,  ease: Back.easeIn, delay:twnDelay });
    twnDelay += 0.5;
    TweenMax.to($(".circle_3"), 0.5, {scale: 1, rotation: 0, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    TweenMax.to($(".circle_4"), 0.5, {scale: 1, rotation: 0.01, force3D:true,  ease: Back.easeOut, delay:twnDelay });
    // twnDelay += 0.35;
    TweenMax.delayedCall(twnDelay, seq04);

}
function seq04() {
    var twnDelay = 0;
    $('.end_1').show();
    $('.end_2').show();
    TweenMax.set('.end_1', { x: 305, y: 110 });
    TweenMax.set('.end_2', { x: -305, y: 110 });

    TweenMax.to($(".end_1"), 0.5, {x: 0, rotation: 0.01, force3D:true,  ease: Power2.easeInOut, delay:twnDelay });
    TweenMax.to($(".end_2"), 0.5, {x: 0, rotation: 0.01, force3D:true,  ease: Power2.easeInOut, delay:twnDelay });
    twnDelay += 0.75;
    TweenMax.delayedCall(twnDelay, hoverActive);

}
function hoverActive() {
    var twnDelay = 0;

    $('.replay').show();
    TweenMax.from($(".replay"), 0.75, {opacity: 0 , rotation: 0.01, force3D:true,  ease:Power1.easeIn, delay:twnDelay });
}
function hideAll(whichOnes) {
    for (q = 0; q < whichOnes.length; q++) {
        $(whichOnes[q]).hide();
    }
}
function AnimationReset() {
    TweenMax.killAll();
    TweenMax.killTweensOf($(".container").find('*'));
    TweenMax.set($(".container").find('*'), { clearProps: "all" });
    setInitialStates();
    mainInit();
}
function addListeners() {
   $('.replay').on('click', AnimationReset);

    $('.replay').on( 'mouseenter', function(){
            TweenLite.fromTo($(".replay"), 0.5, {rotation:'-360', transformOrigin:"50% 50%"}, {overwrite:false, rotation:'0'});
    });
}


function returnTimer() {
    stopWatch = ((new Date().getTime()) - start) * 0.001;
    console.log(stopWatch + " seconds");
}

window.onload = preload();
