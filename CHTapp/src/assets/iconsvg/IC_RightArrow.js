import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
import CUSTOM_COLORS from "../../constants/colors"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.type === 1 ? CUSTOM_COLORS.primary : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 6 6-6 6"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
