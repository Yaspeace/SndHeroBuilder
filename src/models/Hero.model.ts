import { Sides } from "./enums/Sides.enum";
import { HeroSide } from "./HeroSide.model";

export class Hero {
  public baseChar = "Ludus";
  public hp = -1;
  public color = "";
  public sides: HeroSide[] = [
    new HeroSide(Sides.Left),
    new HeroSide(Sides.Mid),
    new HeroSide(Sides.Top),
    new HeroSide(Sides.Bot),
    new HeroSide(Sides.Right),
    new HeroSide(Sides.Rightmost),
  ];

  public generate(): string {
    let res: string = this.baseChar;

    if (this.hp > 0) {
      res += `.hp.${this.hp}`;
    }

    if (this.color) {
      res += `.col.${this.color}`;
    }

    res += ".sd." + this.sides.map((x) => x.generateSide()).join(":");
    res += this.sides.map((x) => x.generateKeywords()).join("");

    return res;
  }
}
