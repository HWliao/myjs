// 类的静态部分和实例部分的区别
interface ClockConstructor {
  new (houre: number, minute: number): ClockInterface;

}

interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, houre: number, minute: number): ClockInterface {
  return new ctor(houre, minute);
}

class DigitalClock implements ClockInterface {
  constructor(houre: number, minute: number) {
  }

  public tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor() {
  }

  public tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 混合类型 同时作为函数和对象
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {
  };
  counter.interval = 123;
  counter.reset = function () {
  };
  return counter;
}

// 接口继承类 ???? WTF





