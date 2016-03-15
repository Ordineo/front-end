
export interface IToolbarScope{
  buttons:Array<ButtonConfig>
}
interface ButtonConfig{
  title:string;
  icon:string;
}
export class ToolbarController implements IToolbarScope{
  public buttons:Array<ButtonConfig> = [];

  constructor(){
    this.buttons = this.getButtons();
  }

  private getButtons():Array<ButtonConfig>{
    var btns:Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig('Messages', 'com:contact_mail'));
    btns.push(this.createButtonConfig('live_help', 'com:live_help'));
    btns.push(this.createButtonConfig('forum', 'com:forum'));
    btns.push(this.createButtonConfig('email', 'com:email'));
    btns.push(this.createButtonConfig('contacts', 'com:contacts'));
    btns.push(this.createButtonConfig('comment', 'com:comment'));

    return btns;
  }

  private createButtonConfig(_title:string, _icon:string):ButtonConfig{
    return {
      title: _title,
      icon: _icon
    };
  }
}
