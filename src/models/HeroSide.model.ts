import { Sides } from "./enums/Sides.enum";
import { Side } from "./Side.model";

export class HeroSide {
  public pips = 1;
  public side: Side = new Side(1);
  public keywords: string[] = [];
  public needClear = false;

  private sideLocation: number;

  constructor(location = 0) {
    this.sideLocation = location;
  }

  public generateSide(): string {
    return `${this.side.number}-${this.pips}`;
  }

  public generateKeywords(): string {
    let res = "";
    const sideStr: string = Sides[this.sideLocation];

    if (this.needClear) {
      res += `.i.(${sideStr}.eyepatch)`;
    }

    this.keywords.forEach((k) => (res += `.i.(${sideStr}.k.${k})`));

    return res;
  }
}
