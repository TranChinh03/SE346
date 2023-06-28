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
      stroke="#5E60CE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.945 11.902c.345 4.936 4.533 8.951 9.545 9.172 3.537.153 6.7-1.495 8.597-4.092.785-1.064.364-1.773-.95-1.534a9.095 9.095 0 0 1-1.992.134c-4.687-.191-8.52-4.11-8.54-8.74a8.525 8.525 0 0 1 .72-3.497c.517-1.189-.106-1.754-1.304-1.246-3.795 1.6-6.392 5.424-6.076 9.803Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
