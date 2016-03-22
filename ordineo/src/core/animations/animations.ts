export function transitionHeight():any {
  return {
    removeClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.set(element, {height: 'auto', autoAlpha: 0});
        TweenMax.from(element, 0.5, {ease: Circ.easeOut, height: 0, onComplete: done});
        TweenMax.to(element, 1, {delay: 0.5, autoAlpha: 1});
      }
    }
  };
}
export function fadeInOnNgShow():any {
  return {
    removeClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.set(element, {autoAlpha: 0, scale: 1});
        TweenMax.to(element, 0.5,
          {ease: Circ.easeOut, autoAlpha: 1, onComplete: done});
      }
    }
  };
}
export function editIcons():any {
  return {
    removeClass: function (element, className, done) {

      if (className === 'ng-hide') {
        TweenMax.set(element, {autoAlpha: 0, right: -50});

        TweenMax.to(element, 0.5, {
          right: 50,
          ease: Circ.easeOut,
          autoAlpha: 1,
          onComplete: done
        });
      }
    },
    addClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.to(element, 0.5, {
          ease: Circ.easeOut,
          autoAlpha: 0,
          onComplete: done
        });
      }
    }
  }
}
export function simpleFade():any {
  return {
    removeClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.to(element, 0.5, {
          ease: Circ.easeOut,
          left: 0,
          rotation: 0,
          autoAlpha: 1,
          onComplete: done
        });
      }
    },
    addClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.to(element, 0.5, {
          ease: Circ.easeOut,
          autoAlpha: 0,
          rotation: 360,
          left: 50,
          onComplete: done
        });
      }
    }
  }
}
