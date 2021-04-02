
export interface IRequestParam {
    dataType: "query" | "headers" | "params" | "body" | "user" | "file" | "files" | "request" | "response" | "authorization";
    dataName?: string;
    index: number;
}
