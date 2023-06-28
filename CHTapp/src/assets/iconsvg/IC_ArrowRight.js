import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={37}
    fill="none"
    {...props}>
    <Path
      fill="#5390D9"
      d="M18.5.583C8.628.583.583 8.628.583 18.5c0 9.872 8.045 17.917 17.917 17.917 9.872 0 17.917-8.045 17.917-17.917C36.417 8.628 28.372.583 18.5.583Zm4.999 18.867-6.325 6.324c-.269.27-.61.395-.95.395-.34 0-.68-.126-.95-.395a1.35 1.35 0 0 1 0-1.899L20.65 18.5l-5.375-5.375a1.351 1.351 0 0 1 0-1.899c.52-.52 1.38-.52 1.9 0l6.324 6.325a1.32 1.32 0 0 1 0 1.899Z"
    />
  </Svg>
);
export default SvgComponent;
