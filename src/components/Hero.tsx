import { ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useI18n } from '@/lib/i18n'

export function Hero() {
  const { t } = useI18n()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center">
        <ScrollReveal>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-6">
            {t('hero.greeting')}
          </p>
        </ScrollReveal>

        {/* Profile Photo */}
        <ScrollReveal delay={100}>
          <div className="mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mx-auto">
              <img 
                src="/images/profile.jpg" 
                alt={t('hero.name')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-0.04em' }}>
            <span className="text-gradient">{t('hero.name')}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-lg md:text-xl font-medium text-foreground/80 mb-6 tracking-tight">
            {t('hero.title')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="flex gap-4 justify-center">
            <ButtonLink variant="apple" size="lg" href="#experience">
              {t('hero.cta')}
            </ButtonLink>
            <ButtonLink variant="outline" size="lg" href="#contact">
              {t('hero.contact')}
            </ButtonLink>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
