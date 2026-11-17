import Image from 'next/image'
import type { ProjectImage } from '@/data/projects'

interface Props {
  images: ProjectImage[]
}

export default function ProjectGallery({ images }: Props) {
  if (images.length === 0) return null

  const isDoc = (img: ProjectImage) => img.type === 'process' || img.type === 'diagram'
  const allDocuments = images.every(isDoc)

  return (
    <section className="proj-gallery">
      <div className="ash-wrap">
        <div className="ash-eyebrow muted proj-gallery-eyebrow">
          <span className="dash" />
          Documentation
        </div>
      </div>
      <div className={`proj-gallery-grid${allDocuments ? ' proj-gallery-grid--documents' : ''}`}>
        {images.map((img, i) => {
          const isDocument = isDoc(img)
          return (
            <div key={i} className="proj-gallery-item">
              <div className={`proj-gallery-img${isDocument ? ' proj-gallery-img--document' : ''}`}>
                {img.src && (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={allDocuments ? '(max-width: 1280px) 100vw, 1184px' : '(max-width: 768px) 100vw, 50vw'}
                    style={{ objectFit: isDocument ? 'contain' : 'cover' }}
                  />
                )}
              </div>
              {img.caption && (
                <p className="proj-img-caption">{img.caption}</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
