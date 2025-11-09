interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Sumr',
    description: `흩어져 사라지기 쉬운 작은 지식과 경험들을 놓치지 않기 위해, 기록하며 붙잡아 보려 애쓰는 개발자의 블로그입니다`,
    imgSrc: '/static/imgs/1/2.png',
    href: 'https://sumr.it',
  },
  {
    title: 'Madness',
    description: `온라인 프레젠테이션 서비스, Notion의 프레젠테이션 버전`,
    imgSrc: '/static/images/madness.svg',
    href: 'https://madn.es',
  },
]

export default projectsData
