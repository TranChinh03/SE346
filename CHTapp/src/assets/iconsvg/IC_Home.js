import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={27}
    fill="none"
    {...props}>
    <Path
      fill={props.fill}
      d="M9.07.82 2.14 6.37C1.36 6.99.86 8.3 1.03 9.28l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91L12.93.83c-1.07-.86-2.8-.86-3.86-.01Z"
      opacity={0.4}
    />
    <Path fill={props.fill} d="M11 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <Circle cx={10.5} cy={24.5} r={2.5} fill={props.fill2} opacity={0.7} />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
