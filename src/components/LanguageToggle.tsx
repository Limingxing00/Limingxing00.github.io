import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

export function LanguageToggle() {
  const { lang, toggleLang } = useI18n()

  return (
    <Button variant="ghost" size="sm" onClick={toggleLang} aria-label="Toggle language" className="gap-1.5">
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium">{lang === 'zh' ? 'EN' : '中'}</span>
    </Button>
  )
}
