import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={11}
    fill="none"
    {...props}
  >
    <Path
      stroke="#7400B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.594 5.5 6.192 10.1 15.407.9"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
