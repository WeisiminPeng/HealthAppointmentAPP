export class Message {
    idD: string;
    idP: string;
    chatlist: [];
    constructor(idD: string, idP: string) {
        this.idD=idD;
        this.idP=idP;
        this.chatlist=[];
    }
}