interface IPanelController{
        people: Array<any>;
        persona: any;
        showSearch:boolean;
        goToProfile(href:string):void;
        joinUnit(selected:any):void;
        toggleSearch():void;

    }


    class PanelController implements  IPanelController{

        people:Array<any>;
        persona:any;
        showSearch:boolean;

        public static $inject = ['PersonFactory', 'persons', 'person', '$location'];

        toggleSearch():void {
            this.showSearch = !this.showSearch;
        }


        goToProfile(href:string):void {

            console.log('party')
        }

        joinUnit(selected:any):void {

            console.log('party')
        }




    }

