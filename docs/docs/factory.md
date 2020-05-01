# Factory

Factory is similar to Service except that the factory uses an already instantiated object and you have to use
the `@Inject()` decorator to inject the factory to other `Service` or `Controller`.

## Declare a factory from an instance

This example shows you how you can add an already constructed service like a npm module.

```typescript
// MyFooFactory.ts
import {registerFactory} from "@tsed/common";

export interface IMyFooFactory {
   getFoo(): string;
}

export type MyFooFactory = IMyFooFactory;
export const MyFooFactory = Symbol("MyFooFactory");

registerFactory(MyFooFactory, {
     getFoo:  () => "test"
});
```
Then inject your factory in another service (or controller):
```typescript
// otherservice.ts
import {MyFooFactory} from "./FooFactory.ts";

@Service()
export default class OtherService {
     constructor(@Inject(MyFooFactory) myFooFactory: MyFooFactory){
           console.log(myFooFactory.getFoo()); /// "test"
     }
}
```
> Note: TypeScript transforms and stores `MyFooFactory` as `Function` type in the metadata. So to inject a factory, you must use the `@Inject(type)` decorator.

## Built-in Factory

Some factories are built-in Ts.ED. These factories are :

- ExpressApplication. This is an instance of [Express.Application](http://expressjs.com/fr/4x/api.html#app).
- HttpServer. This is an instance of [Http.Server](https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server) from `http` module.
- HttpsServer. This is an instance of [Https.Server](https://nodejs.org/dist/latest/docs/api/https.html#https_class_https_server) from `https` module.

## Inject ExpressApplication

```typescript
import {ExpressApplication, Service, Inject} from "@tsed/common";

@Service()
export default class OtherService {
     constructor(@Inject(ExpressApplication) expressApplication: ExpressApplication){
           expressApplication.use("/", (request, response, next) => {
               
           });
     }
}
```
> Note: TypeScript transforms and stores `ExpressApplication` as `Function` type in the metadata. So to inject a factory, you must use the `@Inject(type)` decorator.

## Inject HttpServer or HttpsServer

```typescript
import {HttpServer, Service, Inject} from "@tsed/common";

@Service()
export default class OtherService {
     constructor(@Inject(HttpServer) httpServer: HttpServer){
           const server = HttpServer.get(); // return the Http.Server instance
     }
}
```
