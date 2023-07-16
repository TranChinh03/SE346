import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={52}
    fill="none"
    {...props}>
    <Ellipse
      cx={25}
      cy={25.694}
      fill="#7400B8"
      opacity={0.2}
      rx={25}
      ry={25.694}
    />
    <Path
      stroke="#7400B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.38 33.68V19.04c0-5.325 1.332-6.656 6.656-6.656h9.317c5.324 0 6.655 1.331 6.655 6.655v13.31c0 .187 0 .373-.013.56"
    />
    <Path
      stroke="#7400B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.37 19.04h10.648M20.37 23.697h6.655m-8.85 5.99h18.833v4.658a4.664 4.664 0 0 1-4.659 4.659H19.04a4.664 4.664 0 0 1-4.658-4.659v-.865a3.8 3.8 0 0 1 3.793-3.794Z"
    />
  </Svg>
);
export default SvgComponent;
