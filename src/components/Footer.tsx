import { Mail, Phone, MessageCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useI18n } from '@/lib/i18n'

const CONTACT_ITEMS = [
  { key: 'footer.email', value: 'jack_li.xa@foxmail.com', icon: Mail, href: 'jack_li.xa@foxmail.com' },
  // { key: 'footer.phone', value: '+86 138-0000-0000', icon: Phone, href: 'tel:+8613800000000' },
  // { key: 'footer.wechat', value: 'wx_zhangsan', icon: MessageCircle, href: '#' },
]

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-border/50">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="section-title">{t('footer.title')}</h2>
          <p className="section-subtitle">{t('footer.subtitle')}</p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {CONTACT_ITEMS.map(item => {
              const Icon = item.icon
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:shadow-apple hover:border-primary/20 hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t(item.key)}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Copyright */}
        <div className="mt-20 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {t('hero.name')}. {t('footer.copyright')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
