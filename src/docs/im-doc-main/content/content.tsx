import * as React from 'react';
import { StyleRulesCallback, WithStyles, withStyles } from 'material-ui/styles';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';

type StyleType = 'root' | 'header' | 'section';

export type ContentProps = {
  header: string;
};

type Props = ContentProps & WithStyles<StyleType>;

const styles: StyleRulesCallback<StyleType> = theme => ({
  root: {
    flex: '1'
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',
    '& h1': {
      fontWeight: 300,
      margin: 0,
      padding: '28px 8px',
      fontSize: 20,
      color: '#ffffff'
    }
  },
  section: {
    padding: '20px 70px 50px'
  }
});

class ImDocContent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <h1>{this.props.header}</h1>
        </header>
        <section className={classes.section}>
          <SyntaxHighlighter language={'javascript'} style={atomDark}>
            {this.props.children}
          </SyntaxHighlighter>
        </section>
      </div>
    );
  }
}

export default withStyles(styles)<ContentProps>(ImDocContent);
