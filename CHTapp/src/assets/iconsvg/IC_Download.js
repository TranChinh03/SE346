import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#5390D9"
      d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0Zm4.236 13.236-3.6 3.6A.89.89 0 0 1 12 17.1a.89.89 0 0 1-.636-.264l-3.6-3.6a.905.905 0 0 1 0-1.272.905.905 0 0 1 1.272 0l2.064 2.064V7.8c0-.492.408-.9.9-.9.492 0 .9.408.9.9v6.228l2.064-2.064a.905.905 0 0 1 1.272 0 .905.905 0 0 1 0 1.272Z"
    />
  </Svg>
);
export default SvgComponent;
