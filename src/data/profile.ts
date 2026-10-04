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
  name: "김팔수",
  bio: "힘이 센 사람",
  image: "/LinkedIn_profile_photo_sample_smiling-300x300.jpg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/drhanlondon" },
    { id: "linkedin", title: "LinkedIn", url: "https://linkedin.com/in/drhanlondon" },
    { id: "facebook", title: "Facebook", url: "https://facebook.com/drhanlondon" },
  ],
};
