import Image from 'next/image';
import { ImageProps } from 'next/image';

interface MarkdownImageProps extends Omit<ImageProps, 'src'> {
  src?: string;
}

const MarkdownImage = ({ src, alt = '', ...props }: MarkdownImageProps) => {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      {...props}
    />
  );
};

export default MarkdownImage;