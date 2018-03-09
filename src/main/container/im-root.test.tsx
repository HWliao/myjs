import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../rxjs';
import ImRoot from './im-root';

describe('im root component', () => {
  describe('mount', () => {
    it('should not crash', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ImRoot/>, div);
    });
  });
});
