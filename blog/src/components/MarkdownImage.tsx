import Image from 'next/image';

export default function MarkdownImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      layout="responsive"
      objectFit="contain"
    />
  );
}