# im editor


修改了quill/dist/quill.core.js 
2069 行 将mouseCount的逻辑进行了修改
mouseCount += 1; --> mouseCount = 1;
mouseCount -= 1; --> mouseCount = 0;

以及注释掉2620和2622行
