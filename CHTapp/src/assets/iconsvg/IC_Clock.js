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
      stroke="#6930C3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M25.667 14c0 6.44-5.227 11.667-11.667 11.667C7.56 25.667 2.333 20.44 2.333 14 2.333 7.56 7.56 2.334 14 2.334c6.44 0 11.667 5.226 11.667 11.666Z"
    />
    <Path
      stroke="#6930C3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m18.328 17.71-3.616-2.158c-.63-.374-1.144-1.272-1.144-2.007V8.762"
    />
  </Svg>
);
export default SvgComponent;
