import { useState } from 'react'
import { ExternalLink, Play, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useI18n } from '@/lib/i18n'

interface ProjectLink {
  textKey: string
  urlKey: string
}

interface ProjectEntry {
  id: string
  titleKey: string
  descKey: string
  links: ProjectLink[]
  videos?: { path: string; titleKey: string }[]
}

interface ExperiencePeriod {
  companyKey: string
  roleKey: string
  dateRangeKey: string
  descriptionKey: string
  projects: ProjectEntry[]
}

const EXPERIENCE_DATA: ExperiencePeriod[] = [
  {
    companyKey: 'exp_gaode.company',
    roleKey: 'exp_gaode.role',
    dateRangeKey: 'exp_gaode.date',
    descriptionKey: 'exp_gaode.desc',
    projects: [
      {
        id: 'gaode-hd-map',
        titleKey: 'exp_gaode.project1.title',
        descKey: 'exp_gaode.project1.desc',
        links: [{ textKey: 'exp_gaode.project1.link1.text', urlKey: 'exp_gaode.project1.link1.url' }],
        videos: [
          { path: '/videos/gaode-hd-map.mp4', titleKey: 'exp_gaode.project1.video.title' },
          { path: '/videos/gaode-hd-map2.mp4', titleKey: 'exp_gaode.project1.video.title2' },
        ],
      },
      {
        id: 'gaode-vlm-indoor',
        titleKey: 'exp_gaode.project2.title',
        descKey: 'exp_gaode.project2.desc',
        links: [{ textKey: 'exp_gaode.project2.link1.text', urlKey: 'exp_gaode.project2.link1.url' }],
        videos: [
          { path: '/videos/guidegpt.mp4', titleKey: 'exp_gaode.project2.video.title' },
          { path: '/videos/guidegpt2.mp4', titleKey: 'exp_gaode.project2.video.title2' },
        ],
      },
      {
        id: 'gaode-ugc-wiki',
        titleKey: 'exp_gaode.project3.title',
        descKey: 'exp_gaode.project3.desc',
        links: [{ textKey: 'exp_gaode.project3.link1.text', urlKey: 'exp_gaode.project3.link1.url' }],
        videos: [
          { path: '/videos/wiki-1.mp4', titleKey: 'exp_gaode.project3.video.title' },
          { path: '/videos/wiki-2.mp4', titleKey: 'exp_gaode.project3.video.title2' },
        ],
      },
    ]
  },
  {
    companyKey: 'exp_tongyi.company',
    roleKey: 'exp_tongyi.role',
    dateRangeKey: 'exp_tongyi.date',
    descriptionKey: 'exp_tongyi.desc',
    projects: [
      {
        id: 'wan22',
        titleKey: 'exp_tongyi.project1.title',
        descKey: 'exp_tongyi.project1.desc',
        links: [{ textKey: 'exp_tongyi.project1.link1.text', urlKey: 'exp_tongyi.project1.link1.url' }],
      },
      {
        id: 'wan25',
        titleKey: 'exp_tongyi.project2.title',
        descKey: 'exp_tongyi.project2.desc',
        links: [
          { textKey: 'exp_tongyi.project2.link1.text', urlKey: 'exp_tongyi.project2.link1.url' },
          { textKey: 'exp_tongyi.project2.link2.text', urlKey: 'exp_tongyi.project2.link2.url' },
        ],
      },
      {
        id: 'wan26',
        titleKey: 'exp_tongyi.project3.title',
        descKey: 'exp_tongyi.project3.desc',
        links: [{ textKey: 'exp_tongyi.project3.link1.text', urlKey: 'exp_tongyi.project3.link1.url' }],
        videos: [
          { path: '/videos/wan26-mv.mp4', titleKey: 'exp_tongyi.project3.video.title' },
        ],
      },
      {
        id: 'wan27',
        titleKey: 'exp_tongyi.project4.title',
        descKey: 'exp_tongyi.project4.desc',
        links: [{ textKey: 'exp_tongyi.project4.link1.text', urlKey: 'exp_tongyi.project4.link1.url' }],
      },
    ]
  },
]

function VideoModal({ videoPath, title, onClose }: { videoPath: string; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      {/* Modal */}
      <div
        className="relative w-full max-w-5xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
        <div className="rounded-2xl shadow-2xl overflow-hidden bg-black">
          <video
            src={videoPath}
            controls
            autoPlay
            className="w-full max-h-[85vh]"
            title={title}
          />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onVideoClick }: { project: ProjectEntry; onVideoClick: (video: { path: string; title: string }) => void }) {
  const { t } = useI18n()

  return (
    <Card className="group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      {/* Accent top bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary to-primary/50" />

      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t(project.titleKey)}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(project.descKey)}
        </p>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.links.map(link => (
              <a
                key={link.textKey}
                href={t(link.urlKey)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors bg-primary/5 hover:bg-primary/10 rounded-full px-3 py-1.5"
              >
                <ExternalLink className="h-3 w-3" />
                {t(link.textKey)}
              </a>
            ))}
          </div>
        )}

        {/* Video buttons */}
        {project.videos && project.videos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.videos.map((video, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => onVideoClick({ path: video.path, title: t(video.titleKey) })}
              >
                <Play className="h-3 w-3" />
                {project.videos!.length > 1 ? `${t('common.watchVideo')} ${index + 1}` : t('common.watchVideo')}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ExperiencePeriodCard({ period, onVideoClick }: { period: ExperiencePeriod; onVideoClick: (video: { path: string; title: string }) => void }) {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      {/* Period Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
          <h3 className="text-2xl font-bold text-foreground">{t(period.companyKey)}</h3>
          <span className="text-sm font-medium text-primary tabular-nums">{t(period.dateRangeKey)}</span>
        </div>
        <p className="text-base font-medium text-primary mb-3">{t(period.roleKey)}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(period.descriptionKey)}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {period.projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 100}>
            <ProjectCard project={project} onVideoClick={onVideoClick} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

export function Experience() {
  const { t } = useI18n()
  const [activeVideo, setActiveVideo] = useState<{ path: string; title: string } | null>(null)

  return (
    <section id="experience" className="bg-secondary/30">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="section-title">{t('exp.title')}</h2>
          <p className="section-subtitle">{t('exp.subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 space-y-16">
          {EXPERIENCE_DATA.map((period, index) => (
            <ScrollReveal key={period.companyKey} delay={index * 100}>
              <ExperiencePeriodCard 
                period={period} 
                onVideoClick={(video) => setActiveVideo(video)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Video Modal at top level */}
      {activeVideo && (
        <VideoModal
          videoPath={activeVideo.path}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  )
}
