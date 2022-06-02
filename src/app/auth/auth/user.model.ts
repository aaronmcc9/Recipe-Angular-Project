export class User {
    constructor(public email: string,
        public password: string,
        private _token: string,
        private _tokenExpirationDate: Date) { }


    get token() {
        //if the token does not exist or the current date is greater
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
            return this._token;
    }
}