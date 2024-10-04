import KEYWORDS from "@/assets/keywords.json";

export class KeywordService {
  public getKeywords(): string[] {
    return KEYWORDS;
  }

  public searchKeywords(query: string): string[] {
    return this.getKeywords().filter((x) => x.includes(query));
  }
}
