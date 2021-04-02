type AuthorizationType = 'ApiKey' | 'Bearer';

export class Authorization {
    public type!: AuthorizationType;
    private _token!: string;

    protected constructor(type: AuthorizationType, token: string) {
        this.type = type;
        this._token = token;
    }

    public get token() {
        return this._token.toLowerCase();
    }

    public static fromHeader(header: string) {
        const s = header.split(" ");
        return new Authorization(s[0] as AuthorizationType, s[1]);
    }
}
