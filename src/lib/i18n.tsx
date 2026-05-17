import React, { createContext, useContext, useState, useCallback } from 'react'

type Lang = 'zh' | 'en'

interface I18nContextType {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.about': { zh: '个人介绍', en: 'About' },
  'nav.education': { zh: '教育背景', en: 'Education' },
  'nav.experience': { zh: '工作经历', en: 'Experience' },
  'nav.contact': { zh: '联系方式', en: 'Contact' },

  // Hero
  'hero.greeting': { zh: '你好，我是', en: "Hi, I'm" },
  'hero.name': { zh: '李明星', en: 'Li Mingxing' },
  'hero.title': { zh: '第四次工业革命中，负责推动『AGI』一小步', en: 'In the fourth industrial revolution, responsible for pushing a small step of『AGI』' },
  'hero.subtitle': {
    zh: '给BIG MODEL擦亮眼睛，脑子对齐物理世界',
    en: 'Brightening the eyes of the big model, aligning its mind with the physical world.',
  },
  'hero.cta': { zh: '了解更多', en: 'Learn More' },
  'hero.contact': { zh: '联系我', en: 'Contact Me' },

  // About
  'about.title': { zh: '个人介绍', en: 'About Me' },
  'about.subtitle': { zh: '了解更多关于我的信息', en: 'Learn more about me' },
  'about.profile.title': { zh: '关于我', en: 'About Me' },
  'about.profile.content': {
    zh: '我是李明星，一名致力于人工智能研究的学者和工程师。本科毕业于西安电子科技大学，研究生毕业于中国科学技术大学。在校期间，我有幸师从刘东教授和熊志伟教授，深入探索AI领域的前沿技术。除了学术研究，我也热衷于技术分享，在工作空闲时会在知乎上撰写技术文章，与大家交流心得体会。我一直在阿里巴巴集团工作，负责AI相关项目。我目前在阿里巴巴-通义实验室-万相团队，负责视频生成基础模型的研发。',
    en: "I'm Li Mingxing, a scholar and engineer dedicated to AI research. I completed my undergraduate studies at Xidian University and my graduate studies at University of Science and Technology of China. During my academic journey, I had the privilege of being mentored by Prof. Liu Dong and Prof. Zhiwei Xiong, exploring cutting-edge technologies in AI. Beyond academic research, I'm passionate about knowledge sharing and write technical articles on Zhihu during my spare time. I have been working at Alibaba Group, responsible for AI-related projects. I have been working at Alibaba Group, responsible for AI-related projects. I am currently working in the Alibaba - Tongyi Laboratory - Wan team, responsible for the research and development of the basic model for video generation.",
  },
  'about.education.title': { zh: '教育背景', en: 'Education' },
  'about.education.master': { zh: '研究生 - 中国科学技术大学', en: 'Graduate - University of Science and Technology of China' },
  'about.education.master.school': { zh: '硕士学历', en: 'Master Degree' },
  'about.education.bachelor': { zh: '本科 - 西安电子科技大学', en: 'Undergraduate - Xidian University' },
  'about.education.bachelor.school': { zh: '学士学位', en: 'Bachelor Degree' },
  'about.advisors.title': { zh: '导师', en: 'Advisors' },
  'about.advisors.advisor1': { zh: '刘东', en: 'Liu Dong' },
  'about.advisors.advisor2': { zh: '熊志伟', en: 'Zhiwei Xiong' },
  'about.links.title': { zh: '学术链接', en: 'Academic Links' },
  'about.links.scholar': { zh: 'Google 学术', en: 'Google Scholar' },
  'about.links.zhihu': { zh: '知乎主页', en: 'Zhihu Profile' },

  // Education
  'edu.title': { zh: '教育背景', en: 'Education' },
  // 'edu.subtitle': { zh: '学术基础与专业训练', en: 'Academic Foundation & Professional Training' },
  'edu.school1': { zh: '中国科学技术大学', en: 'University of Science and Technology of China' },
  'edu.school1.major': { zh: '计算机科学与技术 · 硕士', en: 'Master' },
  'edu.school1.date': { zh: '2019 - 2022', en: '2019 - 2022' },
  'edu.school1.desc': {
    zh: '校级优秀毕业生；一等奖学金',
    en: 'Outstanding graduate; First-class scholarship',
  },
  'edu.school2': { zh: '西安电子科技大学', en: 'Xidian University' },
  'edu.school2.major': { zh: '学士', en: 'Bachelor' },
  'edu.school2.date': { zh: '2015 - 2019', en: '2015 - 2019' },
  'edu.school2.desc': {
    zh: '保送研究生',
    en: 'Admitted to graduate program',
  },

