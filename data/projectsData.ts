interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Sumr',
    description: `흩어져 사라지기 쉬운 작은 지식과 경험들을 놓치지 않기 위해, 기록하며 붙잡아 보려 애쓰는 개발자의 블로그입니다.`,
    imgSrc: '/static/imgs/1/2.png',
    href: 'https://sumr.it',
  },
  {
    title: 'Madness',
    description: `어제도, 작년에도, 심지어 더 옛날에도 봤던 거 말고, 처음보는 것들을 위한 커뮤니티`,
    imgSrc: '/static/images/madness.svg',
    href: '/blog/manual',
  },
]

export default projectsData
