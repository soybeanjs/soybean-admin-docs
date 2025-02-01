# 使用方法

## リクエストのベースパスの取得

```ts
const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';

const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
```

> `isHttpProxy` は、プロキシを使用するかどうかを判断するために使用されます。`baseURL` は、環境ファイルの `VITE_SERVICE_BASE_URL` の値を示します。
> `otherBaseURL` は、他のリクエストに使用され、`VITE_OTHER_SERVICE_BASE_URL `によって設定されます。

> `getServiceBaseURL` メソッドは、リクエストのベースパスを取得するために使用され、環境変数 `import.meta.env `と `isHttpProxy` を基にプロキシを使用するかどうかを判断します。

## リクエストインスタンス作成関数のインポート

`createRequest` または `createFlatRequest` を選択して、リクエストインスタンスを作成できます。

```ts
import { createFlatRequest, createRequest } from '@sa/axios';
```

具体的な使用例は以下をご覧ください。

## リクエストインスタンス関数のジェネリックパラメータの確認

- リクエスト結果のデータ型: `App.Service.Response`。デフォルトでこの型を使用しますが、バックエンドの返却データの型に応じて変更する必要があります。

  > 異なる型は、`RequestOption` 内の `isBackendSuccess` や `transformBackendResponse`、およびエラーメッセージフィールドのパラメータ型に影響を与える可能性があります。

  > 他のリクエストインスタンスのデータ型は、新たに型宣言を行って定義してください。

- リクエストインスタンスの状態型: `InstanceState`。リクエストインスタンスの状態を格納するために使用されます。例えば、トークンのリフレッシュ中か、エラーダイアログが表示されているかなど、ビジネスロジックに合わせて状態型を定義します。

## リクエストインスタンス `request` の作成

示例

```ts
import type { AxiosResponse } from 'axios';
import { BACKEND_ERROR_CODE, createFlatRequest, createRequest } from '@sa/axios';
import { useAuthStore } from '@/store/modules/auth';
import { localStg } from '@/utils/storage';
import { getServiceBaseURL } from '@/utils/service';
import { $t } from '@/locales';
import { handleRefreshToken } from './shared';

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

interface InstanceState {
  /** トークンをリフレッシュしているリクエストが実行中かどうか */
  isRefreshingToken: boolean;
}

export const request = createFlatRequest<App.Service.Response, InstanceState>(
  {
    baseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2'
    }
  },
  {
    async onRequest(config) {
      const { headers } = config;

      // リクエストヘッダーにトークンを追加
      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // バックエンドが返した code が "0000"（デフォルト）であればリクエスト成功とする
      // このロジックを変更したい場合は、`.env` ファイルの `VITE_SERVICE_SUCCESS_CODE` を変更してください
      return response.data.code === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    async onBackendFail(response, instance) {
      const authStore = useAuthStore();

      function handleLogout() {
        authStore.resetStore();
      }

      function logoutAndCleanup() {
        handleLogout();
        window.removeEventListener('beforeunload', handleLogout);
      }

      // バックエンドのコードが `logoutCodes` に含まれている場合は、ユーザーはログアウトする必要があります
      const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
      if (logoutCodes.includes(response.data.code)) {
        handleLogout();
        return null;
      }

      // バックエンドのコードが `modalLogoutCodes` に含まれている場合は、ポップアップでユーザーにログアウトを促します
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(response.data.code)) {
        // ユーザーがページをリフレッシュしないようにする
        window.addEventListener('beforeunload', handleLogout);

        window.$dialog?.error({
          title: 'Error',
          content: response.data.msg,
          positiveText: $t('common.confirm'),
          maskClosable: false,
          onPositiveClick() {
            logoutAndCleanup();
          },
          onClose() {
            logoutAndCleanup();
          }
        });

        return null;
      }

      // バックエンドのコードが `expiredTokenCodes` に含まれている場合は、トークンが期限切れであり、トークンをリフレッシュする必要があります
      // `refreshToken` インターフェースが `expiredTokenCodes` のエラーコードを返してはいけません、無限ループを防ぐために、`logoutCodes` または `modalLogoutCodes` を返すべきです
      const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(response.data.code) && !request.state.isRefreshingToken) {
        request.state.isRefreshingToken = true;

        const refreshConfig = await handleRefreshToken(response.config);

        request.state.isRefreshingToken = false;

        if (refreshConfig) {
          return instance.request(refreshConfig) as Promise<AxiosResponse>;
        }
      }

      return null;
    },
    transformBackendResponse(response) {
      return response.data.data;
    },
    onError(error) {
      // リクエストが失敗した場合、エラーメッセージの表示ロジックをここで処理します
      let message = error.message;
      let backendErrorCode = '';

      // バックエンドのエラーメッセージとエラーコードを取得
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message;
        backendErrorCode = error.response?.data?.code || '';
      }

      // エラーメッセージはポップアップで表示
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(backendErrorCode)) {
        return;
      }

      // トークンが期限切れの場合、トークンをリフレッシュしてリクエストを再試行するため、エラーメッセージは表示しません
      const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(backendErrorCode)) {
        return;
      }

      window.$message?.error?.(message);
    }
  }
);
```

## 使用请求实例

```ts
/**
 * ログイン
 *
 * @param loginRes ログインパラメーター
 */
export function fetchLogin(loginRes: Api.Auth.LoginReq) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/accounts/login',
    method: 'post',
    data: loginRes
  });
}
```

リクエスト成功後のデータ型を定義する必要があります（例：`Api.Auth.LoginToken`）し、それを `request` 関数に渡します。

- request 関数が `createFlatRequest` で作成された場合、リクエスト成功後のデータ型は1つのオブジェクトにラップされ、`data` フィールドを通じてアクセスできます。

```ts
async function login() {
  const { error, data } = await fetchLogin({ username: 'admin', password: 'admin' });

  if (!error) {
    // リクエスト成功
  }
}
```

- request 関数が createRequest で作成された場合、リクエスト成功後のデータ型は直接返され、オブジェクトでラップされません。

```ts
async function login() {
  const data = await fetchLogin({ username: 'admin', password: 'admin' });

  if (data) {
    // リクエスト成功
  }
}
```
