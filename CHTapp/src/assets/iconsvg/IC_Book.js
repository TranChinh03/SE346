import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={28}
    fill="none"
    {...props}>
    <Path
      fill={props.fill}
      d="M17.5 5v8H3.35C1.78 13 .5 14.28.5 15.85V5c0-4 1-5 5-5h7c4 0 5 1 5 5Z"
      opacity={0.4}
    />
    <Path
      fill={props.fill}
      d="M17.5 13v3.5c0 1.93-1.57 3.5-3.5 3.5H4C2.07 20 .5 18.43.5 16.5v-.65C.5 14.28 1.78 13 3.35 13H17.5ZM13 5.75H5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8c.41 0 .75.34.75.75s-.34.75-.75.75Zm-3 3.5H5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75Z"
    />
    <Circle cx={9} cy={25.5} r={2.5} fill={props.fill2} opacity={0.7} />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
