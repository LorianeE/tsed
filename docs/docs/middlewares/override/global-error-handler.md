# Override Global error handler

All errors are intercepted by the @@GlobalErrorHandlerMiddleware@@.
By default, all HTTP Exceptions are automatically sent to the client, and technical errors are
sent as Internal Server Error. 

Here is the original @@GlobalErrorHandlerMiddleware@@:

<<< @/packages/common/src/platform-express/middlewares/GlobalErrorHandlerMiddleware.ts

With @@OverrideProvider@@  it's possible to change the default implementation like
this:

<<< @/docs/docs/snippets/middlewares/override-global-error-handler-middleware.ts

::: tip
By default, the server imports automatically your middlewares matching with this rule `${rootDir}/middlewares/**/*.ts` (See [componentScan configuration](/configuration.md)).

```
.
├── src
│   ├── controllers
│   ├── services
│   ├── middlewares
│   └── Server.ts
└── package.json
```

If not, just import your middleware in your server or edit the [componentScan configuration](/configuration.md).

```typescript
import {ServerLoader, ServerSettings} from "@tsed/common";
import "./src/other/directory/MyGEHMiddleware";

@ServerSettings({
    ...
})
export class Server extends ServerLoader {
  
 
}
```
:::

