import {ProfileMenuTab} from "../ProfileMenuComponent";
import {ProfileRoutes} from "../../ProfileRoutes";
export class MilestonesTab implements ProfileMenuTab {
  static NAME: string = "Milestones";
  label: string = MilestonesTab.NAME;
  route: string = ProfileRoutes.MILESTONES;
  isActive: boolean = false;
}
