import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none">
    <Path
      d="M17 4.383C14.04 4.1025 11.0622 3.958 8.09333 3.958C6.33333 3.958 4.57333 4.043 2.81333 4.213L1 4.383M5.88889 3.5245L6.08444 2.411C6.22667 1.6035 6.33333 1 7.83556 1H10.1644C11.6667 1 11.7822 1.6375 11.9156 2.4195L12.1111 3.5245M15.0889 7.069L14.5111 15.6285C14.4133 16.963 14.3333 18 11.8533 18H6.14667C3.66667 18 3.58667 16.963 3.48889 15.6285L2.91111 7.069M7.51556 13.325H10.4756M6.77778 9.925H11.2222"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
