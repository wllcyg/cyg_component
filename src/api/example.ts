import service from "@/request/Request.tsx";

export function tableList({url, method, params}:{url:string,method:string,params:object | undefined}) {
  return service({
    url,
    method,
    params
  })
}
