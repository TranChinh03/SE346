import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={31}
    fill="none"
    {...props}>
    <Path
      fill={props.fill}
      d="M19.5 6.37v7.45c0 .15-.05.3-.18.43l-5.51 5.55c-.13.14-.3.2-.47.2H5.37A4.87 4.87 0 0 1 .5 15.13V6.37A4.87 4.87 0 0 1 5.37 1.5h9.26a4.87 4.87 0 0 1 4.87 4.87Z"
      opacity={0.4}
    />
    <Path
      fill={props.fill}
      d="M6.29 4.29c-.42 0-.75-.34-.75-.75V.75a.75.75 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76Zm7.42 0c-.42 0-.75-.34-.75-.75V.75a.75.75 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76Zm-.93 6.42H5.36a.75.75 0 1 1 0-1.5h7.42a.75.75 0 0 1 0 1.5ZM10 14.422H5.36a.75.75 0 1 1 0-1.5H10a.75.75 0 1 1 0 1.5Zm9.5-.602c0 .15-.05.3-.18.43l-5.51 5.55c-.13.14-.3.2-.47.2-.33 0-.65-.26-.65-.64v-3.5c0-1.46 1.24-2.67 2.76-2.67.95-.01 2.27-.01 3.4-.01.39 0 .65.31.65.64Z"
    />
    <Circle cx={9.5} cy={28.5} r={2.5} fill={props.fill2} opacity={0.7} />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
