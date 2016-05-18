import {ProfileMenuTab} from "../ProfileMenuComponent";
import {ProfileRoutes} from "../../ProfileRoutes";
export class SummaryTab implements ProfileMenuTab {
  static NAME:string = "Summary";
  
  isActive:boolean = false;
  label:string = SummaryTab.NAME;
  route:string = ProfileRoutes.SUMMARY;
}
