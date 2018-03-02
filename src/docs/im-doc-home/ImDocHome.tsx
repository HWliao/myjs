import * as React from 'react';
import { Props } from './type';
import styled from './style';
import imPng from '../../assets/images/im.png';
import Button from 'material-ui/Button';
import { DocLink } from '../im-doc-layout/route';

class ImDocHome extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <div className={classes.headerSection}>
            <div className={classes.headerHeadline}>
              <h1 className={classes.headerHeadlineTitle}>WEB IM PLUGIN</h1>
              <h2 className={classes.headerHeadlineSubtitle}>用于为系统内部网站提供及时聊天功能</h2>
            </div>
            <div className={classes.headerStart}>
              <Button
                variant="raised"
                className={classes.headerStartButton}
                component={DocLink}
              >
                立即开始
              </Button>
            </div>
          </div>
        </header>
        <section className={classes.section}>
          <div>
            <img src={imPng}/>
          </div>
        </section>
      </div>
    );
  }
}

export default styled<{}>(ImDocHome);
