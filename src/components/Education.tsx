import { GraduationCap } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useI18n } from '@/lib/i18n'

interface EducationItem {
  schoolKey: string
  majorKey: string
  dateKey: string
  descKey: string
}

const EDUCATION_DATA: EducationItem[] = [
  {
    schoolKey: 'edu.school1',
    majorKey: 'edu.school1.major',
    dateKey: 'edu.school1.date',
    descKey: 'edu.school1.desc',
  },
  {
    schoolKey: 'edu.school2',
    majorKey: 'edu.school2.major',
    dateKey: 'edu.school2.date',
    descKey: 'edu.school2.desc',
  },
]

export function Education() {
  const { t } = useI18n()

  return (
    <section id="education" className="relative">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="section-title">{t('edu.title')}</h2>
          <p className="section-subtitle">{t('edu.subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 space-y-0">
          {EDUCATION_DATA.map((item, index) => (
            <ScrollReveal key={item.schoolKey} delay={index * 100}>
              <div className="relative pl-8 pb-12 last:pb-0 group">
                {/* Timeline line */}
                {index < EDUCATION_DATA.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-primary" />
                </div>

                {/* Content */}
                <div className="ml-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">
                      {t(item.schoolKey)}
                    </h3>
                    <span className="text-sm text-muted-foreground">{t(item.dateKey)}</span>
                  </div>
                  <p className="text-sm font-medium text-primary mb-2">{t(item.majorKey)}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
