import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M9.333 2.333v3.5m9.334-3.5v3.5M4.083 10.605h19.834m.583-.688v9.916c0 3.5-1.75 5.834-5.833 5.834H9.333c-4.083 0-5.833-2.334-5.833-5.834V9.917c0-3.5 1.75-5.834 5.833-5.834h9.334c4.083 0 5.833 2.334 5.833 5.834Z"
    />
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.31 15.983h.011m-.01 3.5h.01m-4.327-3.5h.012m-.012 3.5h.012m-4.33-3.5h.012m-.012 3.5h.012"
    />
  </Svg>
);
export default SvgComponent;
