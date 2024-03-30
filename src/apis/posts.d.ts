export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Response {
  data: Post[];
}

export function get(params?: any): Promise<Response>;
export function post(data: any): Promise<Response>;
export function put(id: number, data: any): Promise<Response>;
export function del(id: number): Promise<Response>;
export function patch(id: number, data: any): Promise<Response>;
