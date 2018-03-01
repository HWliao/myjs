import { WithStyles } from 'material-ui/styles';

export type Props = {
  isDark: boolean;
  onChange: () => void;
};

export type StyleTypes = 'root' | 'appBar' | 'content' | 'toolbar' | 'labelText' | string;

export type WithStylesProps = Props & WithStyles<StyleTypes>;