  // Experience
  'exp.title': { zh: '工作经历', en: 'Experience' },
  'exp.subtitle': { zh: '在人工智能与自动驾驶领域持续深耕', en: 'Continuously advancing in AI and autonomous driving' },

  // Experience - 高德 (2022-2025)
  'exp_gaode.company': { zh: '阿里巴巴-高德', en: 'Alibaba - AutoNavi' },
  'exp_gaode.role': { zh: '感知算法工程师->多模态理解算法工程师', en: 'Perception Algorithm Engineer -> Multimodal Understanding Algorithm Engineer' },
  'exp_gaode.date': { zh: '2022 - 2025', en: '2022 - 2025' },
  'exp_gaode.desc': {
    zh: '在高德负责高精地图感知算法、VLM室内智能引导以及UGC内容建设，致力于打造领先的地图与导航体验。',
    en: 'Responsible for HD map perception algorithms, VLM-based indoor smart guidance, and UGC content at AutoNavi, committed to building leading map and navigation experiences.',
  },

  // 高德项目1：高精地图-感知算法
  'exp_gaode.project1.title': { zh: '高德高精地图-感知算法', en: 'AutoNavi HD Map - Perception Algorithm' },
  'exp_gaode.project1.desc': {
    zh: '负责高精地图的感知算法研发，包括多传感器融合、目标检测与跟踪等核心技术，为自动驾驶提供高精度的地图数据支持。',
    en: 'Led the development of perception algorithms for HD maps, including multi-sensor fusion, object detection and tracking, providing high-precision map data support for autonomous driving.',
  },
  'exp_gaode.project1.link1.text': { zh: '了解更多', en: 'Learn More' },
  'exp_gaode.project1.link1.url': { zh: '#', en: '#' },
  'exp_gaode.project1.video.title': { zh: '高精地图感知算法演示', en: 'HD Map Perception Algorithm Demo' },
  'exp_gaode.project1.video.title2': { zh: '高精地图感知算法演示2', en: 'HD Map Perception Algorithm Demo 2' },

  // 高德项目2：基于VLM的室内智能引导
  'exp_gaode.project2.title': { zh: '基于VLM的室内智能引导', en: 'VLM-based Indoor Smart Guidance' },
  'exp_gaode.project2.desc': {
    zh: '基于视觉语言模型（VLM）开发室内智能引导系统，实现复杂室内环境下的精准导航与智能交互，提升用户在商场、机场等场景的导航体验。',
    en: 'Developed an indoor smart guidance system based on Vision-Language Models (VLM), enabling precise navigation and intelligent interaction in complex indoor environments, enhancing user experience in malls, airports, and other scenarios.',
  },
  'exp_gaode.project2.link1.text': { zh: '了解更多', en: 'Learn More' },
  'exp_gaode.project2.link1.url': { zh: '#', en: '#' },
  'exp_gaode.project2.video.title': { zh: 'VLM室内引导演示', en: 'VLM Indoor Guidance Demo' },
  'exp_gaode.project2.video.title2': { zh: 'VLM室内引导演示2', en: 'VLM Indoor Guidance Demo 2' },

  // 高德项目3：UGC内容-维基百科
  'exp_gaode.project3.title': { zh: '高德UGC内容-维基百科', en: 'AutoNavi UGC Content - Wikipedia' },
  'exp_gaode.project3.desc': {
    zh: '主导高德UGC内容生态建设，打造地图领域的维基百科功能，允许用户贡献和编辑地点信息，丰富地图内容生态。',
    en: 'Led the construction of AutoNavi UGC content ecosystem, creating a Wikipedia-like feature for maps, allowing users to contribute and edit location information, enriching the map content ecosystem.',
  },
  'exp_gaode.project3.link1.text': { zh: '了解更多', en: 'Learn More' },
  'exp_gaode.project3.link1.url': { zh: '#', en: '#' },
  'exp_gaode.project3.video.title': { zh: 'UGC内容生态演示', en: 'UGC Content Ecosystem Demo' },
  'exp_gaode.project3.video.title2': { zh: 'UGC内容生态演示2', en: 'UGC Content Ecosystem Demo 2' },

  // Experience - 通义实验室 (2025-2026)
  'exp_tongyi.company': { zh: '阿里巴巴-通义实验室', en: 'Alibaba - Tongyi Lab' },
  'exp_tongyi.role': { zh: 'AI研究员', en: 'AI Researcher' },
  'exp_tongyi.date': { zh: '2025 - 2026', en: '2025 - 2026' },
  'exp_tongyi.desc': {
    zh: '在通义实验室负责了Wan系列音视频生成模型的研发工作，主要集中在预训练和强化学习方面搬砖。',
    en: 'Responsible for the research and development of the Wan series audio and video generation models at Tongyi Lab, focusing on pre-training and reinforcement learning.',
  },

