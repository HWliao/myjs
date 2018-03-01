import * as React from 'react';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider } from 'material-ui/styles';
import { darkTheme, lightTheme } from './theme';
import ImDocLayout from './im-doc-layout/ImDocLayout';
import { State } from './type';

export default class ImDocApp extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isDark: false
    };
  }

  render() {
    return (
      <div>
        <Reboot/>
        <MuiThemeProvider theme={this.state.isDark ? darkTheme : lightTheme}>
          <ImDocLayout onChange={this.changeTheme} isDark={this.state.isDark}/>
        </MuiThemeProvider>
      </div>
    );
  }

  changeTheme = () => {
    this.setState((prevState) => ({
      isDark: !prevState.isDark
    }));
  };
}
