# jquery-stack
library for stack animation of blocks as if it was cards

[See the demo](https://ruslan207.github.io/jquery-stack/)

# Usage

```html
<div class="wrapper">
  <div class="block red">0</div>
  <div class="block green">1</div>
  <div class="block blue">2</div>
  <div class="block yellow">3</div>
  <div class="block black">4</div>
</div>
```

```javascript
var $wrapper = $('.wrapper').stack({
    height:500,
    coefficient: 1.5
});
```

# Methods

```javascript
$wrapper.setZ(cardNum,newZ);
```
First parameter - index of card in HTML

Second - parameter - new index in visual order

# Options

| Option | Default value | |
| ------------- | ------------- | ----- |
| width     | 300 | width of card block |
| height      | 300      |   height of card block |
| coefficient | 1.1      |    coefficient of scale for each block |
| offset |`function (z) {                                              `|   function for calculation left  offset for each Z coefficient  |
|        |`			var dx = 0.25 * this.width * getScale(z);             `|       |
|        |`			var leftSpace = this.width * (1 - getScale(0)) / 2;   `|       |
|        |`			return z * dx - leftSpace;                            `|       |
|        |`		}`                                                  |   |
| transition | true      |    animate stack or not |
| transitionDelay | 1000      |    duration of animation (and delay time for recalculating method) |
