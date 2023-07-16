import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={51}
    height={52}
    fill="none"
    {...props}>
    <Ellipse cx={25.5} cy={26} fill="#80FFDB" opacity={0.2} rx={25.5} ry={26} />
    <Path
      stroke="#64DFDF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m33.207 30.628 3.626-3.626-3.626-3.627m-10.88 3.627h14.407M25.16 38.25c-6.262 0-11.333-4.25-11.333-11.333 0-7.084 5.071-11.334 11.333-11.334"
    />
  </Svg>
);
export default SvgComponent;
