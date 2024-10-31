// dummyData.ts
export type Subscribe = {
  subscribeId: number;
  subscribeName: string;
  subscribeDescription: string;
  subscribePrice: number;
  subscribeRate: number;
  subscribeImgs: string[];
};

export type Food = {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  foodImg: string;
};

export type ApiResponse = {
  subscribes: Subscribe[];
  foods: Food[];
};

export const dummyData: ApiResponse = {
  subscribes: [
    {
      subscribeId: 1,
      subscribeName: "고기패키지",
      subscribeDescription: "고기반찬~",
      subscribePrice: 13000,
      subscribeRate: 10,
      subscribeImgs: ["S3이미지"],
    },
    {
      subscribeId: 2,
      subscribeName: "생선패키지",
      subscribeDescription: "생선반찬~",
      subscribePrice: 15000,
      subscribeRate: 12,
      subscribeImgs: ["S3이미지"],
    },
  ],
  foods: [
    {
      foodId: 1,
      foodName: "장조림",
      foodDescription: "맛있는 장조림",
      foodPrice: 3000,
      foodImg: "S3주소",
    },
    {
      foodId: 2,
      foodName: "파김치",
      foodDescription: "엄마손맛 파김치",
      foodPrice: 3000,
      foodImg: "S3주소",
    },
    {
      foodId: 3,
      foodName: "제육볶음",
      foodDescription: "맛있는 제육볶음",
      foodPrice: 3000,
      foodImg: "S3주소",
    },
    {
      foodId: 4,
      foodName: "불고기",
      foodDescription: "달달한 불고기",
      foodPrice: 3000,
      foodImg: "S3주소",
    },
    {
      foodId: 5,
      foodName: "김치찌개",
      foodDescription: "칼칼한 김치찌개",
      foodPrice: 3000,
      foodImg: "S3주소",
    },
  ],
};
