export class BaseService  {
    public endpoint: string = process.env.REACT_APP_REMOTE_ENDPOINT || "http://localhost:4000";
}
