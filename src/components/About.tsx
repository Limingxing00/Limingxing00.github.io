import { User, BookOpen, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useI18n } from '@/lib/i18n'

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="relative">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </ScrollReveal>

        <div className="mt-12 space-y-8">
          {/* 个人简介 - 单独一行 */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t('about.profile.title')}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.profile.content')}
              </p>
            </div>
          </ScrollReveal>

          {/* 导师信息和学术链接 - 同一行 */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* 导师信息 */}
            <ScrollReveal delay={200}>
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t('about.advisors.title')}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <a 
                      href="https://scholar.google.com/citations?user=lOWByxoAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                    >
                      {t('about.advisors.advisor1')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div>
                    <a 
                      href="https://scholar.google.com/citations?user=Snl0HPEAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                    >
                      {t('about.advisors.advisor2')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 学术链接 */}
            <ScrollReveal delay={300}>
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t('about.links.title')}</h3>
                </div>
                <div className="space-y-3">
                  <a 
                    href="https://scholar.google.com/citations?user=-pfkprkAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t('about.links.scholar')}
                  </a>
                  <a 
                    href="https://www.zhihu.com/people/ff775af68a40945c548f2b40e96baf50"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t('about.links.zhihu')}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
