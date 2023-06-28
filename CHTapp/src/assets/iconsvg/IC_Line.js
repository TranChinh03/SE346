import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={0}
    fill={props.stroke}
    {...props}>
    <Path stroke={props.stroke} d="M.948 1h43.104" />
  </Svg>
);
export default SvgComponent;
