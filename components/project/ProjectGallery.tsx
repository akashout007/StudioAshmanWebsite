import Image from 'next/image'
import type { ProjectImage } from '@/data/projects'

export default function ProjectGallery({ images }: { images: ProjectImage[] }) {
  if (images.length === 0) return null

  const isDoc = (img: ProjectImage) => img.type === 'process' || img.type === 'diagram'
  const allDocuments = images.every(isDoc)

  return (
    <div className={`proj-gallery-grid${allDocuments ? ' proj-gallery-grid--documents' : ''}`}>
      {images.map((img) => {
        const isDocument = isDoc(img)
        return (
          <figure key={img.src} className="proj-gallery-item">
            <div className={`proj-gallery-img${isDocument ? ' proj-gallery-img--document' : ''}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes={allDocuments ? '(max-width: 1280px) calc(100vw - 40px), 1184px' : '(max-width: 768px) 100vw, 50vw'}
                style={{ objectFit: isDocument ? 'contain' : 'cover' }}
              />
            </div>
            {img.caption && <figcaption className="proj-img-caption">{img.caption}</figcaption>}
          </figure>
        )
      })}
    </div>
  )
}
