import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
import CUSTOM_COLORS from "../../constants/colors"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      stroke={CUSTOM_COLORS.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.282 8.587H6.718m4.782-1.61v1.61m2.396-.02c0 4.121-3.22 7.456-7.188 7.456"
    />
    <Path
      stroke={CUSTOM_COLORS.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.292 16.023c-1.725 0-3.259-.92-4.36-2.367"
    />
    <Path
      stroke={CUSTOM_COLORS.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.5 21.083a9.583 9.583 0 0 0 9.583-9.583A9.583 9.583 0 0 0 11.5 1.917 9.583 9.583 0 0 0 1.917 11.5a9.583 9.583 0 0 0 9.583 9.583Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
