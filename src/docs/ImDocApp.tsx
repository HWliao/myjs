import * as React from 'react';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider } from 'material-ui/styles';
import { darkTheme, lightTheme } from './theme';
import ImDocLayout from './im-doc-layout/ImDocLayout';
import ImDocOperaterMenu from './im-doc-operater-menu/ImDocOperaterMenu';
import { State } from './type';
import { BrowserRouter } from 'react-router-dom';

class ImDocApp extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isDark: false
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Reboot/>
          <MuiThemeProvider theme={this.state.isDark ? darkTheme : lightTheme}>
            <ImDocLayout onChange={this.changeTheme} isDark={this.state.isDark}/>
            <ImDocOperaterMenu/>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }

  changeTheme = () => {
    this.setState((prevState) => ({
      isDark: !prevState.isDark
    }));
  };
}

export default ImDocApp;
