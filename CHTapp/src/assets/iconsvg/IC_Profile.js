import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={29}
    fill="none"
    {...props}>
    <Path
      fill={props.fill}
      d="M8 0C5.38 0 3.25 2.13 3.25 4.75c0 2.57 2.01 4.65 4.63 4.74.08-.01.16-.01.22 0h.07a4.738 4.738 0 0 0 4.58-4.74C12.75 2.13 10.62 0 8 0Z"
      opacity={0.4}
    />
    <Path
      fill={props.fill}
      d="M13.08 12.149c-2.79-1.86-7.34-1.86-10.15 0-1.27.85-1.97 2-1.97 3.23s.7 2.37 1.96 3.21c1.4.94 3.24 1.41 5.08 1.41 1.84 0 3.68-.47 5.08-1.41 1.26-.85 1.96-1.99 1.96-3.23-.01-1.23-.7-2.37-1.96-3.21Z"
    />
    <Circle cx={8} cy={26.5} r={2.5} fill={props.fill2} opacity={0.7} />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
