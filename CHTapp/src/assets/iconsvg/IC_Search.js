import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}>
    <Path
      stroke="#7400B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15.583 15.583-1.416-1.416m-6.021.708a6.73 6.73 0 0 0 4.758-11.487 6.73 6.73 0 1 0-4.758 11.487Z"
    />
  </Svg>
);
export default SvgComponent;
