import SIDE_TYPES from "@/assets/side_types.json";
import { SideType } from "@/models/SideType.model";

export class SideTypeService {
  public getSideTypes(): SideType[] {
    return SIDE_TYPES;
  }

  public searchSideTypes(query: string): SideType[] {
    return this.getSideTypes().filter((x) => x.type.includes(query));
  }

  public getSideType(num: number): SideType {
    return (
      this.getSideTypes().find((side) => side.number == num) || new SideType()
    );
  }
}
