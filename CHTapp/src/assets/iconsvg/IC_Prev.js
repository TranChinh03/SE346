import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none">
    <Circle cx="24" cy="24" r="23.5" fill="#7400B8" stroke="white" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27 30L21 24L27 18"
      fill="#7400B8"
    />
    <Path
      d="M27 30L21 24L27 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
