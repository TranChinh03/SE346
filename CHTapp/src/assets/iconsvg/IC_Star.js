import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={15}
    fill="none"
    {...props}>
    <Path
      fill="#FFD600"
      d="m9.081 1.276 1.374 2.553c.188.35.667.687 1.063.736l2.359.324c1.51.205 1.888 1.282.845 2.395l-1.775 1.884c-.296.316-.455.923-.342 1.342l.588 2.249c.463 1.776-.464 2.499-2.07 1.61l-2.241-1.24c-.408-.227-1.061-.202-1.45.043l-2.164 1.365c-1.548.976-2.519.31-2.161-1.488l.458-2.275c.086-.426-.1-1.023-.417-1.32L1.254 7.677c-1.106-1.045-.793-2.143.7-2.438l2.33-.459c.394-.08.853-.435 1.017-.8l1.222-2.634C7.19-.075 8.34-.106 9.08 1.275Z"
    />
  </Svg>
);
export default SvgComponent;
