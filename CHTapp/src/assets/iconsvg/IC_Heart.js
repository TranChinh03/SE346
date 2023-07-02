import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}>
    <Path
      fill={props.fillH}
      stroke="#FF5F50"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M20.517 27.342c-.284.1-.75.1-1.034 0-2.416-.825-7.816-4.267-7.816-10.1 0-2.575 2.075-4.659 4.633-4.659 1.517 0 2.858.734 3.7 1.867a4.608 4.608 0 0 1 3.7-1.866c2.558 0 4.633 2.083 4.633 4.658 0 5.833-5.4 9.275-7.816 10.1Z"
    />
    <Circle
      cx={20}
      cy={20}
      r={19.75}
      stroke="#FF5F50"
      strokeWidth={1}
      opacity={0.7}
    />
  </Svg>
);
export default SvgComponent;
