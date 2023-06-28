import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      stroke="#64DFDF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.5 7.667v4.791m0 8.625c5.27 0 9.583-4.312 9.583-9.583 0-5.27-4.312-9.583-9.583-9.583-5.27 0-9.583 4.312-9.583 9.583 0 5.27 4.312 9.583 9.583 9.583Z"
    />
    <Path
      stroke="#64DFDF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.495 15.333h.01"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
