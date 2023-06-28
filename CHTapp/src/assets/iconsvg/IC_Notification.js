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
      stroke="#4EA8DE"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M11.5 6.172v3.19m.02-7.445a6.38 6.38 0 0 0-6.383 6.382v2.013c0 .651-.269 1.629-.604 2.185l-1.217 2.031c-.748 1.256-.23 2.655 1.15 3.115a22.367 22.367 0 0 0 14.116 0 2.127 2.127 0 0 0 1.15-3.115l-1.217-2.031c-.335-.556-.604-1.543-.604-2.185V8.299c-.01-3.507-2.884-6.382-6.392-6.382Z"
    />
    <Path
      stroke="#4EA8DE"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M14.691 18.036a3.202 3.202 0 0 1-3.191 3.191 3.197 3.197 0 0 1-2.252-.94 3.197 3.197 0 0 1-.94-2.251"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
