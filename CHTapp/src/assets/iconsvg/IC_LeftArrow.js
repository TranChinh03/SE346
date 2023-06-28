import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {memo} from 'react';
import CUSTOM_COLORS from '../../constants/colors';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}>
    <Circle
      cx={24}
      cy={24}
      r={23.5}
      fill={props.type === 1 ? CUSTOM_COLORS.PictionBlue : '#F5F5F5'}
      stroke={props.type === 1 ? CUSTOM_COLORS.PictionBlue : '#F5F5F5'}
    />
    <Path
      stroke={props.type === 1 ? 'white' : CUSTOM_COLORS.PictionBlue}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m27 30-6-6 6-6"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
