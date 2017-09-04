# im editor


修改了quill/dist/quill.core.js 
此bug升级到1.3.2后已经修复
2069 行 将mouseCount的逻辑进行了修改
mouseCount += 1; --> mouseCount = 1;
mouseCount -= 1; --> mouseCount = 0;

// 为了实现selection 选中
以及注释掉2620和2622行
// win10 搜狗输入法 删除textnode导致数据不一致
修改 4323和4326 加入setTimeout
