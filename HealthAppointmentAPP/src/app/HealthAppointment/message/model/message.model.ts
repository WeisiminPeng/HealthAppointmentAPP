export class Message {
    username1: string;
    username2: string;
    chatlist: any[];
    constructor(username1: string, username2: string, chatlist:any[]) {
        this.username1=username1;
        this.username2=username2;
        this.chatlist=chatlist;
    }
}