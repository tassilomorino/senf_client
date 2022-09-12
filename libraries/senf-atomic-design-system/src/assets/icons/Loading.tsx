/** @format */

import React, { FC } from "react";
import Loader from '../../components/atoms/animations/Loader'

interface SVGRProps {
	color?: string;
}

const Loading: FC<SVGRProps> = ({ color = "black" }) => (<Loader color={color} width="16px" height="16px" />);

export default Loading;
