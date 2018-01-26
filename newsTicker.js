/*!
 * NewsTicker
 *
 *
 * @author: TakashiKakizoe
 * @author url: https://github.com/TakashiKakizoe1109
 * @version: 1.0.0
 *
 * Open source under the MIT License.
 * License url: https://raw.githubusercontent.com/TakashiKakizoe1109/newsTicker/master/LICENSE
 *
 */

var newsTicker = function (op) {

  this.op = {} ;
  this.op.topPosition    = op.topPosition    || 0 ;
  this.op.leftPosition   = op.leftPosition   || 0 ;
  this.op.effect         = op.effect         || 'roll' ;
  this.op.rollMoveLength = op.rollMoveLength || '2em' ;
  this.op.effectSpeed    = op.effectSpeed    || 1000 ;
  this.op.switchDelay    = op.switchDelay    || 6000 ;
  this.op.easing         = op.easing         || 'swing' ;

  this.op.wrapClassName        = op.wrapClassName        || 'newsTickerWrapper' ;
  this.op.currentItemClassName = op.currentItemClassName || 'current' ;

  this.op.selector = !op.selector ? $('.newsTicker') : $(op.selector);
  this.op.selector.css('position','relative');
  this.op.selector.children().css('display','none');

};


newsTicker.prototype.addMove = function() {

  var op = this.op ;

  op.selector.each(function() {

    /** current target */
    var __targetElement = $(this) ;

    /** move custom effect */
    var __effect = __targetElement.attr('rel') || op.effect;

    /** target wrapper element */
    __targetElement.wrap('<div class="'+op.wrapClassName+'" />');
    var __targetWrapper = __targetElement.parent();

    /** target childs element */
    var __targetChild = __targetElement.children();
    var __targetChildFirst  = __targetElement.children('*:nth-child(1)');
    var __targetWidth = __targetElement.width();
    __targetWrapper.css('height',__targetChild.height());
    __targetChild.css({
      top: op.topPosition,
      left: op.leftPosition,
      position: 'absolute'
    });
    var __targetChildCount = __targetChild.length;

    /** effect */
    if(__effect == 'roll') {
      __targetChildFirst.css({
        top: op.rollMoveLength,
        display: 'block',
        opacity: '0',
        zIndex: '98'
      }).stop().animate({
        top: '0',
        opacity: '1'
      }, op.effectSpeed, op.easing).addClass(op.currentItemClassName);
      if (__targetChildCount > 1) {
        setInterval(function() {
          var __current = __targetWrapper.find('.'+op.currentItemClassName);
          __current.animate({
            top: '-'+op.rollMoveLength,
            opacity: '0'
          }, op.effectSpeed, op.easing).next().css({
            top: op.rollMoveLength,
            display: 'block',
            opacity: '0',
            zIndex: '99'
          }).animate({
            top: '0',
            opacity: '1'
          }, op.effectSpeed, op.easing).addClass(op.currentItemClassName).end().appendTo(__targetElement).css({
            zIndex: '98'
          }).removeClass(op.currentItemClassName);
        }, op.switchDelay);
      }
    } else if (__effect == 'fade') {
      __targetChildFirst.css({
        display: 'block',
        opacity: '0',
        zIndex: '98'
      }).stop().animate({
        opacity: '1'
      }, op.effectSpeed, op.easing).addClass(op.currentItemClassName);
      if (__targetChildCount > 1) {
        setInterval(function() {
          var __current = __targetWrapper.find('.'+op.currentItemClassName);
          __current.animate({
            opacity: '0'
          }, op.effectSpeed, op.easing, function() {
            $(this).next().css({
              display: 'block',
              opacity: '0',
              zIndex: '99'
            }).animate({
              opacity: '1'
            }, op.effectSpeed, op.easing).addClass(op.currentItemClassName).end().appendTo(__targetElement).css({
              display: 'none',
              zIndex: '98'
            }).removeClass(op.currentItemClassName);
          });
        }, op.switchDelay);
      }
    } else if (__effect == 'slide') {
      __targetChildFirst.css({
        left: (__targetWidth),
        display: 'block',
        opacity: '0',
        zIndex: '98'
      }).stop().animate({
        left: '0',
        opacity: '1'
      }, op.effectSpeed, op.easing).addClass(op.currentItemClassName);
      if (__targetChildCount > 1) {
        setInterval(function() {
          var __current = __targetWrapper.find('.'+op.currentItemClassName);
          __current.animate({
            left: (-(__targetWidth)),
            opacity: '0'
          }, op.effectSpeed, op.easing).next().css({
            left: (__targetWidth),
            display: 'block',
            opacity: '0',
            zIndex: '99'
          }).animate({
            left: '0',
            opacity: '1'
          }, op.effectSpeed, op.easing).addClass(op.currentItemClassName).end().appendTo(__targetElement).css({
            zIndex: '98'
          }).removeClass(op.currentItemClassName);
        }, op.switchDelay);
      }
    }

  });
};
