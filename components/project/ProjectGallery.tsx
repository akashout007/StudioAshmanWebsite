import Image from 'next/image'
import type { ProjectImage } from '@/data/projects'

interface Props {
  images: ProjectImage[]
}

export default function ProjectGallery({ images }: Props) {
  if (images.length === 0) return null

  return (
    <section className="proj-gallery">
      <div className="ash-wrap">
        <div className="ash-eyebrow muted proj-gallery-eyebrow">
          <span className="dash" />
          Documentation
        </div>
      </div>
      <div className="proj-gallery-grid">
        {images.map((img, i) => {
          const isDocument = img.type === 'process' || img.type === 'diagram'
          return (
            <div key={i} className="proj-gallery-item">
              <div className={`proj-gallery-img${isDocument ? ' proj-gallery-img--document' : ''}`}>
                {img.src && (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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
