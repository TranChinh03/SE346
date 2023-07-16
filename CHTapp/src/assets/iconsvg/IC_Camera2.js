import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#7400B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.625 6.333h2.75M5.197 19.167h9.606c2.53 0 3.539-1.55 3.658-3.438l.477-7.572A3.44 3.44 0 0 0 15.5 4.5c-.56 0-1.072-.32-1.33-.816l-.66-1.33c-.42-.833-1.52-1.52-2.456-1.52H8.955c-.944 0-2.044.687-2.466 1.52l-.66 1.33c-.257.495-.77.816-1.329.816a3.44 3.44 0 0 0-3.438 3.657l.477 7.572c.11 1.888 1.128 3.438 3.658 3.438Z"
    />
    <Path
      stroke="#7400B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 15.5c1.64 0 2.98-1.338 2.98-2.98 0-1.64-1.34-2.978-2.98-2.978a2.985 2.985 0 0 0-2.98 2.979c0 1.64 1.34 2.98 2.98 2.98Z"
    />
  </Svg>
);
export default SvgComponent;
