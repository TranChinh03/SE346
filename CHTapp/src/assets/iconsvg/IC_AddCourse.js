import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={52}
    fill="none"
    {...props}>
    <Ellipse cx={25} cy={26} fill="#4EA8DE" opacity={0.2} rx={25} ry={26} />
    <Path
      stroke="#5390D9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M29.022 24.182h-6.655m3.328-3.287v6.735"
    />
    <Path
      stroke="#5390D9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M32.11 12.531H19.279c-2.835 0-5.138 2.344-5.138 5.2v18.976c0 2.425 1.717 3.448 3.82 2.277l6.496-3.65c.692-.391 1.81-.391 2.489 0l6.495 3.65c2.103 1.185 3.82.161 3.82-2.277V17.73c-.013-2.855-2.316-5.199-5.151-5.199Z"
    />
  </Svg>
);
export default SvgComponent;
