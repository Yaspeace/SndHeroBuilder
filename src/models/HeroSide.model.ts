import { Sides } from "./enums/Sides.enum";

export class HeroSide {
  public pips = 1;
  public sideNum = 1;
  public keywords: string[] = [];
  public needClear = false;

  private side: number;

  constructor(side = 0) {
    this.side = side;
  }

  public generateSide(): string {
    return `${this.sideNum}-${this.pips}`;
  }

  public generateKeywords(): string {
    let res = "";
    const sideStr: string = Sides[this.side];

    if (this.needClear) {
      res += `.i.(${sideStr}.eyepatch)`;
    }

    this.keywords.forEach((k) => (res += `.i.(${sideStr}.k.${k})`));

    return res;
  }
}
