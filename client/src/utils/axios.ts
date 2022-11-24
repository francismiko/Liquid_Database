import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import lodash from "lodash";

type Result<T> = {
  code: number;
  msg: string;
  uid: string;
  isAdmin: boolean;
  result: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:3000/api",
    timeout: 60000,
  };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem("token") as string;
        if (token) {
          config.headers!.Authorization = token;
        }

        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      (err: any) => {
        const errMap: Map<number, string> = new Map([
          [400, "请求错误"],
          [401, "未授权，请登录"],
          [403, "拒绝访问"],
          [404, `请求地址出错: ${err.response.config.url}`],
          [405, "请求方法不允许"],
          [406, "请求的资源的内容特性无法满足请求头中的条件"],
          [407, "需要代理授权"],
          [408, "请求超时"],
          [409, "请求冲突"],
          [410, "请求的资源已经不存在"],
          [411, "需要有效的内容长度"],
          [412, "未满足前提条件"],
          [413, "请求实体过大"],
          [414, "请求的URI过长"],
          [415, "不支持的媒体类型"],
          [416, "请求范围不符合要求"],
          [417, "未满足期望值"],
          [418, "我是一个茶壶"],
          [419, "请求的资源被锁定"],
          [420, "请求的资源被删除"],
          [422, "请求格式正确，但是由于含有语义错误，无法响应"],
          [423, "当前资源被锁定"],
          [424, "请求失败，由于之前的某个请求发生的错误"],
          [428, "需要先决条件"],
          [429, "请求过多"],
          [431, "请求的资源的内容长度超过了服务器的限制"],
          [451, "由于法律原因，请求被拒绝"],
          [500, "服务器内部错误"],
          [501, "服务未实现"],
          [502, "网关错误"],
          [503, "服务不可用"],
          [504, "网关超时"],
          [505, "HTTP版本不受支持"],
          [506, "服务器内部配置错误"],
          [507, "服务器无法存储完成请求所必须的内容"],
          [508, "服务器达到带宽限制"],
          [509, "服务器达到下载限制"],
          [510, "获取资源所需要的策略并没有没满足"],
          [511, "客户端需要进行身份验证才能获得网络访问权限"],
        ]);
        // 将err.response.statusText进行深拷贝
        let msg: string = lodash.cloneDeepWith(err.response.statusText);
        const errStatus: string | undefined = errMap.get(err.response.status);
        errStatus === undefined ? (msg = "未知错误") : (msg = errStatus);
        return Promise.reject(msg);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({});
