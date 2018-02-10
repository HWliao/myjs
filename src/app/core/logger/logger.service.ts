import { Injectable } from '@angular/core';

console.log = console.log || function () {
};
console.error = console.error || function () {
};

@Injectable()
export class LoggerService {

  constructor() {
  }

  log(msg: string) {
    console.log(msg);
  }

  error(msg: string) {
    console.error(msg);
  }
}
