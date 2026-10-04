export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// 프로필과 링크 목록은 여기서 수정하세요.
export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://linkedin.com" },
    { id: "blog", title: "블로그", url: "https://velog.io" },
  ],
};
