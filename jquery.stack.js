$.fn.stack = function (options) {

    var settings = $.extend({
        width: 300,
        height: 300,
        coefficient: 1.1,
        offset: function (z) {
            var dx = 0.25 * this.width * getScale(z);
            var leftSpace = this.width * (1 - getScale(0)) / 2;
            return z * dx - leftSpace;
        },
        transition: true,
        transitionDelay: 1000
    }, options);

    var selectedObject = this[0];

    var cards = $(selectedObject).css('transform-style', 'preserve-3d').children();
    var z = [];
    for (var i = 0; i < cards.length; i++) {
        z.push(i);
    }
    var zoom = Math.pow(1.1, cards.length - 1);

    var width = settings.width * ((cards.length - 1) / 4 + 1);

    $(selectedObject).css('width', width);

    cards.css({
        width: settings.width,
        height: settings.height,
        position: 'absolute'
    }).each(function (index) {
        $(this).css({
            transform: getTransform(z[index])
        });
        if (settings.transition) {
            $(this).css({
                transition: 'all ' + settings.transitionDelay + 'ms linear'
            })
        }
    });

    function getScale(z) {
        return Math.pow(1.1, z) / zoom
    }

    function getTransform(z, x) {
        return 'translate3d(' + (x ? x : settings.offset(z)) + 'px,0,' + z + 'px) scale(' + getScale(z) + ')'
    }

    return {
        setZ: function (cardNum, newZ) {
            var oldZ = z[cardNum];
            var i;
            if (oldZ < newZ) {
                for (i = 0; i < z.length; i++) {
                    if (z[i] > oldZ && z[i] <= newZ) {
                        z[i]--;
                        $(cards.get(i)).css({
                            transform: getTransform(z[i])
                        });
                    }
                }
            } else if (oldZ > newZ) {
                for (i = 0; i < z.length; i++) {
                    if (z[i] < oldZ && z[i] >= newZ) {
                        z[i]++;
                        $(cards.get(i)).css({
                            transform: getTransform(z[i])
                        });
                    }
                }
            } else {
                return;
            }
            if (newZ == cards.length - 1 || oldZ == cards.length - 1) {
                $(cards.get(cardNum)).css({
                    transform: getTransform(oldZ, width/*- 1 / 2 * settings.width*/)
                });
            } else {
                $(cards.get(cardNum)).css({
                    transform: getTransform(oldZ, width)
                });
            }
            setTimeout(function () {
                z[cardNum] = newZ;
                $(cards.get(cardNum)).css({
                    transform: getTransform(z[cardNum])
                });
            }, settings.transitionDelay)
        }
    };
};