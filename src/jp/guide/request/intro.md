# リクエスト

## 複数のリクエスト環境

開発プロジェクトでは、複数のリクエスト環境アドレスを使用することがよくあります。例えば、ユーザー開発環境のバックエンドアドレス、テスト環境のバックエンドアドレス、予備生産環境のバックエンドアドレス、そして本番環境のバックエンドアドレスなどです。

環境ファイルで複数のリクエストアドレスを設定し、リクエスト関数内で環境変数に基づいてどのリクエストアドレスを使用するかを判断します。

現在、プロジェクトの環境ファイルには以下があります。

`.env.prod`, `.env.test`

## リクエスト関連の設定紹介

`.env` ファイルの設定項目

- `VITE_SERVICE_SUCCESS_CODE`: バックエンドリクエストが成功した際の code
- `VITE_SERVICE_LOGOUT_CODES`: バックエンドリクエストが失敗し、ユーザーがログアウトする必要がある code。複数の code は `, `で区切ります
- `VITE_SERVICE_MODAL_LOGOUT_CODES`: バックエンドリクエストが失敗し、ポップアップでユーザーにログアウトを促す必要がある code。複数の code は `, `で区切ります
- `VITE_SERVICE_EXPIRED_TOKEN_CODES`: バックエンドリクエストが失敗し、トークンをリフレッシュする必要がある code。複数の code は , で区切ります

`.env.test` または `.env.prod` ファイルの設定項目

- `VITE_SERVICE_BASE_URL`: リクエストのベースURL
- `VITE_OTHER_SERVICE_BASE_URL`: その他のリクエストのベースURL

### リクエスト関数の紹介

1. **リクエスト関数：createRequest と createFlatRequest**

`createRequest`: 戻り値のリクエストインスタンスは、Axiosのレスポンスデータを直接返します（変換可能）

`createFlatRequest`: 戻り値のリクエストインスタンスは、レスポンスデータとエラーメッセージを1つの平坦なオブジェクトとしてラップし、統一フォーマットで結果を返します。

2. **createRequest/createFlatRequest 参数**

`axiosConfig`: axios の設定、baseUrl を渡し、リクエストのタイムアウトやリクエストヘッダーなどの設定を定義します。

`options`: 引数のバリデーションなどのロジック（下記の `RequestOption` を参照）

```ts
interface RequestOption<ResponseData = any> {
  /**
   * リクエスト送信前に実行され、リクエスト設定を変更するために使用されます。例：リクエストヘッダーにトークンを追加する
   */
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * バックエンドのレスポンスが成功かどうかを判断します。バックエンドが返した code と照らし合わせて判断します
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;
  /**
   * バックエンドリクエストがビジネス上失敗した場合に呼び出される非同期関数。例：トークンの期限切れ処理
   */
  onBackendFail: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance
  ) => Promise<AxiosResponse> | Promise<void>;
  /**
   * responseType が json の場合、バックエンドのレスポンスデータを変換します
   */
  transformBackendResponse(response: AxiosResponse<ResponseData>): any | Promise<any>;
  /**
   *  リクエストが失敗したときに呼び出される関数（リクエストの失敗やバックエンドビジネスの失敗リクエストを含む）。例：エラーメッセージの処理
   */
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}
```
