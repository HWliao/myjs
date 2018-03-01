import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import { Props, WithStylesProps } from './type';
import { styled } from './style';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import DivWrapper from '../components/DivWrapper/DivWrapper';

class ImDocLayout extends React.Component<WithStylesProps> {
  constructor(props: WithStylesProps) {
    super(props);
  }

  handleChange = () => {
    this.props.onChange();
  };

  render() {
    const {classes, isDark} = this.props;
    return (
      <div className={classes.root}>
        <AppBar elevation={6} position="fixed" className={classes.appBar}>
          <ToolBar>
            <Button color="inherit">IM PLUGIN</Button>
            <Button color="inherit">文档</Button>
            <div style={{flex: '1 1 auto'}}/>
            <FormControlLabel
              color="primary"
              control={<Switch/>}
              label={<Typography
                variant="button"
                className={classes.labelText}
              >
                {isDark ? 'dark' : 'light'}
              </Typography>}
              onChange={this.handleChange}
            />
          </ToolBar>
        </AppBar>
        <div className={classes.toolbar}/>
        <Typography className={classes.content} component={DivWrapper}>
          xxxx
        </Typography>
      </div>
    );
  }
}

export default styled<Props>(ImDocLayout);
