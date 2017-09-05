# im editor


修改了quill/dist/quill.core.js 
此bug升级到1.3.2后已经修复
2069 行 将mouseCount的逻辑进行了修改
mouseCount += 1; --> mouseCount = 1;
mouseCount -= 1; --> mouseCount = 0;

// 为了实现selection 选中
2997 行 加入 
````javascript
var _getRange = _this.getRange(),
  _getRange2 = _slicedToArray(_getRange, 2),
  lastRange = _getRange2[0],
  nativeRange = _getRange2[1];
if (lastRange != null) {
  _this.savedRange = lastRange;
}
````
// win10 搜狗输入法 删除textnode导致数据不一致
3496 加入
````javascript
            if(mutation.target &&
              mutation.type === 'characterData' &&
              mutation.target.nodeType === Node.TEXT_NODE &&
              mutation.target.parentNode === _this.domNode){
              addedNodes.push(mutation.target);
            }
````
