import NextImage, { type ImageProps } from "next/image";

/** Prefix bundled images for the /daroonik static deployment. */
export default function SiteImage({ src, ...props }: ImageProps) {
  const url = typeof src === "string" && src.startsWith("/images/")
    ? `/daroonik${src}`
    : src;
  return <NextImage {...props} src={url} />;
}
