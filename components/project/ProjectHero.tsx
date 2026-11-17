import Image from 'next/image'
import type { ProjectImage } from '@/data/projects'

interface Props {
  image: ProjectImage
}

export default function ProjectHero({ image }: Props) {
  if (!image.src) {
    return <div className="proj-detail-hero-empty" aria-hidden="true" />
  }

  const isDocument = image.type === 'process' || image.type === 'diagram'

  return (
    <div className="proj-detail-hero-img">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: isDocument ? 'contain' : 'cover', objectPosition: image.position }}
      />
    </div>
  )
}
