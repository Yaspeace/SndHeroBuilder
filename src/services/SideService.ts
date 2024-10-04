import SIDES from "@/assets/side_numbers.json";
import { HeroSide } from "@/models/HeroSide.model";
import { Side } from "@/models/Side.model";
import { SideEdit } from "@/models/SideEdit.model";

export class SideService {
  public getSides(): Side[] {
    return SIDES;
  }

  public getSide(num: number): Side {
    return this.getSides().find((x) => x.number === num) || new Side(1);
  }

  public fitSide(side: SideEdit): HeroSide {
    const res = new HeroSide();
    res.pips = side.pipCount;

    const fittestSide = this.getFittestSide(side.type.number, side.keywords);
    if (fittestSide) {
      res.needClear = false;
      res.side = fittestSide;
      const exceptKeywords = side.keywords.filter(
        (k) => !fittestSide.keywords.includes(k)
      );
      res.keywords = exceptKeywords;
    } else {
      const emptySide = this.getEmptySideByType(side.type.number);
      res.needClear = !!emptySide.keywords.length;
      res.side = emptySide;
      res.keywords = side.keywords;
    }

    return res;
  }

  private getEmptySideByType(typeNum: number): Side {
    let res = this.getSides().find(
      (sd) => sd.type === typeNum && !sd.keywords.length
    );
    if (!res) {
      res = this.getSides().find((sd) => sd.type === typeNum);
    }

    return res || new Side(0);
  }

  private getFittestSide(type: number, keywords: string[]): Side | null {
    const sides = this.getSides().filter((x) => x.type === type);
    return this.getSideByKeywords(sides, keywords);
  }

  private getSideByKeywords(sides: Side[], keywords: string[]): Side | null {
    let foundSide: Side | null = null;
    this.getKeywordCombinations(keywords).forEach((keys) => {
      const side = sides.find((sd) => this.arrayEquals(keys, sd.keywords));
      if (!foundSide && side) {
        foundSide = side;
      }
    });

    return foundSide;
  }

  private getKeywordCombinations(keywords: string[]): string[][] {
    const res: string[][] = [];
    for (let exceptCnt = 0; exceptCnt <= keywords.length; exceptCnt++) {
      this.exceptIndexes(keywords, exceptCnt).forEach((keys) => res.push(keys));
    }

    return res;
  }

  private exceptIndexes(keywords: string[], exceptCnt: number): string[][] {
    if (exceptCnt === 0) {
      return [keywords];
    }

    if (exceptCnt === keywords.length) {
      return [[]];
    }

    const idx: number[] = [];
    let curIdx = keywords.length - 1;
    while (exceptCnt > 0) {
      idx.push(curIdx);
      --curIdx;
      --exceptCnt;
    }

    const res: string[][] = [];
    res.push(this.getExceptIndex(keywords, idx));
    while (!this.checkEnd(idx)) {
      this.stepIdx(idx);
      res.push(this.getExceptIndex(keywords, idx));
    }

    return res;
  }

  private getExceptIndex(keywords: string[], except: number[]): string[] {
    return keywords.filter((_, i) => !except.includes(i));
  }

  private checkEnd(indexes: number[]): boolean {
    return !indexes.some((i, ii) => i !== ii);
  }

  /**
   * [2,3] -> [1,3] -> [0,3] -> [1,2] -> [0,2] -> [0,1]
   */
  private stepIdx(indexes: number[]): void {
    const idxToDecrease = indexes.findIndex((i, ii) => i !== ii);
    if (idxToDecrease === -1) {
      return;
    }

    indexes[idxToDecrease] -= 1;
    for (let i = idxToDecrease - 1; i >= 0; i--) {
      indexes[i] = indexes[idxToDecrease] - (idxToDecrease - i);
    }
  }

  private arrayEquals(arr1: string[], arr2: string[]): boolean {
    return (
      arr1.length === arr2.length &&
      !arr1.some((x) => !arr2.includes(x)) &&
      !arr2.some((x) => !arr1.includes(x))
    );
  }
}