  // 通义项目1：Wan2.2
  'exp_tongyi.project1.title': { zh: 'Wan2.2', en: 'Wan2.2' },
  'exp_tongyi.project1.desc': {
    zh: '我们开源了Wan2.2视频生成模型，高低噪声MoE架构，主打t2v和i2v',
    en: 'We have open-sourced the Wan2.2 video generation model, featuring a high and low noise MoE architecture, with a focus on t2v and i2v',
  },
  'exp_tongyi.project1.link1.text': { zh: 'GitHub (15k+ ⭐)', en: 'GitHub (15k+ ⭐)' },
  'exp_tongyi.project1.link1.url': { zh: 'https://github.com/Wan-Video/Wan2.2', en: 'https://github.com/Wan-Video/Wan2.2' },

  // 通义项目2：Wan2.5
  'exp_tongyi.project2.title': { zh: 'Wan2.5', en: 'Wan2.5' },
  'exp_tongyi.project2.desc': {
    zh: '国内首个音视频多模态同出的基础模型，支持t2va，ti2va，ta2va, tai2va, t2v以及ti2v',
    en: 'Wan2.5 is the first multimodal foundation model in China, supporting t2va, ti2va, ta2va, tai2va, t2v, and ti2v',
  },
  'exp_tongyi.project2.link1.text': { zh: '知乎解读（上）', en: 'Zhihu Article 1' },
  'exp_tongyi.project2.link1.url': { zh: 'https://www.zhihu.com/question/1954176642952962102/answer/1954192492967749082', en: 'https://www.zhihu.com/question/1954176642952962102/answer/1954192492967749082' },
  'exp_tongyi.project2.link2.text': { zh: '知乎解读（下）', en: 'Zhihu Article 2' },
  'exp_tongyi.project2.link2.url': { zh: 'https://zhuanlan.zhihu.com/p/1954193350681919868', en: 'https://zhuanlan.zhihu.com/p/1954193350681919868' },

  // 通义项目3：Wan2.6
  'exp_tongyi.project3.title': { zh: 'Wan2.6', en: 'Wan2.6' },
  'exp_tongyi.project3.desc': {
    zh: 'Wan2.6 和Sora2一样引入了 音视频角色参考 能力，简称r2v。另外基础音视频能力拓展到15s。',
    en: 'Wan2.6 and Sora2 both introduced audio and video role reference capabilities, i.e., r2v.',
  },
  'exp_tongyi.project3.link1.text': { zh: '了解更多', en: 'Learn More' },
  'exp_tongyi.project3.link1.url': { zh: 'https://mp.weixin.qq.com/s/HU19meKxI2PDVYgXBNx5Qw', en: 'https://mp.weixin.qq.com/s/HU19meKxI2PDVYgXBNx5Qw' },
  'exp_tongyi.project3.video.title': { zh: 'Wan2.6演示视频', en: 'Wan2.6 Demo Video' },

  // 通义项目4：Wan2.7
  'exp_tongyi.project4.title': { zh: 'Wan2.7', en: 'Wan2.7' },
  'exp_tongyi.project4.desc': {
    zh: 'Wan2.7增加了视频编辑功能，基础音视频能力相比Wan2.6好很多，尤其是画面质感。',
    en: 'Wan2.7 adds video editing functionality, with significantly better basic audio and video capabilities compared to Wan2.6, especially in terms of visual texture.',
  },
  'exp_tongyi.project4.link1.text': { zh: '了解更多', en: 'Learn More' },
  'exp_tongyi.project4.link1.url': { zh: 'https://mp.weixin.qq.com/s/unYBE_vho4nHXnPSoBRdOQ', en: 'https://mp.weixin.qq.com/s/unYBE_vho4nHXnPSoBRdOQ' },

  // Footer
  'footer.title': { zh: '联系我', en: 'Get in Touch' },
  'footer.subtitle': {
    zh: '欢迎交流',
    en: "Looking forward to connecting with you",
  },
  'footer.email': { zh: '邮箱', en: 'Email' },
  'footer.phone': { zh: '电话', en: 'Phone' },
  'footer.wechat': { zh: '微信', en: 'WeChat' },
  'footer.copyright': { zh: '版权所有', en: 'All rights reserved' },

  // Common
  'common.viewProject': { zh: '查看项目', en: 'View Project' },
  'common.watchVideo': { zh: '观看视频', en: 'Watch Video' },
  'common.links': { zh: '相关链接', en: 'Related Links' },
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'zh' ? 'en' : 'zh'))
  }, [])

  const t = useCallback(
    (key: string) => {
      const entry = translations[key]
      if (!entry) return key
      return entry[lang] || key
    },
    [lang]
  )

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
