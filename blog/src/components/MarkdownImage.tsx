import Image from 'next/image';
import { ImageProps } from 'next/image';

const MarkdownImage = ({ src, alt, ...props }: ImageProps) => {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={600}
      height={400}
      layout="responsive"
      objectFit="contain"
      {...props}
    />
  );
};

export default MarkdownImage;