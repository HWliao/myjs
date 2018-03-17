import * as React from 'react';

class ImSidebarNoagentComponent extends React.PureComponent<Props> {
  render() {
    const {show, title} = this.props;
    return (
      <div className={`jjsim-noagent ${show ? '' : 'hide'}`}>
        <i className="sprite sprite-person"/>
        <p>{title}</p>
      </div>
    );
  }
}

export default ImSidebarNoagentComponent;

export interface Props {
  show: boolean;
  title: string;
}
