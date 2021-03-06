/**
 * @file 组件mip-fx-flying-carpet
 * @author lilangbo
 * @time 2016.08.02
 */

define(function (require) {
    var customElem = require('customElement').create();
    //console.log(platform);
    /**
     * buildCallback
     *
     * @param  {Event} e event
     */
    function buildCallback () {
        var util = require('util');
        var css = util.css;
        var element = this.element;

        var children = Array.prototype.slice.call(element.children);

        /* android uc 的兼容性有问题，特殊处理 */
        var classname = (!platform.isIos() && platform.isUc())?'carpet-normal carpet-androiduc':'carpet-normal';
        
        var clip = document.createElement('div');

        var wapper = document.createElement('div');

        clip.className = 'mip-fx-flying-carpet-clip';
        
        wapper.className = classname;
        element.appendChild(clip); 
        clip.appendChild(wapper); 

        children = children.filter(function (element) {
            return element.tagName.toLowerCase() !== 'mip-i-space';
        });

        if (children.length !== 1) {
            return;
        }
        children.forEach(function(child){  
            wapper.appendChild(child); 
            var width = child.offsetWidth;
            var winWidth = document.body.clientWidth;
            if (width > winWidth) {
                css(child, {
                    'margin-left': - (width - winWidth) / 2 + 'px'
                })
            }

        }); 
    }

    /**
     * 初始化
     *
     */
    customElem.prototype.build = buildCallback;

    customElem.prototype.viewportCallback = function (isInview) {
        if (isInview) {
            //this.element.style.zIndex = 10;
        } else {
            //this.element.style.zIndex = 1;
        }
    };

    return customElem;
});
