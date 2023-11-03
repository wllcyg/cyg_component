import service from "@/request/Request.tsx";

export function tableList({url, method, params}:{url:string,method:string,params:object | undefined}) {
  return service({
    url,
    method,
    params
  })
}
export function editTable(params:object | undefined) {
  return service({
    url:'/api/table',
    method:'get',
    params
  })
}
