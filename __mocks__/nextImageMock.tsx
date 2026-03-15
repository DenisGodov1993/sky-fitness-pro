import React from "react";
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

/* eslint-disable @next/next/no-img-element */
export default function MockNextImage({ alt, ...props }: Props) {
  return <img alt={alt} {...props} />;
}